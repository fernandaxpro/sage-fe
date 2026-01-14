"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { JSX } from "react";
import { FaUser, FaShoppingCart, FaHeart, FaCommentAlt, FaMapMarkerAlt, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

interface UserSidebarProps {
    activeItem: string;
}

type SidebarItem = {
    label: string;
    icon: JSX.Element;
} & (
    | { type: "link"; href: string }
    | { type: "button"; onClick: () => void }
);

const UserSidebar = ({ activeItem }: UserSidebarProps) => {
    const sidebarItems: SidebarItem[] = [
        { label: "My Profile", icon: <FaUser />, type: "link", href: "/user/profile" },
        { label: "My Addresses", icon: <FaMapMarkerAlt />, type: "link", href: "/user/address" },
        { label: "My Wishlist", icon: <FaHeart />, type: "link", href: "/user/wishlist" },
        { label: "Logout", icon: <FaSignOutAlt />, type: "button", onClick: () => signOut({ callbackUrl: "/" }) },
        // { label: "My Orders", icon: <FaShoppingCart />, type: "link", href: "/product/my-order" },
        // { label: "My Reviews", icon: <FaCommentAlt />, type: "link", href: "/product/my-review" },
        // { label: "Trade Account", icon: <FaFileAlt />, type: "link", href: "/trade-account" },
    ];

    const baseClassName = "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-sm font-medium";
    
    const getClassName = (label: string) => {
        return `${baseClassName} ${
            activeItem === label
                ? "text-primary bg-primary/5 border-l-4 border-primary"
                : "text-gray-600 hover:text-primary hover:bg-[#E4E4E4]"
        }`;
    };

    return (
        <div className="w-full md:w-[250px] lg:w-[280px] shrink-0">
            <div className="flex flex-col gap-1">
                {sidebarItems.map((item, index) => {
                    if (item.type === "link") {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={getClassName(item.label)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    }
                    
                    return (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className={getClassName(item.label)}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default UserSidebar;