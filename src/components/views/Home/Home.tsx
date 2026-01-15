import React from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import GridProducts from "./GridProducts";
import useHome from "./useHome";
import { useAppSelector } from "@/store/hooks/hooks";
import EmailSubscription from "./EmailSubscription";
import CTABanner from "./CTABanner";
import GridProductsSlider from "./GridProductSlider/GridProductSlider";
import PopularCategories from "./PopulerCategories";
import BannerPromotion from "./BannerPromotion";
import BestDeals from "./BestDeals";
import ArticleSection from "./ArticleSection";
import BestSeller from "./BestSeller";

// import FeatureHighlights from "./FeatureHighlights";
// import CTABanner from "./CTABanner";
// import HotSale from "./HotSale";
// import EmailSubscription from "./EmailSubscription";
// import { IBanner } from "@/types/Banner";

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

  const dataBannerPromotionSatu = [
    {
      id: 1,
      title: "Upgrade Your Gaming Setup",
      description: "High performance gear. Zero lag. Total domination.",
      buttonText: "Explore Gear",
      bgImage: "/images/banners/card-promotion-1.jpg",
      badge: {
        text: "NEW",
        color: "success" as const,
      },
    },
    {
      id: 2,
      title: "Pro Gaming Accessories",
      description: "Up to 30% OFF",
      buttonText: "Shop Now",
      bgImage: "/images/banners/card-promotion-2.jpg",
      badge: null,
    },
  ];

  const dataBannerPromotionDua = [
    {
      id: 1,
      title: "Upgrade Your Gaming Setup",
      description: "High performance gear. Zero lag. Total domination.",
      buttonText: "Explore Gear",
      bgImage: "/images/banners/card-promotion-1.jpg",
      badge: {
        text: "NEW",
        color: "success" as const,
      },
    },
    {
      id: 2,
      title: "Pro Gaming Accessories",
      description: "Up to 30% OFF",
      buttonText: "Shop Now",
      bgImage: "/images/banners/card-promotion-2.jpg",
      badge: null,
    },
    {
      id: 3,
      title: "Playstation 5",
      description: "High performance gear. Zero lag. Total domination.",
      buttonText: "Explore Gear",
      bgImage: "/images/banners/card-promotion-1.jpg",
      badge: {
        text: "NEW",
        color: "success" as const,
      },
    },
  ];

  return (
    <>
      <HomeSlider data={dummyBanners} isLoading={isLoadingHome} />

      <BannerPromotion data={dataBannerPromotionSatu} />

      <PopularCategories data={homeData?.categories} />

      <GridProductsSlider
        data={homeData?.new_arrivals}
        title="Latest products"
        isLoading={isLoading}
        emptyMessage="No featured products found !"
        isOvelayButton={true}
      />

      <BestDeals
        data={homeData?.featured_products}
        isLoading={isLoading}
        isOvelayButton={true}
        endDate={new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)}
      />

      <BannerPromotion data={dataBannerPromotionDua} />

      <BestSeller data={homeData?.best_sellers} />

      <CTABanner />

      <GridProducts
        cardCountSkeleton={8}
        cardCountEmptyCard={1}
        data={homeData?.featured_products}
        title="Featured products"
        isLoading={isLoading}
        emptyMessage="No featured products found !"
        isOvelayButton={true}
      />

      <ArticleSection title="From our blogs" />
      <EmailSubscription />

      {/* <FeatureHighlights /> */}
      {/* <HotSale /> */}
    </>
  );
};

export default Home;
