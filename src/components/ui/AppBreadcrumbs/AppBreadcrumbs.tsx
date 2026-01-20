import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface BreadcrumbItemType {
  label: string | ReactNode;
  href?: string;
  onClick?: () => void;
}

interface AppBreadcrumbsProps {
  items?: BreadcrumbItemType[];
  separator?: string | ReactNode;
  className?: string;
  itemClasses?: {
    item?: string;
    separator?: string;
  };
}

const AppBreadcrumbs = ({ 
  items = [], 
  separator,
  className = "",
  itemClasses = {
    item: "text-primary/60 data-[current=true]:text-primary data-[current=true]:font-medium",
    separator: "text-primary/40"
  }
}: AppBreadcrumbsProps) => {
  const router = useRouter();

  if (!items || items.length === 0) return null;

  return (
    <Breadcrumbs 
      className={`text-xs sm:text-sm text-primary ${className}`}
      separator={separator}
      itemClasses={itemClasses}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        const handleClick = !isLast 
          ? (item.onClick || (item.href ? () => router.push(item.href!) : undefined))
          : undefined;
        
        return (
          <BreadcrumbItem
            key={index}
            href={!isLast && item.href ? item.href : undefined}
            onClick={handleClick}
            isCurrent={isLast}
          >
            {item.label}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;