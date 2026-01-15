import React, { useRef } from "react";
import Container from "@/components/ui/Container";
import { Button, Card, CardBody, Image } from "@heroui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Category {
  id: number;
  name: string;
  url_slug: string;
  url_logo: string;
  meta_description: string;
  page_description: string;
  status: boolean;
}

interface PropTypes {
  data: Category[];
}

const PopularCategories = ({ data }: PropTypes) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const categoriesWithLogo =
    data?.filter(
      (item) => item.url_logo && item.url_logo.trim() !== "" && item.status
    ) || [];

  if (categoriesWithLogo.length === 0) {
    return null;
  }

  return (
    <Container>
      <div className="w-full py-10 md:py-16">
        {/* Title Section */}
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-12 text-primary">
          Check out the most popular categories
        </h1>

        {/* Grid Container - Desktop */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categoriesWithLogo.map((item) => (
            <Card
              shadow="none"
              radius="none"
              key={item.id}
              className="h-[320px] md:h-[360px] relative overflow-hidden group cursor-pointer transition-all duration-300 bg-secondary"
              onPress={() => console.log(`Clicked ${item.name}`)}
            >
              {/* Content */}
              <CardBody className="relative z-10 flex flex-col p-6 h-full">
                {/* Top Section - Title and Subtitle */}
                <div className="flex-1">
                  <h3 className="text-primary text-2xl md:text-3xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium mb-4">
                    {item.meta_description || "Explore this category"}
                  </p>

                  {/* Button */}
                  <Button
                    className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-xs"
                    radius="full"
                    size="md"
                  >
                    Explore
                  </Button>
                </div>

                {/* Bottom Section - Image/Icon - POSISI DI TENGAH BAWAH */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-44 h-44 md:w-48 md:h-48 lg:w-44 lg:h-44 xl:w-48 xl:h-48 flex items-center justify-center">
                  <Image
                    alt={item.name}
                    className="w-full h-full object-contain"
                    src={item.url_logo}
                  />
                </div>
              </CardBody>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Mobile Swiper Version with Navigation Buttons */}
        <div className="block lg:hidden relative">
          {/* Custom Navigation Buttons */}
          <Button
            isIconOnly
            radius="full"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-primary text-white shadow-lg hover:scale-110 transition-transform disabled:opacity-50 w-12 h-12"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            isIconOnly
            radius="full"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-primary text-white shadow-lg hover:scale-110 transition-transform disabled:opacity-50 w-12 h-12"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={24} />
          </Button>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination]}
            slidesPerView={1.2}
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="popularCategoriesSwiper"
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
          >
            {categoriesWithLogo.map((item) => (
              <SwiperSlide key={item.id}>
                <Card className="h-[320px] relative overflow-hidden group cursor-pointer bg-secondary">
                  <CardBody className="relative z-10 flex flex-col p-6 h-full">
                    <div className="flex-1">
                      <h3 className="text-primary text-2xl font-bold mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm font-medium mb-4">
                        {item.meta_description || "Explore this category"}
                      </p>
                      <Button
                        className="bg-white text-gray-800 text-sm font-semibold px-5 py-2 rounded-full shadow-xs"
                        radius="full"
                        size="sm"
                      >
                        Explore
                      </Button>
                    </div>

                    {/* Image diperbesar dan di tengah untuk mobile juga */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
                      <Image
                        alt={item.name}
                        className="w-full h-full object-contain"
                        src={item.url_logo}
                      />
                    </div>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default PopularCategories;
