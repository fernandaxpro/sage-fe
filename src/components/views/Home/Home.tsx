import React from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import GridProducts from "./GridProducts";
import ArticleSection from "./ArticleSection";
import useHome from "./useHome";
import { useAppSelector } from "@/store/hooks/hooks";

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
    error,
  } = useAppSelector((state) => state.home);

  return (
    <>
      <HomeSlider data={homeData?.banners} isLoading={isLoadingHome} />

      <GridProducts
        data={homeData?.new_arrivals}
        title="Latest Products"
        emptyMessage="No latest products found !"
        isLoading={isLoading}
      />

      {/* Best Sellers */}
      <GridProducts
        data={homeData?.best_sellers}
        isLoading={isLoading}
        useCardLayout={true}
        cardCount={3}
      />

      <GridProducts
        data={homeData?.featured_products}
        title="Featured Products"
        isLoading={isLoading}
        emptyMessage="No featured products found !"
        isOvelayButton={true}
      />

      <ArticleSection title="From Our Blog" />

      {/* <FeatureHighlights /> */}
      {/* <CTABanner /> */}
      {/* <PopularCategories /> */}
      {/* <HotSale /> */}
      {/* <BestSeller /> */}
      {/* <EmailSubscription /> */}
    </>
  );
};

export default Home;
