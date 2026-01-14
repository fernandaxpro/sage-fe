/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Image,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import {
  FaStar,
  FaGlobe,
  FaStore,
  FaTruck,
  FaHeart,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import useProductDetail from "./useProductDetail";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TabsProductDetail from "./TabsProductDetail";
import { ShoppingBag, Truck, Wallet } from "lucide-react";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

const relatedProduct = {
  id: 2,
  title: "SH-SHELLYBUTW SHELLY BUTTON 1 - White",
  img: "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
  price: 47.75,
  rating: 4,
};

const ProductDetail = ({ id }: { id: string }) => {
  const { status } = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  // const [quantity, setQuantity] = useState(1);
  // const [selectedTab, setSelectedTab] = useState("description");
  // const handleQuantityChange = (delta: number) => {
  //   setQuantity(Math.max(1, quantity + delta));
  // };

  const { 
    productData, 
    isLoadingProduct, 
  } =
    useProductDetail();

  if (isLoadingProduct || !productData) {
    return <ProductDetailSkeleton />;
  }

  return (
    <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs className="text-xs sm:text-sm text-gray-500">
        <BreadcrumbItem onClick={() => router.push('/')} className="text-gray-400 cursor-pointer hover:text-primary">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem onClick={() => router.push('/product/list')} className="text-gray-400 cursor-pointer hover:text-primary">
          Product
        </BreadcrumbItem>
        <BreadcrumbItem className="text-gray-400 cursor-pointer hover:text-primary">
          Detail
        </BreadcrumbItem>
      </Breadcrumbs>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Product Images */}
        <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0">
          <div className="bg-[#EBF0F7] rounded-lg p-6 mb-4 flex items-center justify-center h-[250px] sm:h-[300px]">
            <Image
              alt={
                productData?.images?.[selectedImage]?.alt_image ||
                productData?.name
              }
              src={productData?.images?.[selectedImage]?.url}
              className="object-contain max-h-[200px] sm:max-h-[250px]"
              radius="none"
            />
          </div>
          <div className="flex gap-2">
            {productData?.images?.map((img: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-[#E4E4E4]"
                }`}
              >
                <Image
                  alt={img.alt_image}
                  src={img.url}
                  className="object-contain w-full h-full"
                  radius="none"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-2">
            {productData?.name}
          </h1>
          <p className="text-primary text-sm mb-4">
            {productData?.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  fill={i < productData?.rating ? "#FFD700" : "#E5E7EB"}
                  className={
                    i < productData?.rating
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            {/* <span className="text-sm text-gray-500">
              ({productData?.reviewCount ?? 0} reviews)
            </span> */}
          </div>

          {/* Best Features */}
          {/* <div className="mb-4">
            <h3 className="font-semibold text-primary text-sm mb-2">
              Best Features
            </h3>
            <ul className="space-y-1">
              {dummy.bestFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div> */}

          {/* Price */}
          <p className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            ${productData?.recommended_retail_price}
          </p>

          <p className="text-primary text-sm mb-4 font-bold">
            SKU: <span className="font-normal">{productData?.sku}</span>
          </p>

          {/* Quantity & Add to Cart */}
          {/* <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Quantity</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-[#E4E4E4] rounded-full">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary"
                >
                  <FaMinus size={10} />
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary"
                >
                  <FaPlus size={10} />
                </button>
              </div>
              <Button
                color="primary"
                radius="full"
                className="px-6 font-semibold"
              >
                Add to Cart
              </Button>
            </div>
          </div> */}

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button
              onClick={() => {
                if (status === "unauthenticated") {
                  router.push("/auth/login");
                }
              }}
              className="flex items-center gap-2 hover:text-primary"
            >
              <FaHeart size={14} />
              Add to Wishlist
            </button>
            <button className="flex items-center gap-2 hover:text-primary">
              Add to Compare
            </button>
          </div>
        </div>

        {/* Stock Availability Sidebar */}
        <div className="lg:w-[200px] xl:w-[220px] flex-shrink-0">
          <div className="bg-secondary p-4 flex flex-col gap-4">
            {/* <h3 className="font-semibold text-primary text-sm mb-4">
              Stock Availability
            </h3>
            <div className="space-y-3">
              {dummy.stockAvailability.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{stock.location}</span>
                  <span
                    className={`flex items-center gap-1 ${
                      stock.available
                        ? "text-green-500"
                        : stock.status === "Sold Out"
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  >
                    {stock.available ? (
                      <FaCheck size={10} />
                    ) : stock.status === "Sold Out" ? (
                      <FaTimes size={10} />
                    ) : (
                      <FaClock size={10} />
                    )}
                    {stock.status}
                  </span>
                </div>
              ))}
            </div> */}
            <div className="flex flex-col">
              <span className="flex items-center">
                <Wallet className="h-6 text-primary font-semibold" />{" "}
                <p className="text-primary font-semibold text-sm ml-2">100%</p>
              </span>
              <p className="text-primary font-semibold text-sm">Money back</p>
            </div>

            <div className="flex flex-col">
              <span className="flex items-center">
                <ShoppingBag className="h-6 text-primary font-semibold" />{" "}
                <p className="text-primary font-semibold text-sm ml-2">
                  No-contact
                </p>
              </span>
              <p className="text-primary font-semibold text-sm">shipping</p>
            </div>

            <div className="flex flex-col">
              <span className="flex items-center">
                <Truck className="h-6 text-primary font-semibold" />{" "}
                <p className="text-primary font-semibold text-sm ml-2">
                  Free Delivery For
                </p>
              </span>
              <p className="text-primary font-semibold text-sm">
                Order Over $200
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
        {/* Main Content with Tabs */}
        <div className="flex-1">
          <TabsProductDetail data={productData} />
        </div>

        {/* Related Products Sidebar */}
        <div className="lg:w-[200px] xl:w-[220px] flex-shrink-0">
          <h3 className="font-semibold text-primary text-sm mb-4">
            Related Products
          </h3>
          <div className="border border-[#E4E4E4] rounded-lg p-4">
            <div className="flex items-center justify-center mb-3">
              <Image
                alt={relatedProduct.title}
                src={relatedProduct.img}
                className="object-contain h-[100px]"
                radius="none"
              />
            </div>
            <p className="text-xs text-gray-600 font-medium line-clamp-2 mb-2">
              {relatedProduct.title}
            </p>
            <p className="text-lg font-bold text-primary mb-2">
              ${relatedProduct.price.toFixed(2)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    size={10}
                    fill={i < relatedProduct.rating ? "#FFD700" : "#E5E7EB"}
                    className={
                      i < relatedProduct.rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <FaGlobe size={10} className="text-green-500 cursor-pointer" />
                <FaStore size={10} className="text-yellow-500 cursor-pointer" />
                <FaBagShopping
                  size={10}
                  className="text-red-500 cursor-pointer"
                />
                <FaTruck size={10} className="text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
