"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar";
import { FaSearch, FaPlus } from "react-icons/fa";
import AddressModal from "./AddressModal";

import { dummyUser } from "@/data/users";

const MyAddress = () => {
    const initialAddresses = dummyUser.addresses;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const handleAddAddress = () => {
        setModalMode("add");
        setSelectedAddress(null);
        setIsModalOpen(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditAddress = (address: any) => {
        setModalMode("edit");
        setSelectedAddress(address);
        setIsModalOpen(true);
    };

    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Sidebar */}
            <UserSidebar activeItem="My Addresses" />

            {/* Main Content */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Addresses</h1>

                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                    <Input
                        placeholder="Search your address here"
                        startContent={<FaSearch className="text-gray-400" />}
                        radius="full"
                        classNames={{
                            inputWrapper: "bg-white border border-[#E4E4E4] h-11",
                            input: "text-sm",
                        }}
                        className="w-full sm:max-w-md"
                    />

                    <Button
                        className="bg-[#0F2A4A] text-white font-medium"
                        startContent={<FaPlus />}
                        radius="full"
                        onPress={handleAddAddress}
                    >
                        Add New Address
                    </Button>
                </div>

                {/* Address List */}
                <div className="space-y-4">
                    {initialAddresses.map((address) => (
                        <div key={address.id} className="border border-[#E4E4E4] rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-gray-900">{address.label}</span>
                                    {address.isDefault && (
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">
                                            Default
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    <span className="font-bold text-gray-900">{address.recipientName}</span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-500">{address.phoneNumber}</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {address.addressLine1}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {address.city} {address.state} {address.postcode}, {address.country}
                                </p>
                            </div>

                            <Button
                                variant="bordered"
                                radius="full"
                                className="border-[#E4E4E4] text-gray-700 font-medium px-6 min-w-[120px]"
                                onPress={() => handleEditAddress(address)}
                            >
                                Edit Address
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={selectedAddress}
            />
        </Container>
    );
};

export default MyAddress;
