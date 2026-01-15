/* eslint-disable @typescript-eslint/no-explicit-any */
import CardProduct from "@/components/ui/CardProduct";
import Container from "@/components/ui/Container";

interface PropTypes {
  data?: any;
  isOvelayButton?: boolean;
}

const BestSeller = ({ data, isOvelayButton }: PropTypes) => {

  return (
    <Container>
      <div className="w-full">
        <h1 className="text-center font-bold pb-8 text-3xl text-primary">
          Best Seller Products
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {data?.map((item: any, index: number) => (
            <CardProduct
              key={index}
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
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BestSeller;
