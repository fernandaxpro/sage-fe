import homeService from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const {
    data: homeData,
    isLoading: isLoadingHome,
    error: errorHome,
    refetch: refetchHome,
  } = useQuery({
    queryKey: ["home-data"],
    queryFn: async () => {
      const { data } = await homeService.getHomeData();
      return data;
    },
  });

  return {
    homeData,
    isLoadingHome,
    errorHome,
    refetchHome
  };
};

export default useHome;
