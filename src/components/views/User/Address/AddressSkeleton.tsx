/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, Divider } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar/UserSidebar";

const AddressSkeleton = () => {
    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Sidebar */}
            <UserSidebar activeItem="My Addresses" />

            {/* Main Content */}
            <div className="flex-1">
                {/* Title Skeleton */}
                <Skeleton className="h-8 w-48 rounded-lg mb-6" />

                {/* Top Action Bar Skeleton */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                    <Skeleton className="h-11 w-full sm:max-w-md rounded-full" />
                </div>

                {/* Address List Skeleton */}
                <div className="space-y-4 flex flex-col gap-6">
                    {/* Shipping Address Section */}
                    <div className="flex flex-col gap-4">
                        {/* Section Header Skeleton */}
                        <div className="flex justify-between items-center gap-2">
                            <Skeleton className="h-7 w-40 rounded-lg" />
                            <Skeleton className="h-10 w-52 rounded-full" />
                        </div>

                        {/* Address Cards Skeleton */}
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="border border-[#E4E4E4] rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div className="space-y-3 flex-1 w-full">
                                    {/* Name and Phone Skeleton */}
                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-4 w-32 rounded" />
                                        <Skeleton className="h-4 w-1 rounded" />
                                        <Skeleton className="h-4 w-28 rounded" />
                                    </div>
                                    {/* Address Line 1 Skeleton */}
                                    <Skeleton className="h-4 w-full max-w-md rounded" />
                                    {/* Address Line 2 Skeleton */}
                                    <Skeleton className="h-4 w-3/4 max-w-sm rounded" />
                                </div>

                                {/* Button Skeleton */}
                                <Skeleton className="h-10 w-[120px] rounded-full" />
                            </div>
                        ))}
                    </div>

                    <Divider />

                    {/* Billing Address Section */}
                    <div className="flex flex-col gap-4">
                        {/* Section Header Skeleton */}
                        <div className="flex justify-between items-center gap-2">
                            <Skeleton className="h-7 w-36 rounded-lg" />
                            <Skeleton className="h-10 w-48 rounded-full" />
                        </div>

                        {/* Address Cards Skeleton */}
                        {[1].map((item) => (
                            <div
                                key={item}
                                className="border border-[#E4E4E4] rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div className="space-y-3 flex-1 w-full">
                                    {/* Name and Phone Skeleton */}
                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-4 w-32 rounded" />
                                        <Skeleton className="h-4 w-1 rounded" />
                                        <Skeleton className="h-4 w-28 rounded" />
                                    </div>
                                    {/* Address Line 1 Skeleton */}
                                    <Skeleton className="h-4 w-full max-w-md rounded" />
                                    {/* Address Line 2 Skeleton */}
                                    <Skeleton className="h-4 w-3/4 max-w-sm rounded" />
                                </div>

                                {/* Button Skeleton */}
                                <Skeleton className="h-10 w-[120px] rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AddressSkeleton;