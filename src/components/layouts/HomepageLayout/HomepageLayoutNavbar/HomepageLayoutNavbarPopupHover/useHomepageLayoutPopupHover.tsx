import { useRef, useState } from "react";
import { BrandItem, SubItem } from "./HomepageLayoutPopupHover.constants";
import Link from "next/link";
// import { FaBox } from "react-icons/fa";
import { PopupContentMap } from "../../HomepageLayout.constants";
import { Avatar } from "@heroui/react";

const useHomepageLayoutPopupHover = () => {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleDelayedMouseEnter = (label: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        hoverTimeoutRef.current = setTimeout(() => {
            handleMouseEnter(label);
        }, 150);
    };

    const handleDelayedMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        handleMouseLeave();
    };

    const handleMouseEnter = (category: string): void => {
        setHoveredCategory(category);
    };

    const handleMouseLeave = (): void => {
        setHoveredCategory(null);
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        }
    };

    const renderPopupContent = (category: string, popupContentMap: PopupContentMap) => {
        const content = popupContentMap[category];
        if (!content || !content.brands || content.brands.length === 0) return null;

        const brandsCount = content.brands.length;

        return (
            <div className="p-4 md:p-6 lg:p-8">
                <div className={`
                    grid gap-4 md:gap-6
                    ${brandsCount === 1 ? 'grid-cols-1' : ''}
                    ${brandsCount === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
                    ${brandsCount === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
                    ${brandsCount === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : ''}
                    ${brandsCount >= 5 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : ''}
                `}>
                    {content.brands.map((brand: BrandItem, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col"
                        >
                            <h3 className="font-bold text-sm md:text-base capitalize text-primary">
                                {brand.name}
                            </h3>

                            {brand.items.length > 0 && (
                                <ul className="space-y-2">
                                    {brand.items.map((item: SubItem, itemIndex: number) => (
                                        <li key={itemIndex}>
                                            <Link
                                                href={item.href}
                                                className="flex items-center gap-2 md:gap-3 group py-1 rounded px-2 -mx-2 transition-colors"
                                            >
                                                {item.url_logo && item.url_logo !== '' && (
                                                    <Avatar
                                                        className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                                                        src={item.url_logo}
                                                        alt={item.label}
                                                        radius="sm"
                                                    />
                                                )}

                                                <span className="text-sm md:text-base capitalize font-semibold text-muted group-hover:text-success transition-colors line-clamp-1">
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return {
        hoveredCategory,
        setHoveredCategory,

        handleDelayedMouseEnter,
        handleDelayedMouseLeave,
        renderPopupContent,

        scrollContainerRef,
        scrollLeft,
        scrollRight,
    };
};

export default useHomepageLayoutPopupHover;
