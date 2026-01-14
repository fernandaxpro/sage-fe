import React from "react";
import Container from "@/components/ui/Container";
import { 
  Button, 
  Card, 
  CardBody, 
  // CardHeader, 
  Image 
} from "@heroui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


// icon popular categories
const PopularCategories = () => {
  const popularCategories = [
    {
      id: 1,
      title: "Access Control",
      subtitle: "", // Subtitle/note seperti pada gambar
      image: "/images/icon/access-control.png",
      buttonText: "More",
    },
    {
      id: 2,
      title: "CCTV",
      subtitle: "",
      image: "/images/icon/cctv.png",
      buttonText: "More",
    },
    {
      id: 3,
      title: "Networking",
      subtitle: "",
      image: "/images/icon/wlan.png",
      buttonText: "More",
    },
    {
      id: 4,
      title: "Alarm",
      subtitle: "",
      image: "/images/icon/alarm.png", // Anda perlu menambahkan icon alarm
      buttonText: "More",
    },
    {
      id: 5,
      title: "Automation",
      subtitle: "",
      image: "/images/icon/automation.png",
      buttonText: "More",
    },
  ];

  return (
    <Container>
      <div className="w-full py-10 md:py-16">
        {/* Title Section */}
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-12">
          Check out the most popular categories
        </h1>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {popularCategories.map((item) => (
            <Card
              key={item.id}
              className="h-[280px] md:h-[320px] relative overflow-hidden group cursor-pointer transition-all duration-300 bg-[#EBF0F7]"
              // isPressable
              onPress={() => console.log(`Clicked ${item.title}`)}
            >
              {/* Content */}
              <CardBody className="relative z-10 flex flex-col p-6 h-full">
                {/* Top Section - Title and Subtitle */}
                <div className="flex-1">
                  <h3 className="text-primary text-2xl md:text-3xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium mb-4">
                    {item.subtitle}
                  </p>

                  {/* Button moved here */}
                  <Button
                    className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-xs"
                    radius="full"
                    size="md"
                  >
                    {item.buttonText}
                  </Button>
                </div>

                {/* Bottom Section - Image/Icon */}
                <div className={`absolute ${item.id !== 3 ? 'bottom-0 right-0 w-32 h-32 md:w-40 md:h-40' : 'bottom-0 right-[80px] w-40 h-40'} `}>
                  <Image
                    alt={item.title}
                    className="w-full h-full object-contain align-items"
                    src={item.image}
                  />
                </div>
              </CardBody>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Responsive Note untuk Mobile */}
        <div className="block hidden mt-8">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination]}
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
            {popularCategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Card className="h-[280px] relative overflow-hidden group cursor-pointer bg-[#EBF0F7]">
                  <CardBody className="relative z-10 flex flex-col p-6 h-full">
                    <div className="flex-1">
                      <h3 className="text-primary text-2xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-medium mb-4">
                        {item.subtitle}
                      </p>
                      <Button
                        className="bg-white text-gray-800 text-sm font-semibold px-5 py-2 rounded-full shadow-xs"
                        radius="full"
                        size="sm"
                      >
                        {item.buttonText}
                      </Button>
                    </div>

                    <div className="absolute bottom-0 right-0 w-28 h-28">
                      <Image
                        alt={item.title}
                        className="w-full h-full object-contain object-bottom-right"
                        src={item.image}
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
