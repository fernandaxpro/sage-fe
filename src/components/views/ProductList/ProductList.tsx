/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Pagination,
    Select,
    SelectItem
} from "@heroui/react";
import { FaFilter } from "react-icons/fa";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt, TfiLayoutGrid4Alt, TfiLayoutListThumbAlt } from "react-icons/tfi";
import Container from "@/components/ui/Container";
import {
    PaginationSkeleton,
    ProductCardSkeleton,
    // FilterSidebarSkeleton,
    // PaginationSkeleton,
    // ControlsSkeleton
} from './ProductListSkeleton';
import {
    brands,
} from "@/data/products";

import useProductList from "./useProductList";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { breadcrumbItems, perPageOption, sortByOption } from "./ProductList.constant";
import AppBreadcrumbs from "@/components/ui/AppBreadcrumbs";

const ProductList = () => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    const [priceRange, setPriceRange] = useState<number | number[]>([0, 50000]);
    const [viewMode, setViewMode] = useState<"list" | "grid-2" | "grid-3" | "grid-4">("grid-3");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(100);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const visibleBrands = showAllBrands ? brands : brands.slice(0, 8);

    const {
        dataCategories,
        productList,
        isLoadingProductList,
        // error,
        // refetchProductList,
    } = useProductList({
        page: currentPage,
        perPage,
        categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
        brandIds: undefined
    })

    const handleCategoryChange = (categoryIds: number[]) => {
        setSelectedCategories(categoryIds);
        setCurrentPage(1); // Reset ke page 1 saat filter berubah
    };

    const handleBrandChange = (brand: string, checked: boolean) => {
        if (checked) {
            setSelectedBrands([...selectedBrands, brand]);
        } else {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const getGridClass = () => {
        switch (viewMode) {
            case "list":
                return "grid-cols-1";
            case "grid-2":
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2";
            case "grid-3":
                return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3";
            case "grid-4":
                return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4";
            default:
                return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5";
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
                            dataCategories={dataCategories}
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}

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
                <AppBreadcrumbs items={breadcrumbItems} />

                {/* Page Title & Mobile Filter Button */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">Products</h1>
                    <button
                        className="lg:hidden flex items-center gap-2 px-3 py-2 border border-bordered rounded-lg text-sm text-gray-600 hover:bg-gray-50"
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
                                dataCategories={dataCategories}
                                selectedCategories={selectedCategories}
                                onCategoryChange={handleCategoryChange}

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
                        {/* <div className="mb-6 lg:mb-8">
                            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-3 sm:mb-4">Best Seller Product</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                                {bestSellerProducts.map((product) => (
                                    <div key={product.id} className="relative">
                                        <ProductCard {...product} />
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        {/* View Mode & Sort Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 border-t border-b border-bordered py-3 sm:py-4 gap-3 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 sm:p-2 rounded ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    <TfiLayoutListThumbAlt size={14} className={`sm:w-4 sm:h-4 ${viewMode === "list" ? "text-primary" : "text-gray-400"}`} />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid-2")}
                                    className={`p-1.5 sm:p-2 rounded ${viewMode === "grid-2" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    <TfiLayoutGrid2Alt size={14} className={`sm:w-4 sm:h-4 ${viewMode === "grid-2" ? "text-primary" : "text-gray-400"}`} />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid-3")}
                                    className={`p-1.5 sm:p-2 rounded ${viewMode === "grid-3" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    <TfiLayoutGrid3Alt size={14} className={`sm:w-4 sm:h-4 ${viewMode === "grid-3" ? "text-primary" : "text-gray-400"}`} />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid-4")}
                                    className={`p-1.5 sm:p-2 rounded ${viewMode === "grid-4" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    <TfiLayoutGrid4Alt size={14} className={`sm:w-4 sm:h-4 ${viewMode === "grid-4" ? "text-primary" : "text-gray-400"}`} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Select
                                        className="w-auto"
                                        size="sm"
                                        label="Sort by"
                                        labelPlacement="outside-left"
                                        onChange={() => { }}
                                        defaultSelectedKeys={["Popularity"]}
                                        classNames={{
                                            base: "gap-1.5",
                                            mainWrapper: "w-auto",
                                            trigger: "w-auto min-w-[140px] sm:min-w-[160px]",
                                            popoverContent: "w-auto min-w-[180px]",
                                            value: "text-xs sm:text-sm whitespace-nowrap",
                                            label: "text-xs sm:text-sm text-gray-500 whitespace-nowrap",
                                        }}
                                    >
                                        {sortByOption.map((data) => (
                                            <SelectItem key={data.value}>
                                                {data.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Select
                                        className="w-auto min-w-[80px]"
                                        size="sm"
                                        label="Show"
                                        labelPlacement="outside-left"
                                        onChange={handlePerPageChange}
                                        // defaultSelectedKeys={[perPage]}
                                        selectedKeys={[String(perPage)]}
                                        classNames={{
                                            base: "gap-1",
                                            mainWrapper: "w-auto",
                                            trigger: "min-w-[80px] w-auto",
                                            popoverContent: "w-auto min-w-full",
                                        }}
                                    >
                                        {perPageOption.map((data) => (
                                            <SelectItem key={data.value}>{data.label}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>


                        {/* Product Grid */}
                        {isLoadingProductList ? (
                            <div className={`grid ${getGridClass()} gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8`}>
                                {[...Array(perPage)].map((_, index) => (
                                    <ProductCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            <div className={`grid ${getGridClass()} mb-6 sm:mb-8`}>
                                {productList?.data?.map((product: any) => (
                                    <div key={product.id} className="relative">
                                        <ProductCard
                                            data={product}
                                            isOverlayButton={viewMode !== "list"}
                                            isListView={viewMode === "list"}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {isLoadingProductList ? (
                            <PaginationSkeleton />
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                                <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                                    Results {productList?.count > 0 ? ((currentPage - 1) * perPage) + 1 : 0}-{Math.min(currentPage * perPage, productList?.count || 0)} of {productList?.count || 0}
                                </p>
                                <Pagination
                                    total={Math.ceil((productList?.count || 0) / perPage)}
                                    initialPage={currentPage}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    showControls
                                    color="primary"
                                    size="sm"
                                    className="order-1 sm:order-2"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ProductList;
