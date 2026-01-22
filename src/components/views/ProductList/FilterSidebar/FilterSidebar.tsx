/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Checkbox,
    Divider,
    Slider,
} from "@heroui/react";
import { FaTimes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { ratingCounts } from "@/data/products";
import { IAttribute, IBrand, ISelectOption } from "@/types/Product";
import { Dispatch, SetStateAction, useState } from "react";

const FilterSidebar = ({
    // dataCategories,
    // selectedCategories,
    // onCategoryChange,

    // Brand
    dataBrands,
    selectedBrands,
    handleBrandChange,
    showAllBrands,
    setShowAllBrands,
    visibleBrands,

    // Attribute
    dataAttributes,
    selectedAttributes,
    setSelectedAttributes,

    priceRange,
    setPriceRange,

    isMobile = false,
    onClose,
}: {
    dataCategories: ISelectOption[];
    selectedCategories: number[];
    onCategoryChange: (categoryIds: number[]) => void;

    // Brand:
    dataBrands: IBrand[];
    selectedBrands: number[];
    handleBrandChange: (brandValue: number, checked: boolean) => void;
    showAllBrands: boolean;
    setShowAllBrands: (value: boolean) => void;
    visibleBrands: IBrand[];

    dataAttributes: IAttribute[];
    selectedAttributes: string;
    setSelectedAttributes: Dispatch<SetStateAction<string>>;

    priceRange: number | number[];
    setPriceRange: (value: number | number[]) => void;

    isMobile?: boolean;
    onClose?: () => void;
}) => {
    const [showAllValues, setShowAllValues] = useState<Record<number, boolean>>(
        {},
    );

    const toggleShowValues = (attributeId: number) => {
        setShowAllValues((prev) => ({
            ...prev,
            [attributeId]: !prev[attributeId],
        }));
    };

    return (
        <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
            {/* Mobile Header */}
            {isMobile && (
                <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-semibold text-primary">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <FaTimes size={20} className="text-gray-500" />
                    </button>
                </div>
            )}

            {/* Brands */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">
                    Brands
                </h3>
                <div className="flex flex-col gap-1">
                    {visibleBrands.map((brand: any, idx) => (
                        <Checkbox
                            key={idx}
                            size="sm"
                            radius="sm"
                            isSelected={selectedBrands.includes(brand.value)}
                            onValueChange={(checked) =>
                                handleBrandChange(brand.value, checked)
                            }
                            classNames={{
                                label: "text-primary font-medium text-sm",
                            }}
                        >
                            {brand.label}
                        </Checkbox>
                    ))}
                </div>
                {dataBrands.length > 8 && (
                    <button
                        onClick={() => setShowAllBrands(!showAllBrands)}
                        className="text-sm text-primary mt-2 hover:underline font-medium"
                    >
                        {showAllBrands ? "See Less" : "See More"}
                    </button>
                )}
            </div>

            <Divider className="bg-bordered" />

            {dataAttributes
                ?.filter(attr => attr.filterable)
                .map((attribute) => {
                    if(attribute.name !== 'Color') return null

                    const visibleValues = showAllValues[attribute.id]
                        ? attribute.values
                        : attribute.values.slice(0, 8);

                    return (
                        <div key={attribute.id}>
                            <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">
                                {attribute.name}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {visibleValues.map((value: string, idx: number) => (
                                    <Checkbox
                                        key={idx}
                                        size="sm"
                                        radius="sm"
                                        isSelected={selectedAttributes === value}
                                        onValueChange={(checked) => {
                                            if (checked) {
                                                setSelectedAttributes(value); 
                                            } else {
                                                setSelectedAttributes(''); 
                                            }
                                        }}
                                        classNames={{
                                            label: "text-primary font-medium text-sm"
                                        }}
                                    >
                                        {value}
                                    </Checkbox>
                                ))}
                            </div>
                            {attribute.values.length > 8 && (
                                <button
                                    onClick={() => toggleShowValues(attribute.id)}
                                    className="text-sm text-primary mt-2 hover:underline font-medium"
                                >
                                    {showAllValues[attribute.id] ? "See Less" : "See More"}
                                </button>
                            )}
                            <Divider className="bg-bordered mt-4" />
                        </div>
                    );
                })}

            {/* On Sale */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">
                    On Sale
                </h3>
                <div className="space-y-2 flex flex-col">
                    <Checkbox size="sm" radius="sm">
                        Hot Sale
                    </Checkbox>
                    <Checkbox size="sm" radius="sm">
                        Flash Sale
                    </Checkbox>
                    <Checkbox size="sm" radius="sm">
                        November Sale
                    </Checkbox>
                    <Checkbox size="sm" radius="sm">
                        October Flash
                    </Checkbox>
                </div>
            </div>

            {/* By Price */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">
                    By Price
                </h3>
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

            {/* By Rating */}
            <div>
                <h3 className="font-semibold text-primary mb-3 text-sm sm:text-base">
                    By Rating
                </h3>
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
                                            className={
                                                i < rating ? "text-yellow-400" : "text-gray-200"
                                            }
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
