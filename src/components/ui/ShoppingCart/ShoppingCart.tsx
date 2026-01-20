import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Card,
    CardBody,
    Image,
} from "@heroui/react";
import router, { useRouter } from "next/router";
import React from "react";
import { 
    FaRegHeart, 
    // FaHeart, 
    // FaTrash 
} from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    triggerButton: React.ReactNode;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const ShoppingCart = ({ isOpen, onOpenChange, triggerButton }: PropTypes) => {
    const router = useRouter()

    const cartItems: CartItem[] = [
        {
            id: 1,
            name: "Shelly BUTTON 1 - Black SH-SHELLYBTN1B",
            price: 45.27,
            quantity: 1,
            image: "https://heroui.com/images/album-cover.png"
        },
        {
            id: 2,
            name: "HiLook 4 MP Network IR Turret Camera 2.8mm IPC-T240H",
            price: 70.49,
            quantity: 1,
            image: "https://heroui.com/images/album-cover.png"
        }
    ];

    // Calculate total
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {triggerButton}
            <Modal
                hideCloseButton={true}
                isOpen={isOpen}
                backdrop="opaque"
                onOpenChange={onOpenChange}
                classNames={{
                    base: "!m-0 w-[600px] !right-0 !top-0 fixed rounded-none max-h-screen h-screen",
                    wrapper: "!items-start !justify-end !p-0",
                }}
                motionProps={{
                    variants: {
                        enter: {
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.3, ease: "easeOut" },
                        },
                        exit: {
                            x: "100%",
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" },
                        },
                    },
                }}
            >
                <ModalContent className="h-screen w-full flex flex-col !rounded-none">
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-4 font-bold text-lg flex-shrink-0">
                                <div className="flex flex-col items-start w-full">
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        onPress={onClose}
                                        className="text-4xl"
                                    >
                                        <IoCloseOutline className="text-red-500" />
                                    </Button>

                                    <h1 className="text-xl px-2 font-bold mt-[24px]">Shopping Cart ({totalItems})</h1>
                                </div>
                            </ModalHeader>

                            <ModalBody className="flex-1 overflow-y-auto px-6 min-h-0">
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start pb-2">
                                            <Card
                                                isBlurred
                                                className="border-none bg-background/60 dark:bg-default-100/50 w-full"
                                                shadow="sm"
                                            >
                                                <CardBody>
                                                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 justify-start">
                                                        <div className="relative col-span-6 md:col-span-4">
                                                            <Image
                                                                alt={item.name}
                                                                className="object-cover"
                                                                height={200}
                                                                shadow="sm"
                                                                src={item.image}
                                                                width="100%"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col justify-between col-span-6 md:col-span-8 h-[200px]">
                                                            <div className="flex flex-col gap-5 text-xl font-bold">
                                                                <h1 className="text-[20px] font-semibold">
                                                                    {item.name}
                                                                </h1>

                                                                <h2 className="text-[22px] font-semibold text-primary">
                                                                    ${item.price.toFixed(2)}
                                                                </h2>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-[18px] font-medium">
                                                                    {item.quantity}x item
                                                                </p>
                                                                <div className="flex">
                                                                    <Button
                                                                        color="default"
                                                                        variant="light"
                                                                        isIconOnly
                                                                        className="font-medium"
                                                                    >
                                                                        <FaRegHeart />
                                                                    </Button>
                                                                    <Button
                                                                        color="default"
                                                                        variant="light"
                                                                        isIconOnly
                                                                        className="font-medium"
                                                                    >
                                                                        <GoTrash />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>

                            <div className="p-6 flex-shrink-0">
                                <div className="mb-4 flex justify-between">
                                    <div className="flex items-center">
                                        <span className="text-xl font-bold">Total :</span>&nbsp;
                                        <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <Button radius="full" variant="bordered" className="text-[#FF9E02] px-[20px] py-[10px] border-[#FF9E02] text-[16px] font-medium border-[1px]" onPress={onClose}>
                                        Clear all items
                                    </Button>
                                </div>

                                <div className="flex justify-between gap-[20px]">
                                    <Button radius="full" variant="bordered" className="text-primary px-[65px] py-[15px] border-primary text-[20px] font-semibold border-[1px]" onPress={() => {
                                        router.push('/product/cart');
                                        onClose();
                                    }}>
                                        View Cart
                                    </Button>

                                    <Button 
                                        radius="full" 
                                        variant="solid" 
                                        className="text-white px-[65px] py-[15px] bg-primary text-[20px] font-semibold border-[1px]" 
                                        onPress={() => router.push('/user/order')}
                                        
                                        >
                                        Checkout
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ShoppingCart;