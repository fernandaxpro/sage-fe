/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import userService from '@/services/user.service'
import { IAddressPayload, IBillingAddress, IShippingAddress } from '@/types/Profile'
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useRef } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";

interface PropTypes {
  type: string;
  refetchProfile: () => void;
  initialData: any;
  onClose: () => void;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>
  setType: React.Dispatch<React.SetStateAction<string>>
}

const addressSchema: yup.ObjectSchema<IAddressPayload> = yup.object().shape({
  person: yup.string().required("Person is required"),
  company: yup.string().required("Company is required"),
  address: yup.string().required("Address is required"),
  address2: yup.string().optional(),
  country_id: yup.mixed<string | number>().required("Country is required"),
  city_id: yup.mixed<string | number>().required("City is required"),
  state_id: yup.mixed<string | number>().required("State is required"),
  suburb: yup.mixed<string>().required("Suburb is required"),
  post_code: yup.mixed<string>().required("Post code is required"),
});

const useAddressModal = ({
  type,
  refetchProfile,
  initialData,
  onClose,
  setMode,
  setType,
  mode
}: PropTypes) => {
  const { data } = useSession();
  const user: any = data?.user || null;
  const { setToaster } = useContext(ToasterContext);

  const prevCountryRef = useRef<string | number>("");
  const prevStateRef = useRef<string | number>("");

  const defaultValues = {
    person: "",
    company: "",
    address: "",
    address2: "",
    country_id: "",
    city_id: "",
    state_id: "",
    suburb: "",
    post_code: "",
  };

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
    defaultValues: defaultValues,
  });

  const watchCountry = watch('country_id');
  const watchState = watch('state_id');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        person: initialData.person || "",
        company: initialData.company || "",
        address: initialData.address || "",
        address2: initialData.address2 || "",
        country_id: initialData.country_id || "",
        state_id: initialData.state_id || "",
        city_id: initialData.city_id || "",
        suburb: initialData.suburb || "",
        post_code: String(initialData.post_code) || "",
      });

      prevCountryRef.current = initialData.country_id || "";
      prevStateRef.current = initialData.state_id || "";
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (watchCountry && prevCountryRef.current && watchCountry !== prevCountryRef.current) {
      setValue('state_id', '');
      setValue('city_id', '');
    }
    prevCountryRef.current = watchCountry;
  }, [watchCountry, setValue]);

  useEffect(() => {
    if (watchState && prevStateRef.current && watchState !== prevStateRef.current) {
      setValue('city_id', '');
    }
    prevStateRef.current = watchState;
  }, [watchState, setValue]);

  const updateAddresById = async (addressData: IAddressPayload): Promise<any> => {
    const payload: IBillingAddress | IShippingAddress = type === "billing"
      ? { billing_addresses: [addressData] }
      : { shipping_addresses: [addressData] };

    if (mode === 'add') {
      const { data } = await userService.postProfile(payload);
      return data?.data;
    } else {
      const { data } = await userService.updateProfileById(payload, user?.id);
      return data?.data;
    }
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
      reset(defaultValues);
      onClose();
      setMode("")
      setType("")
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
    watchCountry,
    watchState,
    defaultValues
  };
};

export default useAddressModal;