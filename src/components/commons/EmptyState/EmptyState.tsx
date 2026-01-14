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
  message,
  description,
  icon,
  className = "",
  iconClassName = "",
  textClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <Card shadow="none" radius="none" className={`w-full py-12 px-6 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className={`mb-4 ${iconClassName}`}>
          {icon || (
            <CiImageOff 
              className="w-12 h-12 md:w-16 md:h-16 text-primary" 
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