/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { Image, Breadcrumbs, BreadcrumbItem, Button, Chip, Divider } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaMinus, FaPlus, FaXTwitter } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import useProductDetail from "./useProductDetail";
import { useRouter } from "next/router";
import TabsProductDetail from "./TabsProductDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Package,
  Truck,
} from "lucide-react";
import { useSession } from "next-auth/react";

const ProductDetail = ({
  // id 
}: { id: string }) => {
  const { status } = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const { productData, isLoadingProduct } = useProductDetail();

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const colors = [
    { name: "Navy", value: "#1E3A8A" },
    { name: "Gray", value: "#6B7280" },
    { name: "Orange", value: "#F97316" },
  ];

  const sizes = ["S", "M", "L"];

  if (isLoadingProduct || !productData) {
    return <ProductDetailSkeleton />;
  }

  const rating = 1

  return (
    <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs className="text-xs sm:text-sm text-primary">
        <BreadcrumbItem
          onClick={() => router.push("/")}
          className="text-gray-400 cursor-pointer hover:text-primary"
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => router.push("/product/list")}
          className="text-gray-400 cursor-pointer hover:text-primary"
        >
          Product
        </BreadcrumbItem>
        <BreadcrumbItem className="text-gray-400 cursor-pointer hover:text-primary">
          {productData?.name}
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col gap-6">
        {/* Product Information Container */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Product Image Slider */}
          <div className="flex-1 lg:w-[400px] xl:w-[450px] flex-shrink-0">
            {/* Main Image */}
            <div className="mb-4 relative group">
              <Swiper
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
                className="w-full"
              >
                {productData?.images?.map((img: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="flex items-center justify-center rounded-lg">
                      <Image
                        alt={img.alt_image || productData?.name}
                        src={img.url}
                        className="object-contain w-full h-[300px] sm:h-[350px] lg:h-[400px]"
                        radius="none"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              {productData?.images?.length > 1 && (
                <>
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/90"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/90"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productData?.images?.map((img: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    swiperRef.current?.slideTo(index);
                  }}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index && "border-primary"
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

          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {/* Product Information Detail */}
            <div className="flex-1 flex flex-col gap-6 lg:px-10">
              {/* Header Section */}
              <div className="flex flex-col gap-2">
                {/* <p className="text- text-sm">Medicstore</p> */}
                <h1 className="text-primary text-3xl font-bold">
                  {productData?.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={18}
                        className={
                          i < Math.floor(rating)
                            ? "text-rating-filled fill-current"
                            : "text-rating-empty fill-current"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[#1E3A8A] text-lg font-semibold">(1 review)</span>
                </div>
              </div>

              <Divider className="bg-gray-200" />

              {/* Features List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <FaCheck className="text- mt-1" />
                  <p className="text-primary text-base font-bold">
                    Study history up to 30 days
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheck className="text- mt-1" />
                  <p className="text-primary text-base font-bold">
                    Up to 5 users simultaneously
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheck className="text- mt-1" />
                  <p className="text-primary text-base font-bold">
                    Has HEALTH certificate
                  </p>
                </div>
              </div>

              <Divider className="bg-gray-200" />

              {/* Benefits Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="text-primary mt-0.5 flex-shrink-0" size={20} />
                  <div className="flex flex-col">
                    <p className="text-primary text-base font-bold">100% Money back</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="text-primary mt-0.5 flex-shrink-0" size={20} />
                  <div className="flex flex-col">
                    <p className="text-primary text-base font-bold">Non-contact shipping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="text-primary mt-0.5 flex-shrink-0" size={20} />
                  <div className="flex flex-col">
                    <p className="text-primary text-base font-bold">
                      Free delivery for order over $200
                    </p>
                  </div>
                </div>
              </div>

              <Divider className="bg-gray-200" />

              {/* Tags and SKU */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-base font-bold">Tags:</span>
                  <span className="text-muted text-base font-bold">Thermometer, Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary text-base font-bold">SKU:</span>
                  <span className="text-muted text-base font-bold">AU110876</span>
                </div>
              </div>

              <Divider className="bg-gray-200" />

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <button
                  className="w-10 h-10 flex items-center justify-center bg-[#1877F2] text-white rounded hover:opacity-90 transition-opacity"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF size={18} />
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-black text-white rounded hover:opacity-90 transition-opacity"
                  aria-label="Share on X"
                >
                  <FaXTwitter size={18} />
                </button>

                <button
                  className="w-10 h-10 flex items-center justify-center bg-[#E4405F] text-white rounded hover:opacity-90 transition-opacity"
                  aria-label="Share on Instagram"
                >
                  <FaInstagram size={18} />
                </button>
              </div>
            </div>

            {/* Product Action */}
            <div className="flex-1 flex flex-col gap-6 px-8 py-6 bg-secondary md:max-w-[320px]">
              {/* Stock Status */}
              <div className="inline-flex">
                <Chip
                  color="success"
                  variant="solid"
                  className="uppercase text-white bg-danger font-bold text-xs px-4 py-1 rounded-full"
                >
                  Only 3 left In Stock
                </Chip>
              </div>

              {/* Price */}
              <h1 className="text-4xl font-bold text-primary">
                $77.65
              </h1>

              {/* Color Selection */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-primary">
                  Color:
                </p>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === index
                        ? "border-white scale-110"
                        : "border-bordered"
                        }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-primary">
                  Sizes:
                </p>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 rounded-full border-2 font-semibold text-sm transition-all ${selectedSize === size
                        ? "border-primary bg-secondary text-primary"
                        : "border-bordered bg-transparent text- hover:border-primary"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-primary">
                  Quantity
                </p>
                <div className="flex items-center justify-between bg-white rounded-full px-4 py-2 border border-bordered">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="text-lg font-semibold text-primary min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                color="warning"
                className="w-full bg-[#F97316] text-white font-bold py-6 text-base rounded-full hover:bg-[#EA580C] transition-colors"
              >
                Add to cart
              </Button>

              {/* Wishlist and Compare Links */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <button
                  className="font-bold hover:underline transition-all text-primary"
                  onClick={() => {
                    if(status === 'unauthenticated') return router.push('/auth/login')
                  }}
                >
                  Add to wishlist
                </button>
                <button
                  className="font-bold hover:underline transition-all text-primary"
                  onClick={() => {
                    if(status === 'unauthenticated') return router.push('/auth/login')
                  }}
                >
                  Add to compare
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tab Container */}
        <div className="flex flex-col gap-2">
          <TabsProductDetail data={productData} />
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;