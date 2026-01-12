import Container from "@/components/ui/Container";
import PageWrapper from "@/components/ui/PageWrapper";
import { BREADCRUMBS_WISHLIST } from "./Wishlist.constants";
import { Button, Checkbox, Chip } from "@heroui/react";
import Image from "next/image";

interface CheckIconTypes {
    size: number;
    height?: number;
    width?: number;
}

const CheckIcon = ({ size, height, width, ...props }: CheckIconTypes) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                fill="currentColor"
            />
        </svg>
    );
};

const Wishlist = () => {
    return (
        <Container>
            <PageWrapper breadcrumbs={BREADCRUMBS_WISHLIST} title="Wishlist">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between border-black/20 p-5 rounded-[8px] border-[0.5px]">
                        <Checkbox defaultSelected>Select All</Checkbox>

                        <Button
                            color="danger"
                            variant="light"
                            className="text-[22px] font-semibold"
                        >
                            Delete
                        </Button>
                    </div>

                    <div className="border-black/20 p-5 rounded-[8px] border-[0.5px] flex flex-col gap-10">
                        <div className="flex gap-4 items-center">
                            <div className="flex-shrink-0">
                                <Checkbox defaultSelected />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="hidden lg:flex items-center gap-4">
                                    <Image
                                        alt="HeroUI hero Image with delay"
                                        height={65}
                                        src="/images/banners/product-1.jpg"
                                        width={65}
                                        className="flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-[250px]">
                                        <h1 className="text-[22px] font-medium leading-tight">
                                            Hikvision Wireless Outdoor Sounder DS-PS1-E-WB
                                        </h1>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-4 min-w-fit">
                                        <p className="text-[25px] font-medium whitespace-nowrap">$79.00</p>
                                        <Chip
                                            color="success"
                                            startContent={<CheckIcon size={18} />}
                                            variant="faded"
                                            className="text-[16px] font-semibold"
                                        >
                                            In Stock
                                        </Chip>
                                        <Button className="bg-primary font-semibold text-[16px] py-3 px-8 text-white rounded-[50px] whitespace-nowrap">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>

                                <div className="lg:hidden">
                                    <div className="mb-3">
                                        <Image
                                            alt="HeroUI hero Image with delay"
                                            height={65}
                                            src="/images/banners/product-1.jpg"
                                            width={65}
                                            className="flex-shrink-0 mb-2"
                                        />
                                        <div>
                                            <h1 className="text-[22px] font-medium leading-tight">
                                                Hikvision Wireless Outdoor Sounder DS-PS1-E-WB
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <p className="text-[25px] font-medium whitespace-nowrap">$79.00</p>
                                        <Chip
                                            color="success"
                                            startContent={<CheckIcon size={18} />}
                                            variant="faded"
                                            className="text-[16px] font-semibold"
                                        >
                                            In Stock
                                        </Chip>
                                        <Button className="bg-primary font-semibold text-[16px] py-3 px-8 text-white rounded-[50px] whitespace-nowrap">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </Container>
    );
};

export default Wishlist;
