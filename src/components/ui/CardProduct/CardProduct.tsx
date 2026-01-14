import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  useDisclosure,
} from "@heroui/react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { CiImageOff } from "react-icons/ci";
import { BadgePercent, Heart, Search } from "lucide-react";
import { useState } from "react";
import CardProductModal from "./CardProductModal";

interface PropTypes {
  id?: number | string;
  slug?: string;
  title: string;
  img: string;
  price: string;
  rating: number;
  onSale?: boolean;
  isOvelayButton?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const CardProduct = ({
  // id,
  slug,
  title,
  img,
  price,
  rating,
  onSale,
  isOvelayButton = false,
  data,
}: PropTypes) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        shadow="none"
        radius="none"
        className="flex flex-col justify-between p-4 bg-white border border-[#E4E4E4] hover:shadow-md transition-shadow h-full"
      >
        {onSale && (
          <CardHeader className="absolute top-2 left-2 p-0 flex z-10 bg-warning rounded-full w-auto">
            <p className="text-white font-semibold text-xs px-3 py-1.5 flex items-center gap-1.5">
              <BadgePercent width={16} height={16} />
              On Sale
            </p>
          </CardHeader>
        )}

        <Link
          href={slug ? `/product/list/detail/${slug}` : "#"}
          className="block"
        >
          <CardBody
            className="overflow-visible p-0 mb-4 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden">
              <Image
                alt={title}
                className="z-0 w-full h-full object-contain"
                radius="none"
                shadow="none"
                src={img}
              />

              {!img && (
                <CiImageOff className="absolute w-12 h-12 text-primary" />
              )}
            </div>

            {isOvelayButton && (
              <div
                className={`absolute top-2 right-2 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 z-10 ${isHovered ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpen();
                  }}
                  className="hover:scale-110 transition-transform"
                >
                  <Heart className="text-primary" size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpen();
                  }}
                  className="hover:scale-110 transition-transform"
                >
                  <Search className="text-primary" size={16} />
                </Button>
              </div>
            )}
          </CardBody>
        </Link>

        <CardFooter className="flex flex-col items-start p-0">
          <p className="text-primary text-sm font-medium cursor-pointer hover:text-success line-clamp-2 mb-4 min-h-[40px]">
            {title}
          </p>

          <p className="text-primary font-bold text-2xl">${price}</p>

          <div className="flex items-center justify-between w-full mt-1">
            <div className="flex items-center text-yellow-400 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  fill={i < Math.floor(rating) ? "#FFD700" : "#E5E7EB"}
                  className={
                    i < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
      <CardProductModal isOpen={isOpen} onClose={onOpenChange} data={data} />
    </>
  );
};

export default CardProduct;