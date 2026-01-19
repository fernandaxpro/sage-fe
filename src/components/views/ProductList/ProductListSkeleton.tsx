import { Skeleton } from "@heroui/react";

// Product Card Skeleton Component
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-[#E4E4E4] rounded-lg p-3 sm:p-4 flex flex-col justify-between">
      <div className="flex items-center justify-center mb-3 sm:mb-4 h-[100px] sm:h-[120px] md:h-[140px]">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <Skeleton className="w-full h-8 sm:h-10 rounded" />
        <Skeleton className="w-20 h-6 sm:h-7 rounded" />
        
        <div className="flex items-center justify-between w-full mt-0.5 sm:mt-1">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-20 h-4 rounded" />
        </div>
      </div>
    </div>
  );
};

// Filter Sidebar Skeleton Component
export const FilterSidebarSkeleton = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
      {/* Mobile Header Skeleton */}
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b">
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      )}

      {/* Filters Title - Desktop */}
      {!isMobile && <Skeleton className="w-20 h-6 rounded" />}
      
      {/* On Sale Skeleton */}
      <div>
        <Skeleton className="w-16 h-5 rounded mb-3" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-full h-5 rounded" />
          ))}
        </div>
      </div>
      
      {/* Price Skeleton */}
      <div>
        <Skeleton className="w-20 h-5 rounded mb-3" />
        <Skeleton className="w-full h-6 rounded" />
        <div className="flex justify-between mt-2">
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
      </div>
      
      {/* Brands Skeleton */}
      <div>
        <Skeleton className="w-16 h-5 rounded mb-3" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="w-full h-5 rounded" />
          ))}
        </div>
        <Skeleton className="w-20 h-4 rounded mt-2" />
      </div>
      
      {/* Rating Skeleton */}
      <div>
        <Skeleton className="w-20 h-5 rounded mb-3" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-full h-5 rounded" />
          ))}
        </div>
      </div>

      {/* Apply Button - Mobile Only */}
      {isMobile && (
        <div className="pt-4 border-t">
          <Skeleton className="w-full h-10 rounded" />
        </div>
      )}
    </div>
  );
};

// Pagination Skeleton Component
export const PaginationSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <Skeleton className="w-64 sm:w-80 h-8 rounded order-1 sm:order-2" />
      <Skeleton className="w-32 sm:w-40 h-5 rounded order-2 sm:order-1" />
    </div>
  );
};

// Controls Skeleton Component
export const ControlsSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 border-t border-b border-[#E4E4E4] py-3 sm:py-4 gap-3 sm:gap-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="w-8 h-8 rounded" />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Skeleton className="w-12 h-4 rounded" />
          <Skeleton className="w-[100px] sm:w-[140px] h-9 rounded" />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Skeleton className="w-10 h-4 rounded" />
          <Skeleton className="w-16 h-9 rounded" />
        </div>
      </div>
    </div>
  );
};