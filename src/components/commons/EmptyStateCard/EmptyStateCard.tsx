import React from "react";
import { Card, Skeleton } from "@heroui/react";
import { CiImageOff } from "react-icons/ci";

interface EmptyStateCardProps {
  count?: number;
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  showSkeleton?: boolean;
  className?: string;
  cardClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  descriptionClassName?: string;
  isEmptyCardFullWidth?: boolean;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  count = 3,
  message,
  description,
  icon,
  showSkeleton = false,
  className = "",
  cardClassName = "",
  iconClassName = "",
  textClassName = "",
  descriptionClassName = "",
  isEmptyCardFullWidth = true,
}) => {
  const skeletonArray = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      className={`grid ${
        isEmptyCardFullWidth
          ? "grid-cols-1"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6"
      } gap-0 w-full ${className}`}
    >
      {skeletonArray.map((index) => (
        <Card
          key={index}
          className={`py-12 px-6 ${cardClassName}`}
          shadow="none"
          radius="none"
        >
          <div className="flex flex-col items-center justify-center text-center h-full">
            {showSkeleton ? (
              <>
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4" />
                <Skeleton className="w-3/4 h-6 rounded-lg mb-2" />
                {description && <Skeleton className="w-full h-4 rounded-lg" />}
              </>
            ) : (
              <>
                <div className={`mb-3 ${iconClassName}`}>
                  {icon || (
                    <CiImageOff className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                  )}
                </div>

                {message && (
                  <h3
                    className={`text-base md:text-lg font-semibold text-gray-700 mb-1 ${textClassName}`}
                  >
                    {message}
                  </h3>
                )}

                {description && (
                  <p
                    className={`text-xs md:text-sm text-gray-500 max-w-xs ${descriptionClassName}`}
                  >
                    {description}
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EmptyStateCard;