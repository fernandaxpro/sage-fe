"use client";

import Link from "next/link";
import { FaUser, FaShoppingCart, FaHeart, FaCommentAlt, FaMapMarkerAlt, FaFileAlt, FaSignOutAlt } from "react-icons/fa";

interface UserSidebarProps {
    activeItem: string;
}

const UserSidebar = ({ activeItem }: UserSidebarProps) => {
    const sidebarItems = [
        { label: "My Profile", icon: <FaUser />, href: "/profile" },
        { label: "My Orders", icon: <FaShoppingCart />, href: "/product/my-order" },
        { label: "My Wishlist", icon: <FaHeart />, href: "/product/wishlist" },
        { label: "My Reviews", icon: <FaCommentAlt />, href: "/product/my-review" },
        { label: "My Addresses", icon: <FaMapMarkerAlt />, href: "/product/my-address" },
        { label: "Trade Account", icon: <FaFileAlt />, href: "/trade-account" },
        { label: "Logout", icon: <FaSignOutAlt />, href: "/auth/logout" },
    ];

    return (
        <div className="w-full md:w-[250px] lg:w-[280px] shrink-0">
            <div className="flex flex-col gap-1">
                {sidebarItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors text-sm font-medium ${activeItem === item.label
                            ? "text-primary bg-primary/5 border-l-4 border-primary"
                            : "text-gray-600 hover:text-primary hover:bg-[#E4E4E4]"
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UserSidebar;
