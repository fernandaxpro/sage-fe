import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { ReactNode } from "react"

interface BreadCrumbs {
    title: string;
    href: string;
}

interface PropTypes {
    breadcrumbs: BreadCrumbs[];
    children: ReactNode;
    title: string;
}

const PageWrapper = ({ breadcrumbs, children, title }: PropTypes) => {
    return (
        <div className="w-full flex flex-col gap-[10px]">
            <Breadcrumbs>
                {breadcrumbs?.map((item) => (
                    <BreadcrumbItem
                        href={item.href}
                        key={`breadcrumbs-${item.title}`}
                        className="text-[24px] font-normal"
                    >
                        {item.title}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
            <h1 className="text-[24px] md:text-[55px] lg:text-[55px] xl:text-[55px]  font-semibold mb-5">{title}</h1>

            {children}
        </div>
    )
}

export default PageWrapper