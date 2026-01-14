import CardProduct from "@/components/ui/CardProduct";
import Container from "@/components/ui/Container";
import { dummyProducts } from "@/data/products";

const BestSeller = () => {
  const bestSeller = dummyProducts.slice(0, 5).map(p => ({
    title: p.title,
    img: p.img,
    price: `$${p.price}`,
    rating: p.rating,
    onSale: p.onSale
  }));

  return (
    <Container>
      <div className="w-full">
        <h1 className="text-center font-bold pb-8 text-3xl text-primary">
          Best Seller Products
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {bestSeller.map((item, index) => (
            <CardProduct
              key={index}
              title={item.title}
              img={item.img}
              price={item.price}
              rating={item.rating}
              onSale={item.onSale}
              data={item}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BestSeller;
