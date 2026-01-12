import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const CardProductModal = (props: PropTypes) => {
  const { isOpen, onClose, data } = props;

  return (
    <Modal isOpen={isOpen} size="5xl" onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <ModalBody className="p-6">
            <div className="flex gap-6">
              <div className="w-[40%] flex-shrink-0">
                {!data?.images || data?.images?.length === 0 ? (
                  <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                    <CiImageOff className="w-16 h-16 text-gray-400" />
                  </div>
                ) : (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="w-full h-[400px]"
                  >
                    {data?.images?.map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                          <Image
                            src={item.url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-contain cursor-pointer"
                            onClick={() =>
                              console.log("Image clicked:", item.url)
                            }
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-primary">{data.name}</h1>

                <div className="flex items-center text-yellow-400 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      fill={i < Math.floor(data.rating) ? "#FFD700" : "#E5E7EB"}
                      className={
                        i < Math.floor(data.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                <h1 className="text-2xl font-bold text-primary">
                  ${data.recommended_retail_price}
                </h1>

                <Divider className="my-4" />

                <p className="text-base text-primary font-semibold">
                  SKU: <span className="font-normal">{data.sku}</span>
                </p>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CardProductModal;
