// src/components/views/Home/useHome.tsx
import homeService from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hooks/hooks";
import { setHomeData, setHomeError, setHomeLoading } from "@/store/slices/homeSlice";
import { useEffect } from "react";

const useHome = () => {
  const dispatch = useAppDispatch();

  const getHomeData = async () => {
    const { data } = await homeService.getHomeData();
    return data;
  };

  const {
    data: homeData,
    isLoading: isLoadingHome,
    error,
    refetch
  } = useQuery({
    queryKey: ["home-data"],
    queryFn: getHomeData,
  });

  useEffect(() => {
    dispatch(setHomeLoading(isLoadingHome));
  }, [isLoadingHome, dispatch]);

  useEffect(() => {
    if (homeData) {
      dispatch(setHomeData(homeData));
    }
  }, [homeData, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setHomeError(error.message || "Failed to fetch home data"));
    }
  }, [error, dispatch]);

  return {
    homeData,
    isLoadingHome,
    error,
    refetch,
  };
};

export default useHome;