import { Skeleton } from "@heroui/react";
import Container from "@/components/ui/Container";

const ProductDetailSkeleton = () => {
  return (
    <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-2">
        <Skeleton className="h-4 w-12 rounded-lg" />
        <Skeleton className="h-4 w-16 rounded-lg" />
        <Skeleton className="h-4 w-14 rounded-lg" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0">
          <Skeleton className="rounded-lg mb-4 h-[250px] sm:h-[300px]" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <Skeleton className="h-8 w-3/4 rounded-lg mb-2" />
          <Skeleton className="h-4 w-full rounded-lg mb-2" />
          <Skeleton className="h-4 w-2/3 rounded-lg mb-4" />

          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>

          <Skeleton className="h-10 w-32 rounded-lg mb-4" />

          <Skeleton className="h-4 w-40 rounded-lg mb-4" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-4 w-28 rounded-lg" />
          </div>
        </div>

        <div className="lg:w-[200px] xl:w-[220px] flex-shrink-0">
          <div className="bg-secondary p-4 flex flex-col gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
        <div className="flex-1">
          <div className="flex gap-4 mb-4">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        <div className="lg:w-[200px] xl:w-[220px] flex-shrink-0">
          <Skeleton className="h-6 w-32 rounded-lg mb-4" />
          <div className="border border-[#E4E4E4] rounded-lg p-4">
            <Skeleton className="h-[100px] w-full rounded-lg mb-3" />
            <Skeleton className="h-4 w-full rounded-lg mb-2" />
            <Skeleton className="h-4 w-2/3 rounded-lg mb-2" />
            <Skeleton className="h-6 w-20 rounded-lg mb-2" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailSkeleton;