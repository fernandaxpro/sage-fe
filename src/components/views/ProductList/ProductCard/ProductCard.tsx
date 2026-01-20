/* eslint-disable @typescript-eslint/no-explicit-any */
import CardProductModal from "@/components/ui/CardProduct/CardProductModal";
import { Button, Image, Tooltip, useDisclosure } from "@heroui/react";
import { Heart, Search, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaBagShopping, FaGlobe, FaStar, FaStore, FaTruck } from "react-icons/fa6";

interface PropTypes {
    data: any;
    isOverlayButton?: boolean;
}

const ProductCard = ({ data, isOverlayButton = false }: PropTypes) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (    
        <>
        <div className="bg-white border border-bordered rounded-lg p-3 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative cursor-pointer">
            {/* {onSale && (
                    <div className="absolute top-2 left-2 z-10 bg-warning rounded-full">
                        <p className="text-white font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5">
                            <BadgePercent width={16} height={16} />
                            On Sale
                        </p>
                    </div>
                )} */}

            <Link href={`/product/list/detail/${data?.slug}`} className="block">
                <div
                    className="flex items-center justify-center mb-3 sm:mb-4 h-[100px] sm:h-[120px] md:h-[140px] relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        alt={data?.product_name}
                        className="z-0 w-full object-contain h-[100px] sm:h-[120px] md:h-[140px]"
                        radius="none"
                        shadow="none"
                        src={data?.thumbnail_image}
                        width="100%"
                    />

                    {/* Overlay Buttons */}
                    {isOverlayButton && (
                        <div
                            className={`absolute top-2 right-2 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 z-10 ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <Tooltip content="Wishlist" placement="right">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    radius="full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log("add to wishlist");
                                    }}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <Heart className="text-primary" size={16} />
                                </Button>
                            </Tooltip>

                            <Tooltip content="Quick view" placement="right">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    radius="full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onOpen();
                                    }}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <Search className="text-primary" size={16} />
                                </Button>
                            </Tooltip>

                            <Tooltip content="Add to cart" placement="right">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    radius="full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log("add to cart");
                                    }}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <ShoppingBasket className="text-primary" size={16} />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </Link>

            <div className="flex flex-col gap-1.5 sm:gap-2">
                <Link href={`/product/list/detail/${data?.slug}`} className="block">
                    <p className="text-black text-xs sm:text-sm font-medium line-clamp-2 h-[32px] sm:h-[40px] leading-snug hover:text-success">{data?.product_name}</p>
                </Link>
                <p className="text-primary font-bold text-base sm:text-lg md:text-xl">${data?.price}</p>

                <div className="flex items-center justify-between w-full mt-0.5 sm:mt-1">
                    <div className="flex items-center text-success gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                                key={i}
                                size={18}
                                className={
                                    i < Math.floor(data?.stars)
                                        ? "text-rating-filled fill-current"
                                        : "text-rating-empty fill-current"
                                }
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
        <CardProductModal isOpen={isOpen} onClose={onOpenChange} data={data} />
        </>
    );
};

export default ProductCard;