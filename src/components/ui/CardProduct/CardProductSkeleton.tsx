import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

interface CardProductSkeletonProps {
  count?: number;
  cardClassName?: string;
}

const CardProductSkeleton = ({ 
  count = 3, 
  cardClassName 
}: CardProductSkeletonProps) => {
  return (
    <div
       className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 ${cardClassName}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          shadow="none"
          radius="none"
          className="flex flex-col justify-between p-4 bg-white border border-[#E4E4E4]"
        >
          <CardBody className="overflow-visible p-0 mb-4 flex items-center justify-center">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-[180px] rounded-lg" />
          </CardBody>

          <CardFooter className="flex flex-col items-start gap-3 p-0">
            {/* Title Skeleton - 2 lines */}
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>

            {/* Price Skeleton */}
            <Skeleton className="h-8 w-24 rounded-lg" />

            {/* Rating Skeleton */}
            <div className="flex items-center justify-between w-full mt-1">
              <Skeleton className="h-4 w-28 rounded-lg" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardProductSkeleton;