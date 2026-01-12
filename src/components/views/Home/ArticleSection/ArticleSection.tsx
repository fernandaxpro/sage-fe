import Container from "@/components/ui/Container";
import { Button } from "@heroui/react";

const articles = [
  {
    id: 1,
    title: "Smarter Security Starts Here.",
    description: `Reliable tech. Simple control. Total peace of mind.`,
    buttonText: "Read More",
    bgImage: "/images/banners/banner-cctv.jpg",
  },
  {
    id: 2,
    title: "Protect What Matters Most.",
    description:
      "Keep your home secure with smart CCTV and alarm solutions built for modern safety.",
    buttonText: "Read More",
    bgImage: "/images/banners/banner-smart.jpg",
  },
];

interface PropTypes {
  title?: string;
}

const ArticleSection = (props: PropTypes) => {
  const { title } = props;

  return (
    <Container>
      <div className="w-full">
        {title && (
          <h1 className="text-center font-bold pb-8 text-[40px] text-primary">
            {title}
          </h1>
        )}

        <div className="md:gap-6 gap-4 grid grid-cols-1 sm:grid-cols-2 w-full">
          {articles.map((article) => (
            <div
              key={article.id}
              className="relative overflow-hidden rounded-2xl h-[280px] md:h-[320px] group cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: `url(${article.bgImage})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between p-6 md:p-8 lg:p-10 h-full">
                <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md">
                    {article.description}
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold px-8 py-2 rounded-full transition-all duration-300"
                    radius="full"
                    size="md"
                  >
                    {article.buttonText}
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

export default ArticleSection;
