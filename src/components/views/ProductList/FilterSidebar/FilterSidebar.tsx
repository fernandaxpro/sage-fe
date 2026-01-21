import { Button, Checkbox, Chip, Select, Selection, SelectItem, Slider } from "@heroui/react";
import { FaTimes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import {
    brands,
    ratingCounts
} from "@/data/products";
import { ISelectOption } from "@/types/Product";

const FilterSidebar = ({
    dataCategories,
    selectedCategories,
    onCategoryChange,

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
    dataCategories: ISelectOption[];
    selectedCategories: number[];
    onCategoryChange: (categoryIds: number[]) => void;

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
    const handleSelectionChange = (keys: Selection) => {
        if (keys === "all") {
            const allIds = dataCategories?.map(cat => cat.value) || [];
            onCategoryChange(allIds);
        } else if (keys instanceof Set) {
            const categoryIds = Array.from(keys).map(key => Number(key));
            onCategoryChange(categoryIds);
        } else {
            onCategoryChange([]);
        }
    };

    const selectedKeys = new Set(selectedCategories.map(id => String(id)));

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
            {!isMobile && <h2 className="text-lg font-semibold text-primary mb-10">Filters</h2>}

            <div className="space-y-3">
                <Select
                    size="sm"
                    radius="full"
                    label="Categories"
                    labelPlacement="outside"
                    placeholder="Select categories"
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={handleSelectionChange}
                    classNames={{
                        label: "font-semibold !text-primary text-sm sm:text-base",
                        value: "!text-primary font-medium",
                        trigger: "!text-primary", 
                    }}
                    renderValue={(items) => {
                        if (items.length === 0) {
                            return "Select categories";
                        }
                        if (items.length === 1) {
                            return items[0].textValue;
                        }
                        return `${items.length} categories selected`;
                    }}
                >
                    {dataCategories?.map((item) => (
                        <SelectItem key={String(item.value)}>
                            {item.label}
                        </SelectItem>
                    )) || []}
                </Select>

                {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map(categoryId => {
                            const category = dataCategories?.find(cat => cat.value === categoryId);
                            return category ? (
                                <Chip
                                    key={categoryId}
                                    onClose={() => {
                                        const newCategories = selectedCategories.filter(id => id !== categoryId);
                                        onCategoryChange(newCategories);
                                    }}
                                    variant="flat"
                                    size="sm"
                                    classNames={{
                                        base: "bg-secondary",
                                        content: "text-primary text-base font-medium",
                                        closeButton: "text-primary hover:bg-primary/20"
                                    }}
                                >
                                    {category.label}
                                </Chip>
                            ) : null;
                        })}
                    </div>
                )}
            </div>


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