/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import Container from "@/components/ui/Container";
import CardProduct from "@/components/ui/CardProduct";
import CardProductSkeleton from "@/components/ui/CardProduct/CardProductSkeleton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EmptyStateCard from "@/components/commons/EmptyStateCard/EmptyStateCard";

interface PropTypes {
  data?: any[];
  title?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  isLoading?: boolean;
  isOvelayButton?: boolean;
}

const GridProductsSlider = ({
  data,
  title,
  emptyMessage,
  emptyDescription,
  isLoading = false,
  isOvelayButton = false,
}: PropTypes) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isEmpty = !data || data.length === 0;

  return (
    <Container className="relative">
      <div className="w-full py-12">
        {title && (
          <h1 className="text-center font-bold pb-8 text-[40px] text-primary">
            {title}
          </h1>
        )}

        {isLoading ? (
          <CardProductSkeleton count={6} />
        ) : isEmpty ? (
          <EmptyStateCard
            className="border border-[#E4E4E4] hover:shadow-md transition-shadow"
            message={emptyMessage}
            description={emptyDescription}
          />
        ) : (
          <div className="relative">
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

            {/* Swiper Slider */}
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination]}
              //   spaceBetween={0}
              //   slidesPerView={2}
              //   loop={data.length > 6}
              //   autoplay={{
              //     delay: 3000,
              //     disableOnInteraction: false,
              //   }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                1536: {
                  slidesPerView: 6,
                  spaceBetween: 0,
                },
              }}
              className="product-slider"
            >
              {data?.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <CardProduct
                    id={item.id}
                    slug={item.slug}
                    title={item.name}
                    img={item.images?.[0]?.url}
                    price={item.recommended_retail_price}
                    rating={5}
                    onSale={item.new_arrival}
                    isOvelayButton={isOvelayButton}
                    data={item}
                    discount={10}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </Container>
  );
};

export default GridProductsSlider;
