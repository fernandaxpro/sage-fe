import Container from "@/components/ui/Container";
import { Button, Chip } from "@heroui/react";

interface PropTypes {
  title?: string;
  data?: any;
}

const BannerPromotion = (props: PropTypes) => {
  const { title, data } = props;

  // Tentukan grid columns berdasarkan jumlah data
  const getGridCols = () => {
    if (!data || data.length === 0) return "";
    if (data.length === 1) return "grid-cols-1";
    if (data.length === 2) return "grid-cols-1 sm:grid-cols-2";
    // 3 atau lebih
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <Container>
      <div className="w-full">
        {title && (
          <h1 className="text-center font-bold pb-8 text-[40px] text-primary">
            {title}
          </h1>
        )}
        <div className={`md:gap-6 gap-4 grid ${getGridCols()} w-full`}>
          {data?.map((item: any) => (
            <div
              key={item.id}
              className="relative overflow-hidden h-[280px] md:h-[320px] group cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between p-6 md:p-8 lg:p-10 h-full">
                <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                  {/* Badge */}
                  {item.badge && (
                    <div className="mb-2">
                      <Chip
                        color={item.badge.color}
                        variant="solid"
                        size="sm"
                        className="font-bold text-white uppercase"
                      >
                        {item.badge.text}
                      </Chip>
                    </div>
                  )}

                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    className="bg-white hover:bg-gray-100 text-primary text-sm font-semibold px-8 py-2 rounded-full transition-all duration-300"
                    radius="full"
                    size="md"
                  >
                    {item.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BannerPromotion;
