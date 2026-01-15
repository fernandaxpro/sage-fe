/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import Container from "@/components/ui/Container";
import CardProduct from "@/components/ui/CardProduct";
import CardProductSkeleton from "@/components/ui/CardProduct/CardProductSkeleton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface PropTypes {
  data?: any[];
  emptyMessage?: string;
  emptyDescription?: string;
  isLoading?: boolean;
  isOvelayButton?: boolean;
  endDate?: Date | string; // Tanggal berakhir deals
}

const BestDeals = ({
  data,
  isLoading = false,
  isOvelayButton = false,
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 hari dari sekarang
}: PropTypes) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const TimerBox = ({ value, label }: { value: number; label?: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-warning text-white font-bold text-2xl md:text-3xl px-4 py-2 rounded-lg min-w-[60px] text-center">
        {String(value).padStart(2, "0")}
      </div>
      {label && (
        <span className="text-xs text-gray-500 mt-1 uppercase">{label}</span>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12">
      <Container className="relative">
        <div className="w-full">
          {/* Header with Title and Countdown */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <h1 className="font-bold text-3xl md:text-[40px] text-primary">
              Best Deals of week!
            </h1>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2">
              <TimerBox value={timeLeft.days} />
              <span className="text-2xl font-bold text-warning">:</span>
              <TimerBox value={timeLeft.hours} />
              <span className="text-2xl font-bold text-warning">:</span>
              <TimerBox value={timeLeft.minutes} />
              <span className="text-2xl font-bold text-warning">:</span>
              <TimerBox value={timeLeft.seconds} />
            </div>
          </div>

          {/* Products with Border */}
          <div className="border-4 border-success p-6 md:p-8">
            {isLoading ? (
              <CardProductSkeleton count={5} />
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
                  modules={[Navigation]}
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
                  }}
                  className="best-deals-slider"
                >
                  {data?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                      <CardProduct
                        id={item.id}
                        slug={item.slug}
                        title={item.name}
                        img={item.images?.[0]?.url}
                        price={item.recommended_retail_price}
                        originalPrice={item.original_price}
                        rating={5}
                        onSale={item.new_arrival}
                        discount={item.discount}
                        isOvelayButton={isOvelayButton}
                        data={item}
                        showStock={true}
                        stock={item.stock || 24}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BestDeals;
