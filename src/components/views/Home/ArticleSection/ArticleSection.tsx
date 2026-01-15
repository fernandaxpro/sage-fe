import Container from "@/components/ui/Container";
import { Card, CardBody, CardFooter, Chip, Image } from "@heroui/react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

const articles: Article[] = [
  {
    id: 1,
    title:
      "Top Gaming Headsets Tested — Performance, Comfort, and Sound Accuracy",
    category: "GAMING GEAR",
    date: "Jun 13, 2021",
    author: "Alfredo Austin",
    image: "/images/blog/blog-1.jpg",
    slug: "top-gaming-headsets-tested",
  },
  {
    id: 2,
    title:
      "Exclusive Deal for Gamers: Special Rewards for Our Longtime Players",
    category: "GAMING DEALS",
    date: "Jun 13, 2021",
    author: "Alfredo Austin",
    image: "/images/blog/blog-2.jpg",
    slug: "exclusive-gamer-deals",
  },
  {
    id: 3,
    title:
      "[PDF REPORT] — How Gaming Impacts Focus, Reaction Time, and Social Skills",
    category: "GAMING INSIGHTS",
    date: "Jun 13, 2021",
    author: "Alfredo Austin",
    image: "/images/blog/blog-3.jpg",
    slug: "gaming-impact-focus-reaction-social",
  },
];

interface PropTypes {
  title?: string;
  data?: Article[];
}

const ArticleSection = (props: PropTypes) => {
  const { title, data = articles } = props;

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
      <div className="w-full py-12">
        {title && (
          <h1 className="text-center font-bold pb-8 text-[40px] text-primary">
            {title}
          </h1>
        )}
        <div className={`gap-6 grid ${getGridCols()} w-full`}>
          {data?.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="block"
            >
              <Card
                shadow="none"
                className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Image Section */}
                <CardBody className="p-0 relative overflow-hidden">
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Chip
                      className="bg-primary text-white font-bold text-xs px-3 py-1"
                      size="sm"
                    >
                      {article.category}
                    </Chip>
                  </div>

                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={article.image}
                      radius="none"
                    />
                  </div>
                </CardBody>

                {/* Content Section */}
                <CardFooter className="flex flex-col items-start p-6 gap-3">
                  <h3 className="text-primary text-lg font-bold leading-tight line-clamp-2 group-hover:text-success transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ArticleSection;
