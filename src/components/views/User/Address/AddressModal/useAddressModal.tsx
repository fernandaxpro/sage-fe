/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userService from '@/services/user.service'
import { IAddressPayload, IBillingAddress, IShippingAddress } from '@/types/Profile'
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";

interface PropTypes {
  type: "shipping" | "billing";
  refetchProfile: () => void;
  initialData: any;
}

const addressSchema = yup.object().shape({
  person: yup.string().required("Person is required"),
  company: yup.string().required("Company is required"),
  address: yup.string().required("Address is required"),
  address2: yup.string().required("Address 2 is required"),
  country_id: yup.mixed<string | number>().required("Country is required"),
  city_id: yup.mixed<string | number>().required("City is required"),
  state_id: yup.mixed<string | number>().required("State is required"),
  suburb: yup.mixed<string>().required("Suburb is required"),
  post_code: yup.mixed<string>().required("Post code is required"),
});

const useAddressModal = ({ 
  type, 
  refetchProfile, 
  // initialData 
}: PropTypes) => {
  const { data } = useSession();
  const user: any = data?.user || null;
  const { setToaster } = useContext(ToasterContext);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<IAddressPayload>({
    resolver: yupResolver(addressSchema),
    defaultValues: {},
  });

  const updateAddresById = async (addressData: IAddressPayload): Promise<any> => {
    const payload: IBillingAddress | IShippingAddress = type === "billing" 
      ? { billing_addresses: [addressData] }
      : { shipping_addresses: [addressData] };
    
    const { data } = await userService.updateProfileById(payload, user?.id);
    return data?.data;
  };

  const {
    mutateAsync: mutateUpdateAddress,
    isPending: isLoadingUpdateProfile,
  } = useMutation({
    mutationFn: updateAddresById,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Update address success",
      });
      refetchProfile();
      reset();
    },
    onError: () => {
      setToaster({
        type: "error",
        message: "Update address failed",
      });
    },
  });

  const handleUpdateAddress = (data: IAddressPayload) => mutateUpdateAddress(data);

  return {
    control,
    handleSubmit,
    errors,
    handleUpdateAddress,
    isLoadingUpdateProfile,
    setValue,
    getValues,
    watch,
    reset,
  };
};

export default useAddressModal;