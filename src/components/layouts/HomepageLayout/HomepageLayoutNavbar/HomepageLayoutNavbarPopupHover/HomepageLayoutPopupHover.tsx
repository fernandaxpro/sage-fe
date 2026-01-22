import Link from "next/link";
import { convertCategoriesToPopupContent, NAV_CATEGORIES } from "../../HomepageLayout.constants";
import useHomepageLayoutPopupHover from "./useHomepageLayoutPopupHover";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useHome from "@/hooks/useHome";
import { useMemo } from "react";
import { PopupContentMap } from "./HomepageLayoutPopupHover.constants";

const HomepageLayoutNavbarPopupHover = () => {
  const {
    hoveredCategory,
    handleDelayedMouseEnter,
    handleDelayedMouseLeave,
    renderPopupContent,
    scrollContainerRef,
    scrollLeft,
    scrollRight,
  } = useHomepageLayoutPopupHover();

  const { homeData } = useHome();

  const dynamicPopupContent: PopupContentMap = useMemo(() => {
    if (!homeData?.categories) return {} as PopupContentMap;

    return {
      "Products": convertCategoriesToPopupContent(homeData.categories)
    };
  }, [homeData?.categories]);

  return (
    <div className="relative" onMouseLeave={handleDelayedMouseLeave}>
      {/* Flex container with arrows and scrollable menu */}
      <div className="flex items-center">
        {/* Left Arrow - Mobile Only */}
        <button
          onClick={scrollLeft}
          className="md:hidden flex-shrink-0 bg-secondary hover:bg-bordered shadow-sm rounded-full p-2 ml-2 my-3"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="w-4 h-4 text-muted" />
        </button>

        {/* Scrollable Navigation Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-hide px-4 md:px-10"
        >
          <div className="max-w-standard w-full mx-auto flex md:flex-wrap md:justify-center items-center">
            {NAV_CATEGORIES.map((item) => (
              <div
                key={item.label}
                className="flex items-center text-primary hover:text-success py-3 px-3 md:py-4 md:px-5 transition-colors duration-200 flex-shrink-0"
              >
                {item.label === "Products" ? (
                  <span
                    className="font-medium text-center text-sm md:text-base whitespace-nowrap cursor-default"
                    onMouseEnter={() => handleDelayedMouseEnter(item.label)}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="font-medium text-center text-sm md:text-base whitespace-nowrap"
                    onMouseEnter={() => handleDelayedMouseEnter(item.label)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - Mobile Only */}
        <button
          onClick={scrollRight}
          className="md:hidden flex-shrink-0 bg-secondary hover:bg-bordered shadow-sm rounded-full p-2 mr-2 my-3"
          aria-label="Scroll right"
        >
          <FaChevronRight className="w-4 h-4 text-muted" />
        </button>
      </div>

      {/* ✅ Fixed: Check dengan proper typing */}
      {hoveredCategory && 
       dynamicPopupContent[hoveredCategory] && 
       dynamicPopupContent[hoveredCategory]?.brands && 
       dynamicPopupContent[hoveredCategory]?.brands!.length > 0 && (
        <div className="hidden lg:block absolute top-full left-0 right-0 z-50">
          <div className="max-w-standard mx-auto px-4 md:px-10">
            <div className="bg-white shadow-lg rounded-br-[10px] rounded-bl-[10px]">
              {renderPopupContent(hoveredCategory, dynamicPopupContent)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageLayoutNavbarPopupHover;