import React from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import GridProducts from "./GridProducts";
import ArticleSection from "./ArticleSection";
import useHome from "./useHome";
import { useAppSelector } from "@/store/hooks/hooks";
import EmailSubscription from "./EmailSubscription";
import CTABanner from "./CTABanner";
import GridProductsSlider from "./GridProductSlider/GridProductSlider";

// import FeatureHighlights from "./FeatureHighlights";
// import PopularCategories from "./PopulerCategories";
// import CTABanner from "./CTABanner";
// import HotSale from "./HotSale";
// import { IBanner } from "@/types/Banner";
// import BestSeller from "./BestSeller";
// import EmailSubscription from "./EmailSubscription";

const Home = () => {
  const { isLoadingHome } = useHome();
  const {
    data: homeData,
    isLoading,
    // error,
  } = useAppSelector((state) => state.home);

  const dummyBanners = [
    {
      _id: "1",
      title: "Banner",
      image: "/images/banners/banner.jpg",
    },
    {
      _id: "2",
      title: "Banner",
      image: "/images/banners/banner-sage.jpg",
    },
    {
      _id: "3",
      title: "Banner",
      image: "/images/banners/banner-sage-2.jpg",
    },
  ];

  return (
    <>
      <HomeSlider data={dummyBanners} isLoading={isLoadingHome} />

      <GridProducts
        cardCountEmptyCard={1}
        data={homeData?.new_arrivals}
        title="Latest Products"
        isLoading={isLoading}
        cardCountSkeleton={6}
        isEmptyCardFullWidth={false}
      />

      <GridProductsSlider
        data={homeData?.featured_products}
        title="Bestseller Products"
        isLoading={isLoading}
        emptyMessage="No featured products found !"
        isOvelayButton={true}
      />

      <CTABanner />

      <GridProducts
        cardCountSkeleton={8}
        data={homeData?.featured_products}
        title="Featured Products"
        isLoading={isLoading}
        emptyMessage="No featured products found !"
        isOvelayButton={true}
      />

      <ArticleSection title="From Our Blog" />

      <EmailSubscription />

      {/* <FeatureHighlights /> */}
      {/* <PopularCategories /> */}
      {/* <HotSale /> */}
      {/* <BestSeller /> */}
    </>
  );
};

export default Home;
