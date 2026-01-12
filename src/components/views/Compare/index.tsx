"use client";

import { useState } from "react";
import { Image, Button } from "@heroui/react";
import { FaStar, FaTimes, FaCheck } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Link from "next/link";

// Dummy data for comparison
const compareProducts = [
    {
        id: 1,
        title: "HiLook 4 MP Network IR Turret Camera 2.8mm IPC-T240H",
        image: "/images/products/camera-1.png", // Placeholder
        price: 70.49,
        rating: 5,
        availability: "In Stock",
        bestFeatures: [
            "Super Fast & Smart Performance",
            "Rechargeable & Long Lasting Power",
            "Universal Compatibility & Easy Integration"
        ]
    },
    {
        id: 2,
        title: "HiLook 4 MP Fixed Turret Network Camera Colour Black IPC-T240H...",
        image: "/images/products/camera-2.png", // Placeholder
        price: 81.93,
        rating: 5,
        availability: "In Stock",
        bestFeatures: [
            "Superior Image Quality in Any Lighting",
            "Efficient H.265+ Compression",
            "Durable & Easy to Install"
        ]
    },
    {
        id: 3,
        title: "HiLook 6 MP Network IR Turret Camera IPC-T260H-MU",
        image: "/images/products/camera-3.png", // Placeholder
        price: 97.00,
        rating: 5,
        availability: "Out of Stock",
        bestFeatures: [
            "Crystal-Clear 6MP Imaging with True WDR",
            "All-in-One Surveillance with Audio & Storage",
            "Smart & Reliable Performance"
        ]
    },
    {
        id: 4,
        title: "HiLook 6MP IP Cameras Superior Night Vision Fixed Lens 2.8 mm...",
        image: "/images/products/camera-4.png", // Placeholder
        price: 128.74,
        rating: 5,
        availability: "In Stock",
        bestFeatures: [
            "Super Fast & Smart Performance",
            "Rechargeable & Long Lasting Power",
            "Universal Compatibility & Easy Integration"
        ]
    },
];

const Compare = () => {
    const [products, setProducts] = useState(compareProducts);

    const removeProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    if (products.length === 0) {
        return (
            <Container className="flex-col gap-6 px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800">No products to compare</h2>
                <p className="text-gray-500 mb-4">Add some products to the comparison list to see them here.</p>
                <Link href="/product/list">
                    <Button color="primary">Browse Products</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-gray-500">
                <Link href="/" className="text-gray-400 cursor-pointer hover:text-primary">Home</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-400 cursor-pointer hover:text-primary">Compare</span>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Compare</h1>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg border border-[#E4E4E4] p-4 relative flex flex-col h-full">
                        {/* Header: Stock & Remove */}
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-xs px-3 py-1 rounded-full border ${product.availability === "In Stock"
                                ? "text-green-600 border-green-600 bg-green-50"
                                : "text-red-500 border-red-500 bg-red-50"
                                }`}>
                                {product.availability}
                            </span>
                            <button
                                onClick={() => removeProduct(product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Product Image */}
                        <div className="h-[180px] flex items-center justify-center mb-4">
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="max-h-full object-contain"
                                radius="none"
                                fallbackSrc="https://via.placeholder.com/200"
                            />
                        </div>

                        {/* Product Title */}
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10">
                            {product.title}
                        </h3>

                        {/* Price */}
                        <div className="text-xl font-bold text-primary mb-2">
                            ${product.price.toFixed(2)}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={12}
                                    className={i < product.rating ? "text-yellow-400" : "text-[#E4E4E4]"}
                                />
                            ))}
                        </div>

                        {/* Best Features */}
                        <div className="mb-6 flex-grow">
                            <h4 className="text-xs font-bold text-gray-800 mb-2">Best Features</h4>
                            <ul className="space-y-2">
                                {product.bestFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FaCheck size={8} className="text-white" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            color="primary"
                            className="w-full font-semibold"
                            radius="full"
                        >
                            Add to Cart
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Compare;
