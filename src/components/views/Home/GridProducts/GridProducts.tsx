/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/ui/Container";
import CardProduct from "@/components/ui/CardProduct";
import EmptyStateCard from "@/components/commons/EmptyStateCard/EmptyStateCard";
import CardProductSkeleton from "@/components/ui/CardProduct/CardProductSkeleton";
// import { dummyProducts } from "@/data/products";

interface PropTypes {
  data: any;
  title?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  isLoading?: boolean;
  cardCountEmptyCard?: number;
  cardCountSkeleton?: number;
  cardClassName?: string;
  isOvelayButton?: boolean;
  isEmptyCardFullWidth?: boolean;
}

const GridProducts = ({
  data,
  title,
  emptyMessage,
  emptyDescription,
  isLoading,
  cardCountEmptyCard = 3,
  cardCountSkeleton,
  cardClassName,
  isOvelayButton,
  isEmptyCardFullWidth = true,
}: PropTypes) => {
  const isEmpty = !data || data.length === 0;

  return (
    <Container>
      <div className="w-full">
        {title && (
          <h1 className="text-center font-bold pb-8 text-[40px] text-primary">
            {title}
          </h1>
        )}

        {isLoading ? (
          <CardProductSkeleton count={cardCountSkeleton} />
        ) : isEmpty ? (
          <EmptyStateCard
            count={cardCountEmptyCard}
            message={emptyMessage}
            description={emptyDescription}
            cardClassName="border border-[#E4E4E4] hover:shadow-md transition-shadow"
            isEmptyCardFullWidth={isEmptyCardFullWidth}
          />
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 ${cardClassName}`}
          >
            {data?.map((item: any) => (
              <CardProduct
                key={item.id}
                id={item.id}
                slug={item.slug}
                title={item.name}
                img={item.images?.[0]?.url}
                price={item.recommended_retail_price}
                rating={5}
                onSale={item.new_arrival}
                isOvelayButton={isOvelayButton}
                data={item}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default GridProducts;
