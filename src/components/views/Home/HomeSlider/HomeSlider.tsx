import "swiper/css";
import "swiper/css/pagination";
import { IBanner } from "@/types/Banner";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PropTypes {
  data: IBanner[];
  isLoading: boolean;
}

const HomeSlider = (props: PropTypes) => {
  const { data, isLoading } = props;

  return (
    <div className="max-w-standard w-full mx-auto h-[319px] md:h-[638px] relative">
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : data?.length === 0 ? (
        <div className="h-full w-full bg-slate-400 flex items-center justify-center">
          <p className="text-gray-500 text-lg">No banners available</p>
        </div>
      ) : (
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {data?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id} className="relative">
              <Image
                src={`${banner.image}`}
                alt={`${banner.title}`}
                className="h-full w-full object-cover"
                width={1920}
                height={800}
                priority
              />
              {/* Overlay untuk konten teks */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                <div className="container mx-auto px-0 md:px-8">
                  <div className="max-w-2xl">
                    {/* Header - Size 60px sesuai gambar */}
                    <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-[60px] font-bold leading-tight sm:leading-tight md:leading-[70px] mb-3 md:mb-6">
                      Upgrade Your Gear,
                      <br />
                      Win Every Game.
                    </h1>
                    {/* Title di bawah header - Size 20px */}
                    <p className="text-white text-sm sm:text-base md:text-xl font-normal md:font-medium leading-relaxed md:leading-7 mb-6 md:mb-10 max-w-xl">
                      Discover premium gaming equipment built for speed,
                      precision, and comfort. From pro-grade keyboards to
                      immersive headsets, everything you need to play at your
                      best.
                    </p>
                    {/* Button Support */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
                      <button className="bg-white hover:bg-white/90 text-primary font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-3xl transition-colors duration-300 text-sm sm:text-base md:text-lg whitespace-nowrap">
                        Shop now
                      </button>
                      <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-3xl transition-colors duration-300 text-sm sm:text-base md:text-lg whitespace-nowrap">
                        View Products
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HomeSlider;
