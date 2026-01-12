import { useRef, useState } from "react";
import { BrandItem, POPUP_CONTENT, SubItem } from "./HomepageLayoutPopupHover.constants";
import Link from "next/link";
import { FaBox } from "react-icons/fa";

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

    const renderPopupContent = (category: string) => {
        const content = POPUP_CONTENT[category];
        if (!content) return null;
        return (
            <div className="p-8 flex max-w-full">
                {content.brands?.map((brand: BrandItem, index: number) => (
                    <div
                        key={index}
                        className={`
                            flex-1 min-w-[200px] px-6
                            ${index !== (content.brands?.length || 0) - 1 ? 'border-r border-[#E4E4E4]' : ''}
                            ${index === 0 ? 'pl-0' : ''}
                            ${index === (content.brands?.length || 0) - 1 ? 'pr-0' : ''}
                        `}
                    >
                        <h3 className="font-bold text-base uppercase mb-4 text-[#F59E0B]">
                            {brand.name}
                        </h3>

                        <ul className="space-y-3">
                            {brand.items.map((item: SubItem, itemIndex: number) => (
                                <li key={itemIndex}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 group"
                                    >
                                        <span className="text-gray-400 group-hover:text-[#0F2744] transition-colors">
                                            {item.icon || <FaBox className="w-5 h-5" />}
                                        </span>
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-[#F59E0B] transition-colors">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
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
