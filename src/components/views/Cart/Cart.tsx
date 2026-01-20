import { useState, useMemo } from "react"
import Container from "@/components/ui/Container"
import PageWrapper from "@/components/ui/PageWrapper"
import { BREADCRUMBS_CART } from "./Cart.constants"
import { Button, Checkbox, Input } from "@heroui/react"
import { dummyProducts } from "@/data/products"
import { Product } from "@/types"
import CartItem from "./CardItem/CardItem"
import { useRouter } from "next/router"

interface CartItemData extends Product {
    quantity: number;
    isSelected: boolean;
}


const Cart = () => {
    const router = useRouter()
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
                            <Button 
                                radius="full" 
                                className="bg-primary px-[65px] py-[17px] text-white text-[20px] w-full md:w-auto font-semibold"
                            >
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
