import { Skeleton } from "@heroui/react";
import Container from "@/components/ui/Container";

const ProductDetailSkeleton = () => {
  return (
    <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12 rounded" />
        <span className="text-gray-300">/</span>
        <Skeleton className="h-4 w-16 rounded" />
        <span className="text-gray-300">/</span>
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      <div className="flex flex-col gap-6">
        {/* Product Information Container */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Product Image Slider Skeleton */}
          <div className="flex-1 lg:w-[400px] xl:w-[450px] flex-shrink-0">
            {/* Main Image Skeleton */}
            <div className="mb-4">
              <Skeleton className="w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg" />
            </div>

            {/* Thumbnail Images Skeleton */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton
                  key={item}
                  className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {/* Product Information Detail Skeleton */}
            <div className="flex-1 flex flex-col gap-6 lg:px-10">
              {/* Header Section */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-8 w-full max-w-md rounded" />
                <Skeleton className="h-6 w-32 rounded mt-1" />
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>

              <Skeleton className="h-px w-full" />

              {/* Features List Skeleton */}
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Skeleton className="w-4 h-4 rounded-full mt-1" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-px w-full" />

              {/* Benefits Section Skeleton */}
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 rounded mt-0.5" />
                    <Skeleton className="h-5 w-56 rounded" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-px w-full" />

              {/* Tags and SKU Skeleton */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-12 rounded" />
                  <Skeleton className="h-5 w-40 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-10 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
              </div>

              <Skeleton className="h-px w-full" />

              {/* Social Media Icons Skeleton */}
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="w-10 h-10 rounded" />
                ))}
              </div>
            </div>

            {/* Product Action Skeleton */}
            <div className="flex-1 flex flex-col gap-6 px-8 py-6 bg-secondary rounded-lg md:max-w-[320px]">
              {/* Stock Status Skeleton */}
              <Skeleton className="h-6 w-40 rounded-full" />

              {/* Price Skeleton */}
              <Skeleton className="h-10 w-32 rounded" />

              {/* Color Selection Skeleton */}
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-16 rounded" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="w-8 h-8 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Size Selection Skeleton */}
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-12 rounded" />
                <div className="flex gap-3">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="w-12 h-10 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Quantity Selection Skeleton */}
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-12 w-[140px] rounded-full" />
              </div>

              {/* Add to Cart Button Skeleton */}
              <Skeleton className="h-12 w-full rounded-full" />

              {/* Wishlist and Compare Links Skeleton */}
              <div className="flex items-center justify-center gap-6">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Tab Skeleton */}
        <div className="flex flex-col gap-4">
          {/* Tabs Navigation Skeleton */}
          <div className="flex items-center gap-8 border-b border-gray-200 pb-2">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-6 w-24 rounded" />
            ))}
          </div>

          {/* Tab Content Skeleton */}
          <div className="border border-bordered rounded-lg p-10">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailSkeleton;