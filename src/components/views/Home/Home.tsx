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
    // error,
  } = useAppSelector((state) => state.home);

  return (
    <>
      <HomeSlider data={homeData?.banners} isLoading={isLoadingHome} />

      <GridProducts
        cardCount={1}
        data={homeData?.new_arrivals}
        title="Latest Products"
        isLoading={isLoading}
        cardCountSkeleton={6}
        useCardLayout={true}
      />

      <GridProducts
        cardCount={3}
        title="Best Sellers"
        cardCountSkeleton={3}
        data={homeData?.best_sellers}
        isLoading={isLoading}
        useCardLayout={true}
      />

      <GridProducts
        cardCountSkeleton={8}
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
