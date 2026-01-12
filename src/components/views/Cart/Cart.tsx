import { useState, useMemo } from "react"
import Container from "@/components/ui/Container"
import PageWrapper from "@/components/ui/PageWrapper"
import { BREADCRUMBS_CART } from "./Cart.constants"
import { Button, Checkbox, Input } from "@heroui/react"
import Image from "next/image"
import { FaHeart, FaMinus, FaPlus, FaTrash } from "react-icons/fa6"
import { dummyProducts } from "@/data/products"
import { Product } from "@/types"

interface CartItemData extends Product {
    quantity: number;
    isSelected: boolean;
}

interface CartItemProps {
    item: CartItemData;
    onToggleSelect: (id: number) => void;
    onUpdateQuantity: (id: number, newQty: number) => void;
    onDelete: (id: number) => void;
}

const CartItem = ({ item, onToggleSelect, onUpdateQuantity, onDelete }: CartItemProps) => {
    return (
        <div
            className="border-black/20 p-5 rounded-[8px] border-[0.5px] flex flex-col gap-10 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => onToggleSelect(item.id as number)}
        >
            <div className="flex items-center">
                <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Checkbox isSelected={item.isSelected} onValueChange={() => onToggleSelect(item.id as number)} />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Desktop View */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Image
                            alt={item.title}
                            height={65}
                            src={item.img}
                            width={65}
                            className="flex-shrink-0"
                        />

                        {/* min-w-[200px] */}
                        <div className="flex-1 w-[40%]">
                            <h1 className="text-[22px] font-medium leading-tight">
                                {item.title}
                            </h1>
                        </div>

                        <div className="flex flex-col justify-end items-end gap-5 w-[60%]">
                            <div className="w-full">
                                <p className="font-bold text-[25px] text-primary text-right">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="flex items-center gap-[28px]">
                                <div className="flex gap-[15px]">
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaHeart />
                                    </Button>
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id as number);
                                        }}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>

                                <div className="w-[182px] h-[50px] bg-secondary/10 rounded-full flex items-center justify-between">
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onUpdateQuantity(item.id as number, Math.max(1, item.quantity - 1));
                                        }}
                                    >
                                        <FaMinus />
                                    </Button>
                                    {item.quantity}
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onUpdateQuantity(item.id as number, item.quantity + 1);
                                        }}
                                    >
                                        <FaPlus />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden">
                        <div className="mb-4 flex flex-row gap-2">
                            <Image
                                alt={item.title}
                                height={50}
                                src={item.img}
                                width={50}
                                className="flex-shrink-0 mb-3"
                            />

                            <div>
                                <h1 className="text-[18px] sm:text-[20px] font-medium leading-tight">
                                    {item.title}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 justify-between">
                            <div>
                                <p className="font-bold text-[20px] sm:text-[22px] text-primary">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex gap-[15px]">
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium w-10 h-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaHeart />
                                    </Button>
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium w-10 h-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id as number);
                                        }}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>

                                <div className="w-full sm:w-[150px] h-[45px] bg-secondary/10 rounded-full flex items-center justify-between px-2">
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium rounded-full w-8 h-8"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onUpdateQuantity(item.id as number, Math.max(1, item.quantity - 1));
                                        }}
                                    >
                                        <FaMinus />
                                    </Button>
                                    <span className="text-sm font-medium">{item.quantity}</span>
                                    <Button
                                        color="default"
                                        variant="light"
                                        isIconOnly
                                        className="font-medium rounded-full w-8 h-8"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onUpdateQuantity(item.id as number, item.quantity + 1);
                                        }}
                                    >
                                        <FaPlus />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    // Initialize with first 3 products
    const [cartItems, setCartItems] = useState<CartItemData[]>(
        dummyProducts.slice(0, 3).map(p => ({
            ...p,
            quantity: 1,
            isSelected: true
        }))
    );

    const subtotal = useMemo(() => {
        return cartItems
            .filter(item => item.isSelected)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);

    const handleUpdateQuantity = (id: number, newQty: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        ));
    };

    const handleToggleSelect = (id: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, isSelected: !item.isSelected } : item
        ));
    };

    const handleDelete = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleSelectAll = (isSelected: boolean) => {
        setCartItems(prev => prev.map(item => ({ ...item, isSelected })));
    };

    const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.isSelected);

    return (
        <Container>
            <PageWrapper
                breadcrumbs={BREADCRUMBS_CART}
                title="Shopping Cart"
            >
                <div className="flex justify-between flex-col lg:flex-row gap-10 lg:gap-5">
                    <div className="flex flex-col gap-5 w-full lg:w-[60%]">
                        <div className="flex justify-between border-black/20 p-5 rounded-[8px] border-[0.5px]">
                            <Checkbox
                                isSelected={isAllSelected}
                                onValueChange={handleSelectAll}
                            >
                                Select All
                            </Checkbox>
                            <Button
                                color="danger"
                                variant="light"
                                className="text-[22px] font-semibold"
                                onClick={() => setCartItems(prev => prev.filter(item => !item.isSelected))}
                            >
                                Delete
                            </Button>
                        </div>

                        <div className="flex flex-col gap-5">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onToggleSelect={handleToggleSelect}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        <div className="flex justify-between flex-col md:flex-row gap-[16px] items-center">
                            <Button radius="full" className="bg-primary px-[43px] py-[17px] text-white text-[18px] w-full md:w-auto font-semibold">
                                Back to Product
                            </Button>

                            <div className="flex gap-[16px] w-full md:w-auto">
                                <Input
                                    radius="full"
                                    width={361}
                                    placeholder="Enter your cupon"
                                />
                                <Button radius="full" variant="bordered" className="text-primary px-[43px] py-[17px] border-primary text-[18px] font-semibold border-[1px]">
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="border-black/20 p-5 rounded-[8px] border-[0.5px] w-full lg:w-[40%] lg:sticky lg:top-5">
                        <div className="flex flex-col gap-5 mb-6">
                            <h1 className="text-[25px] font-semibold">Summary Cart</h1>

                            <div className="flex justify-between">
                                <h2 className="text-[22px] font-medium">
                                    Subtotal
                                </h2>

                                <p className="text-[22px] font-medium">
                                    ${subtotal.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="py-5 border-y-[1px] border-cyan-600">
                            <p>
                                Enter your address to view shipping options.
                            </p>
                        </div>

                        <div className="flex justify-between my-6">
                            <h2 className="text-[22px] font-bold text-primary">
                                Total
                            </h2>

                            <p className="text-[22px] font-bold text-primary">
                                ${subtotal.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex justify-center items-center">
                            <Button radius="full" className="bg-primary px-[65px] py-[17px] text-white text-[20px] w-full md:w-auto font-semibold">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </Container>
    )
}

export default Cart
