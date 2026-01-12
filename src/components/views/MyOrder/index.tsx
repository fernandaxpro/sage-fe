"use client";

import { useState } from "react";
import { Button, Image, Tabs, Tab } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar";
import RateReviewModal from "./RateReviewModal";

import { dummyUser } from "@/data/users";

const MyOrder = () => {
    const orders = dummyUser.orders;
    const [selectedTab, setSelectedTab] = useState("orders");
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");

    const handleRateClick = (productName: string) => {
        setSelectedProduct(productName);
        setIsRateModalOpen(true);
    };

    const handleRateSubmit = (data: { rating: number; review: string }) => {
        console.log("Review Submitted:", data);
        // Here you would typically call an API
    };

    const getFilteredOrders = () => {
        if (selectedTab === "shipped") return orders.filter(o => o.status === "In Process");
        if (selectedTab === "cancelled") return orders.filter(o => o.status === "Cancelled");
        return orders.filter(o => o.status === "Delivered");
    };

    const filteredOrders = getFilteredOrders();

    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            {/* Sidebar */}
            <UserSidebar activeItem="My Orders" />

            {/* Main Content */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as string)}
                    variant="light"
                    classNames={{
                        tabList: "gap-4 p-0",
                        cursor: "bg-primary text-white",
                        tab: "border border-gray-300 rounded-full px-6 h-9 data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-white text-gray-600",
                        tabContent: "font-medium group-data-[selected=true]:text-white",
                        panel: "pt-6"
                    }}
                >
                    <Tab key="orders" title="Orders" />
                    <Tab key="shipped" title="Not Yet Shipped" />
                    <Tab key="cancelled" title="Cancelled Orders" />
                </Tabs>

                <div className="space-y-4 mt-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="border border-[#E4E4E4] rounded-lg p-6 bg-white">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4 text-xs text-gray-500">
                                        <span>{order.date}</span>
                                        <span>{order.id}</span>
                                    </div>
                                    <span className={`px-4 py-1 rounded-full text-xs font-medium border ${order.status === "Delivered" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                        order.status === "In Process" ? "bg-orange-50 text-orange-600 border-orange-200" :
                                            "bg-red-50 text-red-600 border-red-200"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                                        <Image
                                            src={order.items[0].image}
                                            alt={order.items[0].name}
                                            className="w-full h-full object-contain"
                                            fallbackSrc="https://via.placeholder.com/64"
                                            radius="none"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                            {order.items[0].name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">{order.items[0].qty}x item</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-xs text-gray-500 mb-1">Total :</p>
                                        <p className="font-bold text-lg text-[#0F2744]">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-[#E4E4E4]">
                                    {order.status !== "In Process" && (
                                        <Button
                                            variant="bordered"
                                            radius="full"
                                            className="border-[#0F2744] text-[#0F2744] font-medium"
                                        >
                                            View Invoice
                                        </Button>
                                    )}
                                    {order.status === "Delivered" && (
                                        <Button
                                            className="bg-[#0F2744] text-white font-medium"
                                            radius="full"
                                            onPress={() => handleRateClick(order.items[0].name)}
                                        >
                                            Rate & Review
                                        </Button>
                                    )}
                                    {order.status === "Cancelled" && (
                                        <Button
                                            className="bg-[#0F2744] text-white font-medium"
                                            radius="full"
                                        >
                                            Buy Again
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No orders found in this category.
                        </div>
                    )}
                </div>
            </div>
            <RateReviewModal
                isOpen={isRateModalOpen}
                onClose={() => setIsRateModalOpen(false)}
                productName={selectedProduct}
                onSubmit={handleRateSubmit}
            />
        </Container>
    );
};

export default MyOrder;
