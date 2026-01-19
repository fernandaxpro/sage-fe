import { Button, Checkbox, Slider } from "@heroui/react";
import { FaTimes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import {
    // dummyProducts, 
    brands,
    ratingCounts
} from "@/data/products";

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
                        onPress={onClose}
                    >
                        Apply Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;