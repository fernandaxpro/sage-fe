"use client";

import { useState } from "react";
import { Button, Checkbox, Image } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar";

// Dummy Wishlist Data
const initialWishlistItems = [
    {
        id: "w1",
        name: "Shelly BUTTON 1 - Black SH-SHELLYBUTB",
        image: "/images/products/button.png",
        price: 45.27,
        inStock: true,
    },
    {
        id: "w2",
        name: "HiLook 4 MP Network IR Turret Camera 2.8mm IPC-T240H",
        image: "/images/products/camera.png",
        price: 70.49,
        inStock: true,
    },
    {
        id: "w3",
        name: "Dahua 21.5\" FHD Monitor DHI-LM22-H200",
        image: "/images/products/monitor.png",
        price: 227.05,
        inStock: false,
    }
];

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // Toggle single item selection
    const toggleSelection = (id: string) => {
        const newSelection = new Set(selectedItems);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedItems(newSelection);
    };

    // Toggle select all
    const toggleSelectAll = () => {
        if (selectedItems.size === wishlistItems.length) {
            setSelectedItems(new Set());
        } else {
            const allIds = wishlistItems.map(item => item.id);
            setSelectedItems(new Set(allIds));
        }
    };

    const isAllSelected = wishlistItems.length > 0 && selectedItems.size === wishlistItems.length;
    const isIndeterminate = selectedItems.size > 0 && selectedItems.size < wishlistItems.length;

    const handleDelete = () => {
        // Filter out selected items
        const newItems = wishlistItems.filter(item => !selectedItems.has(item.id));
        setWishlistItems(newItems);
        setSelectedItems(new Set()); // Clear selection
    };

    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Sidebar */}
            <UserSidebar activeItem="My Wishlist" />

            {/* Main Content */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    My Wishlist <span className="text-gray-500 text-lg">({wishlistItems.length})</span>
                </h1>

                {/* Control Row */}
                <div className="flex justify-between items-center bg-white border border-[#E4E4E4] rounded-lg p-4 mb-4">
                    <Checkbox
                        isSelected={isAllSelected}
                        isIndeterminate={isIndeterminate}
                        onValueChange={toggleSelectAll}
                        classNames={{ label: "text-sm font-medium text-gray-900" }}
                    >
                        Select All
                    </Checkbox>
                    {selectedItems.size > 0 && (
                        <button
                            onClick={handleDelete}
                            className="text-red-500 text-sm font-medium hover:text-red-600"
                        >
                            Delete
                        </button>
                    )}
                </div>

                {/* Wishlist Items */}
                <div className="flex flex-col gap-4">
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border border-[#E4E4E4] rounded-lg p-4 bg-white flex-wrap sm:flex-nowrap">
                                <Checkbox
                                    isSelected={selectedItems.has(item.id)}
                                    onValueChange={() => toggleSelection(item.id)}
                                />

                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain"
                                        fallbackSrc="https://via.placeholder.com/64"
                                        radius="none"
                                    />
                                </div>

                                <div className="flex-1 min-w-[200px]">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="w-full sm:w-24 text-right sm:text-left font-bold text-gray-900">
                                    ${item.price.toFixed(2)}
                                </div>

                                <div className="w-full sm:w-28 text-sm">
                                    {item.inStock ? (
                                        <div className="flex items-center gap-1 text-green-600 font-medium">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            In Stock
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-red-500 font-medium">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Out of Stock
                                        </div>
                                    )}
                                </div>

                                <Button
                                    className="bg-[#0F2744] text-white font-medium px-6 w-full sm:w-auto"
                                    radius="full"
                                    isDisabled={!item.inStock}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            Your wishlist is empty.
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Wishlist;