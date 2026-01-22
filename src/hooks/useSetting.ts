import settingService from "@/services/setting.service";
import { useQuery } from "@tanstack/react-query";

interface GlobalSetting {
  key: string;
  value: string;
}

const useSetting = () => {
  const {
    data: dataGlobalSetting = [],
    isLoading: isLoadingGlobalSetting,
    error: errorGlobalSetting,
    refetch: refetchGlobalSetting,
  } = useQuery<GlobalSetting[]>({
    queryKey: ["data-global-setting"],
    queryFn: async () => {
      const { data } = await settingService.getGlobalSetting();
      return data?.data ?? [];
    },
  });

  const settingsMap = dataGlobalSetting?.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.key] = item.value;
      return acc;
    },
    {},
  );

  
  return {
    dataGlobalSetting,
    isLoadingGlobalSetting,
    errorGlobalSetting,
    refetchGlobalSetting,

    settingsMap,
  };
};

export default useSetting;
