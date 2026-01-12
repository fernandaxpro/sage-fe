import Container from "@/components/ui/Container";
import { Button, Card, CardFooter, CardHeader, Image } from "@heroui/react";
import React from "react";

const HotSale = () => {
  const saleCards = [
    {
      id: 1,
      title: "Hot Sale CCTV",
      discount: "Up to 40% Off",
      buttonText: "Shop Now",
      image: "/images/banners/hotsale-1.jpg",
      footerTitle: "CCTV Pro",
      footerDesc: "Best security for your home.",
    },
    {
      id: 2,
      title: "Exclusive Smart Lock",
      discount: "Save 30% Today",
      buttonText: "Shop Now",
      image: "/images/banners/product-2.jpg",
      footerTitle: "Smart Lock",
      footerDesc: "Safety with one touch.",
    },
    {
      id: 3,
      title: "Premium Alarm System",
      discount: "Up to 25% Off",
      buttonText: "Shop Now",
      image: "/images/banners/hotsale-3.jpg",
      footerTitle: "Alarm System",
      footerDesc: "Stay secure 24/7.",
    },
  ];

  return (
    <Container
  className="
    grid 
    grid-cols-[repeat(auto-fit,minmax(280px,1fr))] 
    gap-5
  "
>
  {saleCards.map((item) => (
    <Card
      key={item.id}
      isFooterBlurred
      className="w-full h-[300px]"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-[30px] font-semibold text-primary">
          {item.title}
        </p>
        <h4 className="text-primary font-medium text-xl">
          {item.discount}
        </h4>
      </CardHeader>

      <Image
        removeWrapper
        alt={item.title}
        className="z-0 w-full h-full object-cover"
        src={item.image}
      />

      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex grow gap-2 items-center">
          <Image
            alt={item.footerTitle}
            className="rounded-full w-10 h-11 bg-black"
            src="https://heroui.com/images/breathing-app-icon.jpeg"
          />
          <div className="flex flex-col">
            <p className="text-white">{item.footerTitle}</p>
            <p className="text-tiny text-white">{item.footerDesc}</p>
          </div>
        </div>
        <Button
          radius="full"
          className="bg-secondary text-white text-[20px] font-bold "
        >
          {item.buttonText}
        </Button>
      </CardFooter>
    </Card>
  ))}
</Container>

  );
};

export default HotSale;
