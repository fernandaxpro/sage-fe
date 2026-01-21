/* eslint-disable @typescript-eslint/no-explicit-any */
import CardProductModal from "@/components/ui/CardProduct/CardProductModal";
import { useIsInWishlist, useWishlist } from "@/hooks/useWishlist";
import { Button, Image, Tooltip, useDisclosure } from "@heroui/react";
import { Heart, Search, ShoppingBasket } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";

interface PropTypes {
    data: any;
    isOverlayButton?: boolean;
    isListView?: boolean;
}

const ProductCard = ({ data, isOverlayButton = false, isListView = false }: PropTypes) => {
    const { addToWishlist, removeFromWishlist, isAddingToWishlist, isRemovingFromWishlist } = useWishlist();
    const isInWishlist = useIsInWishlist(String(data?.id));
    const [isHovered, setIsHovered] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { status } = useSession();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    
    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => {
            const newQty = prev + delta;
            return newQty < 1 ? 1 : newQty;
        });
    };

    const handleWishlistToggle = () => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
            return;
        }

        const productId = String(data?.id);
        
        if (isInWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    const containerClasses = "bg-white border border-bordered p-3 sm:p-4 hover:shadow-md transition-shadow relative cursor-pointer h-full";
    
    if (isListView) {
        return (
            <>
                <div className={containerClasses}>
                    <div className="flex gap-3 sm:gap-4 md:gap-6 items-center h-full overflow-hidden">
                        {/* Image Section */}
                        <Link href={`/product/list/detail/${data?.slug}`} className="flex-shrink-0">
                            <div className="w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 flex items-center justify-center">
                                <Image
                                    alt={data?.product_name}
                                    className="w-full h-full object-contain"
                                    radius="none"
                                    shadow="none"
                                    src={data?.thumbnail_image}
                                />
                            </div>
                        </Link>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <p className="text-xs text-gray-500 mb-2">Thermometer Brand</p>
                            <Link href={`/product/list/detail/${data?.slug}`}>
                                <h3 className="text-primary font-bold text-xl hover:text-primary/80 mb-3">
                                    {data?.product_name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        size={18}
                                        className={
                                            i < Math.floor(data?.stars || 0)
                                                ? "text-orange-400 fill-current"
                                                : "text-gray-300 fill-current"
                                        }
                                    />
                                ))}
                            </div>

                            {/* Features List */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="font-bold">✓</span>
                                    <span>Study history up to 30 days</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="font-bold">✓</span>
                                    <span>Up to 5 users simultaneously</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="font-bold">✓</span>
                                    <span>Has HEALTH certificate</span>
                                </div>
                            </div>
                        </div>

                        {/* Price & Actions Section */}
                        <div className="flex flex-col gap-3 sm:gap-4 flex-shrink-0 w-48 sm:w-52 md:w-56">
                            <p className="text-primary font-bold text-4xl">${data?.price}</p>

                            {/* Quantity Control */}
                            <div className="flex items-center justify-between bg-white rounded-full px-4 py-2 border border-bordered">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="text-gray-400 hover:text-primary transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <FaMinus size={12} />
                                </button>
                                <span className="text-lg font-semibold text-primary min-w-[30px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="text-gray-400 hover:text-primary transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <FaPlus size={12} />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <Button
                                color="warning"
                                size="lg"
                                className="w-full font-semibold text-white text-base"
                                radius="full"
                                onPress={() => {
                                    if (status === 'unauthenticated') return router.push('/auth/login')
                                }}
                            >
                                Add to cart
                            </Button>

                            {/* Action Links */}
                            <div className="flex justify-center gap-6 text-sm w-full">
                                <button
                                    className={`font-medium transition-colors ${
                                        isInWishlist 
                                            ? 'text-red-500 hover:text-red-600' 
                                            : 'text-primary hover:underline'
                                    }`}
                                    onClick={handleWishlistToggle}
                                    disabled={isAddingToWishlist || isRemovingFromWishlist}
                                >
                                    {isAddingToWishlist || isRemovingFromWishlist 
                                        ? 'Loading...' 
                                        : isInWishlist 
                                            ? 'Remove from wishlist' 
                                            : 'Add to wishlist'
                                    }
                                </button>
                                <button
                                    className="text-primary hover:underline font-medium"
                                    onClick={() => {
                                        if (status === 'unauthenticated') return router.push('/auth/login')
                                    }}
                                >
                                    Add to compare
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <CardProductModal isOpen={isOpen} onClose={onOpenChange} data={data} />
            </>
        );
    }

    return (
        <>
            <div className={`${containerClasses} flex flex-col justify-between`}>
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

                        {isOverlayButton && (
                            <div
                                className={`absolute top-2 right-2 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 z-10 ${isHovered ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <Tooltip content={isInWishlist ? "Remove from wishlist" : "Add to wishlist"} placement="right">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        radius="full"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleWishlistToggle();
                                        }}
                                        disabled={isAddingToWishlist || isRemovingFromWishlist}
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <Heart 
                                            className={isInWishlist ? "text-red-500 fill-red-500" : "text-primary"} 
                                            size={16} 
                                        />
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
                                            if (status === 'unauthenticated') return router.push('/auth/login')
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
                        <p className="text-primary text-xs sm:text-sm font-medium line-clamp-2 h-[32px] sm:h-[40px] leading-snug hover:text-success">
                            {data?.product_name}
                        </p>
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
                    </div>
                </div>
            </div>
            <CardProductModal isOpen={isOpen} onClose={onOpenChange} data={data} />
        </>
    );
};

export default ProductCard;