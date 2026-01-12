"use client";

import { Input, Image, Select, SelectItem, Avatar } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar";
import { FaSearch, FaStar } from "react-icons/fa";

import { dummyUser } from "@/data/users";

const MyReview = () => {
    const reviews = dummyUser.reviews;
    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Sidebar */}
            <UserSidebar activeItem="My Reviews" />

            {/* Main Content */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                    <Input
                        placeholder="Search your review here"
                        startContent={<FaSearch className="text-gray-400" />}
                        radius="full"
                        classNames={{
                            inputWrapper: "bg-white border border-[#E4E4E4] h-11",
                            input: "text-sm",
                        }}
                        className="w-full sm:max-w-md"
                    />

                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm whitespace-nowrap">Sort by</span>
                        <Select
                            defaultSelectedKeys={["this-month"]}
                            className="w-[140px]"
                            classNames={{
                                trigger: "bg-transparent shadow-none hover:bg-transparent min-h-unit-8 h-8",
                                value: "text-gray-900 font-medium text-sm",
                            }}
                            aria-label="Sort reviews"
                        >
                            <SelectItem key="this-month">
                                This Month
                            </SelectItem>
                            <SelectItem key="last-month">
                                Last Month
                            </SelectItem>
                        </Select>
                    </div>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="border border-[#E4E4E4] rounded-lg p-6 bg-white relative">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Product Image */}
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center p-1 shrink-0 mt-1">
                                    <Image
                                        src={review.productImage}
                                        alt={review.productName}
                                        className="w-full h-full object-contain"
                                        fallbackSrc="https://via.placeholder.com/48"
                                        radius="none"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-base mb-1">
                                        {review.productName}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-900 mb-4">
                                        ${review.price.toFixed(2)}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        &quot;{review.text}&quot;
                                    </p>
                                </div>

                                {/* User Info & Rating (Right Side) */}
                                <div className="flex flex-col items-end gap-1 md:min-w-[150px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium text-gray-900">{review.user.name}</span>
                                        <Avatar
                                            src={review.user.avatar}
                                            className="w-6 h-6"
                                        />
                                    </div>
                                    <div className="flex gap-1 text-yellow-400 text-xs mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < review.rating ? "text-yellow-400" : "text-[#E4E4E4]"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default MyReview;
