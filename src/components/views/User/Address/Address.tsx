/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button, Divider, Input } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar/UserSidebar";
import { FaSearch, FaPlus } from "react-icons/fa";
import AddressModal from "./AddressModal/AddressModal";
// import { dummyUser } from "@/data/users";
import useAddress from "./useAddress";
import AddressSkeleton from "./AddressSkeleton";

const Address = () => {
    const {
        profileData,
        isLoadingProfile,
        refetchProfile,
        // error,
    } = useAddress()

    // const initialAddresses = dummyUser.addresses;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [type, setType] = useState("")
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const handleAddAddress = (type: 'shipping' | 'billing') => {
        setModalMode("add");
        setSelectedAddress(null);
        setIsModalOpen(true);
        setType(type)
    };

    const handleEditAddress = (address: any, type: 'shipping' | 'billing') => {
        setModalMode("edit");
        setSelectedAddress(address);
        setIsModalOpen(true);
        setType(type)
    };

    const formatAddress = (...parts: (string | number | null | undefined)[]) => {
        return parts.filter(Boolean).join(', ');
    };

    if (isLoadingProfile || !profileData) {
        return <AddressSkeleton />;
    }

    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Sidebar */}
            <UserSidebar activeItem="My Addresses" />

            {/* Main Content */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-primary mb-6">My Addresses</h1>

                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                    <Input
                        placeholder="Search your address here"
                        startContent={<FaSearch className="text-primary" />}
                        radius="full"
                        classNames={{
                            inputWrapper: "bg-white border border-[#E4E4E4] h-11",
                            input: "text-sm",
                        }}
                        className="w-full sm:max-w-md"
                    />

                    {/* <Button
                        className="bg-primary text-secondary font-medium"
                        startContent={<FaPlus />}
                        radius="full"
                        onPress={handleAddAddress}
                    >
                        Add New Address
                    </Button> */}
                </div>

                {/* Address List */}
                <div className="space-y-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-2">
                            <h1 className="text-lg font-bold text-primary">
                                Shipping Address
                            </h1>

                            <Button
                                className="bg-primary text-secondary font-medium"
                                startContent={<FaPlus />}
                                radius="full"
                                onPress={() => handleAddAddress('shipping')}
                            >
                                Add Shipping Address
                            </Button>
                        </div>
                        {profileData?.shipping_addresses?.map((shipping: any) => (
                            <div key={shipping?.id} className="border border-[#E4E4E4] rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1">
                                    {/* <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold text-gray-900">{shipping.label}</span>
                                        {shipping.isDefault && (
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">
                                                Default
                                            </span>
                                        )}
                                    </div> */}
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span className="font-bold text-gray-900">{profileData?.first_name} {profileData?.last_name}</span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-500">{profileData?.phone}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {formatAddress(shipping?.address, shipping?.address2)}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {formatAddress(shipping?.suburb, shipping?.state?.name, shipping?.post_code)}
                                    </p>
                                </div>

                                <Button
                                    variant="bordered"
                                    radius="full"
                                    className="border-[#E4E4E4] text-gray-700 font-medium px-6 min-w-[120px]"
                                    onPress={() => handleEditAddress(shipping, 'shipping')}
                                >
                                    Edit Address
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-2">
                            <h1 className="text-lg font-bold text-primary">
                                Billing Address
                            </h1>

                            <Button
                                className="bg-primary text-secondary font-medium"
                                startContent={<FaPlus />}
                                radius="full"
                                onPress={() => handleAddAddress('billing')}
                            >
                                Add Billing Address
                            </Button>
                        </div>
                        {profileData?.billing_addresses?.map((shipping: any) => (
                            <div key={shipping?.id} className="border border-[#E4E4E4] rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span className="font-bold text-gray-900">{profileData?.first_name} {profileData?.last_name}</span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-500">{profileData?.phone}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {formatAddress(shipping?.address, shipping?.address2)}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {formatAddress(shipping?.suburb, shipping?.state?.name, shipping?.post_code)}
                                    </p>
                                </div>

                                <Button
                                    variant="bordered"
                                    radius="full"
                                    className="border-[#E4E4E4] text-gray-700 font-medium px-6 min-w-[120px]"
                                    onPress={() => handleEditAddress(shipping, 'billing')}
                                >
                                    Edit Address
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                setMode={setModalMode}
                initialData={selectedAddress}
                setInitial={setSelectedAddress}
                type={type}
                setType={setType}
                refetchProfile={refetchProfile}
            />
        </Container>
    );
};

export default Address;