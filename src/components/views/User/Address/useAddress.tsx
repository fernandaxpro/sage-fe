/* eslint-disable @typescript-eslint/no-explicit-any */
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useAddress = () => {
    const { data } = useSession();
    const user: any = data?.user || null;

    const getProfileById = async () => {
        const { data } = await userService.getProfileById(user?.id);
        return data?.data;
    };

    const {
        data: profileData,
        isLoading: isLoadingProfile,
        error,
        refetch: refetchProfile,
      } = useQuery({
        queryKey: ["address-data"],
        queryFn: getProfileById,
        enabled: !!user?.id,
      });


    return {
        profileData,
        isLoadingProfile,
        error,
        refetchProfile,
    }
}

export default useAddress