"use client";

import { useState } from "react";
import {
  Button,
  Image,
  Tabs,
  Tab,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import {
  FaStar,
  FaGlobe,
  FaStore,
  FaTruck,
  FaHeart,
  FaCheck,
  FaClock,
  FaTimes,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import useProductDetail from "./useProductDetail";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Dummy product data
const dummy = {
  id: 1,
  title: "Shelly BUTTON 1 - Black SH-SHELLYBUTB",
  subtitle:
    "Smart button for instant, easy, and seamless home automation control across devices",
  images: [
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
  ],
  price: 45.27,
  rating: 5,
  reviewCount: 20,
  bestFeatures: [
    "Super-Fast & Smart Performance",
    "Rechargeable & Long-Lasting Power",
    "Universal Compatibility & Easy Integration",
  ],
  stockAvailability: [
    { location: "Online", status: "In Stock", available: true },
    { location: "NSW", status: "3 days", available: false },
    { location: "SA", status: "In Stock", available: true },
    { location: "Apple Bridge", status: "Sold Out", available: false },
  ],
  description: `Shelly BUTTON 1 – Black (SH-SHELLYBUTB) is a versatile smart button that lets you control your smart devices in home automation system instantly with just one touch. Compact in size – 47mmx47x12mm, making it perfect for any spaces.

Features:
• No hub required.
• Long-lasting battery providing for more than 1,000 actions per charge.
• Supports a mix of four, two and one button, and DI-mode – 500 power.
• A distinctive color ensures distinction for all structures.
• Can be mounted to walls or any other flat surfaces.
• Compatible with Android, iOS, Amazon Alexa, Google Assistant, and home automation servers using REST, CoAP, MQTT, or REST API.
• Easily make your home productive and enable digital actions for projects.`,
  specifications: {
    power: [
      { label: "Battery Life", value: "1000 actions per charge" },
      { label: "Power supply, AC", value: "No" },
      { label: "Power supply, DC", value: "Micro USB – 5V" },
    ],
    specialFunctions: [
      {
        label: "Compliance control",
        value:
          "Activate or deactivate a remote automation modes. Shelly devices",
      },
      { label: "Overload protection", value: "Yes" },
      { label: "Power measurement", value: "Yes" },
      { label: "Dimming", value: "Yes" },
    ],
    features: [
      { label: "Operating temperature", value: "-10°C to 40°C" },
      { label: "Local and remote control", value: "Yes" },
      { label: "Button/Switch", value: "Yes" },
      { label: "Weekly Schedule", value: "Yes" },
      { label: "UL Description", value: "Yes" },
    ],
    connectivity: [
      { label: "Wireless/WiFi Protocol", value: "802.11 b/g/n" },
      { label: "Radio frequency", value: "2400 – 2484 MHz" },
      { label: "Radio signal power", value: "1mW" },
      {
        label: "Range",
        value:
          "up to 50 m outdoors and up to 30 m indoors (depending on the building materials)",
      },
    ],
  },
  reviews: [
    {
      id: 1,
      name: "Daniel R.",
      date: "May 20, 2025",
      rating: 5,
      comment:
        "Works perfectly with my Shelly setup. The response time is super fast, and the single press-back for a very longer than expected. 10/10, worth it!",
      avatar: "/images/avatar-1.png",
    },
    {
      id: 2,
      name: "Kevin T.",
      date: "May 20, 2025",
      rating: 5,
      comment:
        "I love how small this = this thing of looks good on my desk. Impressive build time and smart control buttons!",
      avatar: "/images/avatar-2.png",
    },
    {
      id: 3,
      name: "Maria L.",
      date: "May 20, 2025",
      rating: 4,
      comment:
        "I use these and like – the signal is not always right in my living room but in a range – works great. Will reorder!",
      avatar: "/images/avatar-3.png",
    },
    {
      id: 4,
      name: "Sophie A.",
      date: "May 30, 2025",
      rating: 5,
      comment:
        "A really fast, my parents for the response time to be a bit slower but they really trust SH Button - its nice customization",
      avatar: "/images/avatar-4.png",
    },
  ],
};

// Related product
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
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const { productData, isLoadingProduct, error, refetchProduct } =
    useProductDetail();

  return (
    <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs className="text-xs sm:text-sm text-gray-500">
        <BreadcrumbItem className="text-gray-400 cursor-pointer hover:text-primary">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem className="text-gray-400 cursor-pointer hover:text-primary">
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
          <p className="text-gray-500 text-sm mb-4">
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
            <span className="text-sm text-gray-500">
              ({productData?.reviewCount ?? 0} reviews)
            </span>
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

          {/* Quantity & Add to Cart */}
          <div className="mb-4">
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
          </div>

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
          <div className="border border-[#E4E4E4] rounded-lg p-4">
            <h3 className="font-semibold text-primary text-sm mb-4">
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
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
        {/* Main Content with Tabs */}
        <div className="flex-1">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-[#E4E4E4]",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary font-medium",
            }}
          >
            <Tab key="description" title="Description">
              <div className="py-4">
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {productData?.description}
                </div>
              </div>
            </Tab>
            <Tab key="addition-information" title="Addition Information">
              <div className="py-4">
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {productData?.description}
                </div>
              </div>
            </Tab>
            <Tab key="specification" title="Specification">
              <div className="py-4 space-y-6">
                {/* Power Section */}
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-3 uppercase">
                    Power
                  </h4>
                  <div className="space-y-2">
                    {dummy.specifications.power.map((spec, index) => (
                      <div
                        key={index}
                        className="flex border-b border-gray-100 py-2"
                      >
                        <span className="text-sm text-gray-500 w-1/3">
                          {spec.label}
                        </span>
                        <span className="text-sm text-gray-700 flex-1">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Functions */}
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-3 uppercase">
                    Special Functions
                  </h4>
                  <div className="space-y-2">
                    {dummy.specifications.specialFunctions.map(
                      (spec, index) => (
                        <div
                          key={index}
                          className="flex border-b border-gray-100 py-2"
                        >
                          <span className="text-sm text-gray-500 w-1/3">
                            {spec.label}
                          </span>
                          <span className="text-sm text-gray-700 flex-1">
                            {spec.value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-3 uppercase">
                    Features
                  </h4>
                  <div className="space-y-2">
                    {dummy.specifications.features.map((spec, index) => (
                      <div
                        key={index}
                        className="flex border-b border-gray-100 py-2"
                      >
                        <span className="text-sm text-gray-500 w-1/3">
                          {spec.label}
                        </span>
                        <span className="text-sm text-gray-700 flex-1">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connectivity */}
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-3 uppercase">
                    Connectivity
                  </h4>
                  <div className="space-y-2">
                    {dummy.specifications.connectivity.map((spec, index) => (
                      <div
                        key={index}
                        className="flex border-b border-gray-100 py-2"
                      >
                        <span className="text-sm text-gray-500 w-1/3">
                          {spec.label}
                        </span>
                        <span className="text-sm text-gray-700 flex-1">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key="reviews" title="Reviews">
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dummy.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-[#E4E4E4] rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold overflow-hidden">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm text-primary">
                                {review.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                  key={i}
                                  size={10}
                                  fill={
                                    i < review.rating ? "#FFD700" : "#E5E7EB"
                                  }
                                  className={
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-200"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab>
          </Tabs>
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
