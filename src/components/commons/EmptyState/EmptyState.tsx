import React from "react";
import { Card } from "@heroui/react";
import { CiImageOff } from "react-icons/ci";

interface EmptyStateProps {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  descriptionClassName?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No Data Found!",
  description,
  icon,
  className = "",
  iconClassName = "",
  textClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <Card shadow="none" className={`w-full py-12 px-6 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className={`mb-4 ${iconClassName}`}>
          {icon || (
            <CiImageOff 
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-gray-400" 
            />
          )}
        </div>

        {/* Message */}
        <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 mb-2 ${textClassName}`}>
          {message}
        </h3>

        {/* Optional Description */}
        {description && (
          <p className={`text-sm md:text-base text-gray-500 max-w-md ${descriptionClassName}`}>
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default EmptyState;