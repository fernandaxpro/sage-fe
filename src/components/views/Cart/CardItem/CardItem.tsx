import { Product } from "@/types";
import { Button, Checkbox, Image } from "@heroui/react";
import { FaHeart, FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

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

export default CartItem;