/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import {
    NAV_LINKS,
    NAV_CATEGORIES,
    AUTH_BUTTONS,
    USER_ACTION_BUTTONS,
} from "../HomepageLayout.constants";
import { POPUP_CONTENT, BrandItem } from "./HomepageLayoutNavbarPopupHover/HomepageLayoutPopupHover.constants";
import { signOut, useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/router";

interface HomepageLayoutMobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
    dataProfile: any
}

const HomepageLayoutMobileSidebar = ({
    isOpen,
    onClose,
    onOpenLogin,
    dataProfile
}: HomepageLayoutMobileSidebarProps) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const { status } = useSession();
    const router = useRouter();
    const currentPath = router.pathname;
    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    if (!isOpen) return null;

    const wishlistLink = USER_ACTION_BUTTONS.find((btn) => btn.label === "Wishlist");
    const menuLinks = wishlistLink
        ? [{ label: "Wishlists", href: wishlistLink.href }, ...NAV_LINKS]
        : NAV_LINKS;

     const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
        const requiresAuth = ['Wishlists', 'Account', 'Cart'].includes(label);
        
        if (status === 'unauthenticated' && requiresAuth) {
            e.preventDefault(); 
            onClose(); 
            onOpenLogin();
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 lg:hidden font-sans">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar Content */}
            <div className="absolute top-0 left-0 bottom-0 w-[300px] bg-white shadow-xl overflow-y-auto flex flex-col p-6 animate-slide-in-left">
                {/* Header / Close Button */}
                <div className="flex justify-start mb-6">
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Close menu"
                    >
                        <RxCross2 className="w-8 h-8" />
                    </button>
                </div>

                {/* content container */}
                <div className="flex flex-col gap-8">
                    <div className="flex">
                        {status === 'unauthenticated' ? (
                            <Button
                                className="bg-[#0f294d] text-white w-full font-semibold rounded-full py-6"
                                size="lg"
                                startContent={<LogIn />}
                                onPress={() => {
                                    onClose();
                                    onOpenLogin();
                                }}
                            >
                                Sign In
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            name={dataProfile?.first_name ?? ""}
                                            src={dataProfile?.profile_picture}
                                            className="cursor-pointer font-bold"
                                            showFallback
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        {currentPath !== "/user/profile" ? (
                                            <DropdownItem key="profile" href="/user/profile">
                                                Profile
                                            </DropdownItem>
                                        ) : null}
                                        <DropdownItem
                                            key="signout"
                                            onPress={() => signOut()}
                                        >
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <div className="flex-1 flex justify-between items-center">
                                    <h1 className="text-primary font-semibold text-base">{dataProfile?.first_name} {dataProfile?.last_name}</h1>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Our Menu Section */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-4">Our Menu</h3>
                        <ul className="flex flex-col gap-3">
                             {menuLinks.map((link: { label: string; href: string }) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-700 hover:text-primary text-base font-medium block"
                                        onClick={(e) => handleMenuClick(e, link.href, link.label)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Products Section */}
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg mb-4">Our Products</h3>
                        <div className="flex flex-col">
                            {NAV_CATEGORIES.map((category: { label: string; href: string }) => {
                                const hasSubItems = POPUP_CONTENT[category.label]?.brands && POPUP_CONTENT[category.label]!.brands!.length > 0;
                                const isExpanded = expandedCategory === category.label;

                                return (
                                    <div key={category.label} className="border-b border-[#E4E4E4] last:border-0">
                                        <div
                                            className="flex items-center justify-between py-3 cursor-pointer group"
                                            onClick={() => hasSubItems ? toggleCategory(category.label) : null}
                                        >
                                            <Link
                                                href={category.href}
                                                className="text-gray-700 group-hover:text-primary text-base font-medium flex-1"
                                                onClick={(e) => {
                                                    if (hasSubItems) {
                                                        e.preventDefault(); // Prevent navigation if expanding
                                                    } else {
                                                        onClose();
                                                    }
                                                }}
                                            >
                                                {category.label}
                                            </Link>
                                            {hasSubItems && (
                                                <FaChevronDown
                                                    className={`w-3 h-3 text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                />
                                            )}
                                        </div>

                                        {/* Sub Items (Brands) */}
                                        {hasSubItems && isExpanded && (
                                            <div className="pl-4 pb-3 flex flex-col gap-2 bg-gray-50/50 rounded-lg mb-2">
                                                {POPUP_CONTENT[category.label]!.brands!.map((brand: BrandItem, idx: number) => (
                                                    <div key={idx} className="py-1">
                                                        {/* Simple list for now as per image reference depth */}
                                                        <div className="text-sm text-gray-600 font-medium">
                                                            {brand.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes slide-in-left {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default HomepageLayoutMobileSidebar;
