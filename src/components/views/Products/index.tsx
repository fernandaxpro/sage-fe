"use client";

import { useState } from "react";
import { Checkbox, Slider, Image, Pagination, Button } from "@heroui/react";
import { FaStar, FaGlobe, FaStore, FaTruck, FaThLarge, FaList, FaFilter, FaTimes } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import Link from "next/link";

import { dummyProducts, brands, ratingCounts } from "@/data/products";
import { Product } from "@/types";

const bestSellerProducts = dummyProducts.slice(0, 4);

interface ProductCardProps extends Product { }

const ProductCard = ({ id, title, img, price, rating, onSale }: ProductCardProps) => {
    return (
        <Link href={`/product/list/detail/${id}`} className="block">
            <div className="bg-white border border-[#E4E4E4] rounded-lg p-3 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative cursor-pointer">
                {onSale && (
                    <div className="absolute top-2 left-2 z-10 bg-warning rounded-full">
                        <p className="text-white font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4">
                                <path d="M6.50735 0.537493C7.34825 -0.179162 8.58515 -0.179169 9.42613 0.537501L10.4371 1.39906C10.5572 1.50143 10.7065 1.56328 10.8639 1.57584L12.188 1.68151C13.2894 1.76939 14.164 2.64402 14.2519 3.7454L14.3576 5.06951C14.3701 5.22682 14.4319 5.37618 14.5343 5.49631L15.3959 6.50734C16.1126 7.34824 16.1126 8.58514 15.3959 9.42612L14.5343 10.437C14.432 10.5572 14.37 10.7066 14.3575 10.8639L14.2519 12.188C14.164 13.2894 13.2894 14.164 12.188 14.2518L10.8639 14.3575C10.7065 14.3701 10.5572 14.432 10.4371 14.5344L9.42613 15.3959C8.58515 16.1126 7.34825 16.1125 6.50728 15.3959L5.49628 14.5344C5.37616 14.432 5.22684 14.3701 5.06953 14.3576L3.74543 14.2518C2.64403 14.1639 1.76942 13.2894 1.68153 12.188L1.57585 10.8639C1.56329 10.7066 1.50142 10.5573 1.39907 10.4371L0.537502 9.42604C-0.179161 8.58514 -0.179168 7.34832 0.537487 6.50734L1.39906 5.49634C1.50142 5.37622 1.56331 5.22682 1.57585 5.0695L1.68152 3.74539C1.76941 2.644 2.644 1.76941 3.7454 1.68151L5.06952 1.57585C5.22684 1.56329 5.37619 1.50143 5.49632 1.39906L6.50735 0.537493ZM8.45315 1.67916C8.17288 1.44028 7.76053 1.44028 7.48025 1.67916L6.46925 2.54074C6.10888 2.84784 5.66081 3.03343 5.18883 3.07109L3.86473 3.17676C3.49759 3.20606 3.20606 3.49759 3.17677 3.86473L3.07109 5.18887C3.03343 5.66083 2.84784 6.10886 2.54074 6.46924L1.67917 7.48024C1.44029 7.76052 1.44028 8.17287 1.67917 8.45314L2.54074 9.46414C2.84785 9.82452 3.03343 10.2726 3.07111 10.7445L3.17677 12.0687C3.20606 12.4358 3.49759 12.7274 3.86474 12.7566L5.18882 12.8623C5.66077 12.9 6.10888 13.0856 6.46925 13.3927L7.48025 14.2542C7.7606 14.4931 8.17288 14.4931 8.45315 14.2542L9.46422 13.3926C9.82452 13.0856 10.2726 12.9 10.7446 12.8623L12.0687 12.7566C12.4358 12.7273 12.7274 12.4358 12.7567 12.0687L12.8623 10.7445C12.9 10.2726 13.0855 9.82452 13.3927 9.46422L14.2543 8.45314C14.4932 8.17287 14.4931 7.76059 14.2543 7.48024L13.3927 6.46924C13.0855 6.10886 12.9 5.66081 12.8623 5.18884L12.7567 3.86473C12.7274 3.49759 12.4358 3.20606 12.0687 3.17676L10.7446 3.0711C10.2727 3.03344 9.82453 2.84783 9.46415 2.54073L8.45315 1.67916ZM10.0879 4.7848L11.1485 5.84547L5.84521 11.1488L4.78455 10.0881L10.0879 4.7848ZM6.6407 6.64092C6.20136 7.08027 5.48905 7.08027 5.04971 6.64092C4.61037 6.20164 4.61037 5.48931 5.04971 5.04997C5.48905 4.61062 6.20136 4.61062 6.6407 5.04997C7.08005 5.48931 7.08005 6.20164 6.6407 6.64092ZM9.29233 10.8836C9.73168 11.3229 10.444 11.3229 10.8833 10.8836C11.3226 10.4442 11.3226 9.73197 10.8833 9.29262C10.444 8.85327 9.73168 8.85327 9.29233 9.29262C8.85298 9.73197 8.85298 10.4442 9.29233 10.8836Z" fill="white" />
                            </svg>
                            On Sale
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-center mb-3 sm:mb-4 h-[100px] sm:h-[120px] md:h-[140px] relative">
                    <Image
                        alt={title}
                        className="z-0 w-full object-contain h-[100px] sm:h-[120px] md:h-[140px]"
                        radius="none"
                        shadow="none"
                        src={img}
                        width="100%"
                    />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                    <p className="text-black text-xs sm:text-sm font-medium line-clamp-2 h-[32px] sm:h-[40px] leading-snug">{title}</p>
                    <p className="text-primary font-bold text-base sm:text-lg md:text-xl">${price.toFixed(2)}</p>

                    <div className="flex items-center justify-between w-full mt-0.5 sm:mt-1">
                        <div className="flex items-center text-yellow-400 gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={10}
                                    className={`sm:w-3 sm:h-3 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
                                    fill={i < Math.floor(rating) ? "#FFD700" : "#E5E7EB"}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
                            <FaGlobe size={12} className="sm:w-3.5 sm:h-3.5 text-green-500 hover:text-green-600 cursor-pointer" />
                            <FaStore size={12} className="sm:w-3.5 sm:h-3.5 text-yellow-500 hover:text-yellow-600 cursor-pointer" />
                            <FaBagShopping size={12} className="sm:w-3.5 sm:h-3.5 text-red-500 hover:text-red-600 cursor-pointer" />
                            <FaTruck size={12} className="sm:w-3.5 sm:h-3.5 text-primary hover:text-blue-900 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Filter Sidebar Component
const FilterSidebar = ({
    priceRange,
    setPriceRange,
    selectedBrands,
    handleBrandChange,
    showAllBrands,
    setShowAllBrands,
    visibleBrands,
    isMobile = false,
    onClose,
}: {
    priceRange: number | number[];
    setPriceRange: (value: number | number[]) => void;
    selectedBrands: string[];
    handleBrandChange: (brand: string, checked: boolean) => void;
    showAllBrands: boolean;
    setShowAllBrands: (value: boolean) => void;
    visibleBrands: string[];
    isMobile?: boolean;
    onClose?: () => void;
}) => {
    return (
        <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
            {/* Mobile Header */}
            {isMobile && (
                <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-semibold text-primary">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <FaTimes size={20} className="text-gray-500" />
                    </button>
                </div>
            )}

            {/* Filters Title - Desktop */}
            {!isMobile && <h2 className="text-lg font-semibold text-primary">Filters</h2>}

            {/* On Sale */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">On Sale</h3>
                <div className="space-y-2 flex flex-col">
                    <Checkbox size="sm" radius="sm">Hot Sale</Checkbox>
                    <Checkbox size="sm" radius="sm">Flash Sale</Checkbox>
                    <Checkbox size="sm" radius="sm">November Sale</Checkbox>
                    <Checkbox size="sm" radius="sm">October Flash</Checkbox>
                </div>
            </div>

            {/* By Price */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">By Price</h3>
                <Slider
                    step={100}
                    minValue={0}
                    maxValue={50000}
                    value={priceRange}
                    onChange={setPriceRange}
                    className="max-w-md"
                    size="sm"
                    color="primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>From: ${Array.isArray(priceRange) ? priceRange[0] : 0}</span>
                    <span>To: ${Array.isArray(priceRange) ? priceRange[1] : 50000}</span>
                </div>
            </div>

            {/* Brands */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">Brands</h3>
                <div className="space-y-2 flex flex-col">
                    {visibleBrands.map((brand) => (
                        <Checkbox
                            key={brand}
                            size="sm"
                            radius="sm"
                            isSelected={selectedBrands.includes(brand)}
                            onValueChange={(checked) => handleBrandChange(brand, checked)}
                        >
                            {brand}
                        </Checkbox>
                    ))}
                </div>
                {brands.length > 8 && (
                    <button
                        onClick={() => setShowAllBrands(!showAllBrands)}
                        className="text-sm text-primary mt-2 hover:underline"
                    >
                        {showAllBrands ? "See Less" : "See More"}
                    </button>
                )}
            </div>

            {/* By Rating */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">By Rating</h3>
                <div className="space-y-2">
                    {ratingCounts.map(({ rating, count }) => (
                        <div key={rating} className="flex items-center gap-2">
                            <Checkbox size="sm" radius="sm">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            size={12}
                                            fill={i < rating ? "#FFD700" : "#E5E7EB"}
                                            className={i < rating ? "text-yellow-400" : "text-gray-200"}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">({count})</span>
                                </div>
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Button - Mobile Only */}
            {isMobile && (
                <div className="pt-4 border-t">
                    <Button
                        color="warning"
                        className="w-full text-white font-semibold"
                        onClick={onClose}
                    >
                        Apply Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

const ProductList = () => {
    const [priceRange, setPriceRange] = useState<number | number[]>([0, 50000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const visibleBrands = showAllBrands ? brands : brands.slice(0, 8);

    const handleBrandChange = (brand: string, checked: boolean) => {
        if (checked) {
            setSelectedBrands([...selectedBrands, brand]);
        } else {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        }
    };

    return (
        <>
            {/* Mobile Filter Overlay */}
            {showMobileFilter && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowMobileFilter(false)}
                    />
                    <div className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-white overflow-y-auto">
                        <FilterSidebar
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            selectedBrands={selectedBrands}
                            handleBrandChange={handleBrandChange}
                            showAllBrands={showAllBrands}
                            setShowAllBrands={setShowAllBrands}
                            visibleBrands={visibleBrands}
                            isMobile={true}
                            onClose={() => setShowMobileFilter(false)}
                        />
                    </div>
                </div>
            )}

            <Container className="flex-col gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="text-xs sm:text-sm text-gray-500">
                    <span className="text-gray-400 cursor-pointer hover:text-primary">Home</span>
                    <span className="mx-2">&gt;</span>
                    <span className="text-primary">Product</span>
                </div>

                {/* Page Title & Mobile Filter Button */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">Products</h1>
                    <button
                        className="lg:hidden flex items-center gap-2 px-3 py-2 border border-[#E4E4E4] rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                        onClick={() => setShowMobileFilter(true)}
                    >
                        <FaFilter size={14} />
                        Filters
                    </button>
                </div>

                <div className="flex gap-6 lg:gap-8 w-full">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block w-[220px] xl:w-[250px] flex-shrink-0">
                        <div className="sticky top-4">
                            <FilterSidebar
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedBrands={selectedBrands}
                                handleBrandChange={handleBrandChange}
                                showAllBrands={showAllBrands}
                                setShowAllBrands={setShowAllBrands}
                                visibleBrands={visibleBrands}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Best Seller Section */}
                        <div className="mb-6 lg:mb-8">
                            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">Best Seller Product</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                                {bestSellerProducts.map((product) => (
                                    <div key={product.id} className="relative">
                                        <ProductCard {...product} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* View Mode & Sort Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 border-t border-b border-[#E4E4E4] py-3 sm:py-4 gap-3 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 sm:p-2 rounded ${viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    <FaThLarge size={14} className={`sm:w-4 sm:h-4 ${viewMode === "grid" ? "text-primary" : "text-gray-400"}`} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 sm:p-2 rounded ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    <FaList size={14} className={`sm:w-4 sm:h-4 ${viewMode === "list" ? "text-primary" : "text-gray-400"}`} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <label className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Sort by</label>
                                    <select className="border border-[#E4E4E4] rounded px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm min-w-[100px] sm:min-w-[140px]">
                                        <option>Popularity</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <label className="text-xs sm:text-sm text-gray-500">Show</label>
                                    <select className="border border-[#E4E4E4] rounded px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className={`grid ${viewMode === "grid"
                            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
                            : "grid-cols-1"
                            } gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8`}>
                            {dummyProducts.map((product) => (
                                <div key={product.id} className="relative">
                                    <ProductCard {...product} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                            <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">Results 1-10 of 85</p>
                            <Pagination
                                total={5}
                                page={currentPage}
                                onChange={setCurrentPage}
                                showControls
                                color="primary"
                                size="sm"
                                className="order-1 sm:order-2"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ProductList;
