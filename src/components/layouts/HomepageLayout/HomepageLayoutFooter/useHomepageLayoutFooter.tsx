import settingService from "@/services/setting.service";
import { useQuery } from "@tanstack/react-query";

const useHomepageLayoutFooter = () => {
    const {
        data: dataCompanyAddress,
        isLoading: isLoadingCompanyAddress,
        error: errorCompanyAddress,
        refetch: refetchCompanyAddress,
    } = useQuery({
        queryKey: ["data-company-address"],
        queryFn: async () => {
            const { data } = await settingService.getCompanyAddress();
            return data?.data;
        },
    });

    return {
        dataCompanyAddress,
        isLoadingCompanyAddress,
        errorCompanyAddress,
        refetchCompanyAddress,
    }
}

export default useHomepageLayoutFooter