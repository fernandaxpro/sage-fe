/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Checkbox
} from "@heroui/react";

interface ModalRateReviewProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    onSubmit: (data: { rating: number; review: string; isAnonymous: boolean }) => void;
}

const ModalRateReview: React.FC<ModalRateReviewProps> = ({ isOpen, onClose, productName, onSubmit }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    const ratings = [
        { value: 1, label: "Terrible", emoji: "😖" },
        { value: 2, label: "Bad", emoji: "😞" },
        { value: 3, label: "Okay", emoji: "👌" },
        { value: 4, label: "Good", emoji: "😊" },
        { value: 5, label: "Love It!", emoji: "😍" },
    ];

    const handleSubmit = () => {
        if (rating) {
            onSubmit({ rating, review, isAnonymous });
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            classNames={{
                header: "border-b border-[#E4E4E4]",
                footer: "justify-center pt-8 pb-8",
                closeButton: "top-4 right-4 text-gray-400 hover:text-gray-600",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-6">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-full border border-[#E4E4E4] flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0006 17.75L5.82861 20.995L7.00761 14.122L2.00761 9.25503L8.90761 8.25503L11.9936 2.00203L15.0926 8.25503L21.9926 9.25503L16.9926 14.122L18.1716 20.995L12.0006 17.75Z" stroke="#0F2744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Rate and Review</h2>
                                    <p className="text-gray-500 font-normal text-sm">Share your rating and feedback for this item.</p>
                                </div>
                            </div>
                        </ModalHeader>
                        <ModalBody className="py-6">
                            {/* Rating Section */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-4">Your Rating</label>
                                <div className="flex justify-between sm:justify-start sm:gap-8 overflow-x-auto pb-2">
                                    {ratings.map((r) => (
                                        <button
                                            key={r.value}
                                            onClick={() => setRating(r.value)}
                                            className="flex flex-col items-center gap-2 group min-w-[60px]"
                                        >
                                            <div
                                                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-200 border ${rating === r.value
                                                    ? "bg-blue-50 border-blue-200 scale-110"
                                                    : "bg-white border-[#E4E4E4] hover:border-[#E4E4E4]"
                                                    }`}
                                            >
                                                {r.emoji}
                                            </div>
                                            <span
                                                className={`text-xs ${rating === r.value ? "text-blue-600 font-medium" : "text-gray-400"
                                                    }`}
                                            >
                                                {r.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Name */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Product Name</label>
                                <Input
                                    value={productName}
                                    readOnly
                                    variant="bordered"
                                    radius="lg"
                                    classNames={{
                                        inputWrapper: "bg-gray-50 border-[#E4E4E4]",
                                        input: "text-gray-700",
                                    }}
                                />
                            </div>

                            {/* Review Textarea */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Your Review <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    placeholder="Write a short review about this product..."
                                    value={review}
                                    onValueChange={setReview}
                                    variant="bordered"
                                    radius="lg"
                                    minRows={4}
                                    classNames={{
                                        inputWrapper: "border-[#E4E4E4] hover:border-gray-300 focus-within:border-primary",
                                        input: "text-gray-700",
                                    }}
                                />
                            </div>

                            {/* Anonymous Checkbox */}
                            <div>
                                <Checkbox
                                    isSelected={isAnonymous}
                                    onValueChange={setIsAnonymous}
                                    classNames={{
                                        label: "text-sm font-medium text-gray-900",
                                    }}
                                >
                                    Remain anonymous
                                </Checkbox>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="bg-[#0F2744] text-white font-medium px-12 h-11"
                                radius="full"
                                onPress={handleSubmit}
                            >
                                Submit Review
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalRateReview;
