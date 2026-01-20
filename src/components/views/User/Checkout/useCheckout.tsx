/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useForm } from "react-hook-form";

const checkoutSchema: yup.ObjectSchema<any> = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    addressLine1: yup.string().required("Address is required"),
    addressLine2: yup.string().optional(),
    country_id: yup.mixed<string | number>().required("Country is required"),
    city_id: yup.mixed<string | number>().required("City is required"),
    state_id: yup.mixed<string | number>().required("State is required"),
    //   suburb: yup.mixed<string>().required("Suburb is required"),
    post_code: yup.mixed<string>().required("Post code is required"),

    orderRef: yup.string().optional(),
    poNumber: yup.string().optional(),
    orderNotes: yup.string().optional(),
    differentAddress: yup.boolean().optional(),
});

const useCheckout = () => {
    const { setToaster } = useContext(ToasterContext);

    const prevCountryRef = useRef<string | number>("");
    const prevStateRef = useRef<string | number>("");

    const defaultValues = {
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        country_id: "",
        city_id: "",
        state_id: "",
        // suburb: "",
        post_code: "",
        orderRef: "",
        poNumber: "",
        orderNotes: '',
        differentAddress: false,
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues,
        watch,
    } = useForm<any>({
        resolver: yupResolver(checkoutSchema),
        defaultValues: defaultValues,
    });

    const watchCountry = watch('country_id');
    const watchState = watch('state_id');

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

    return {
        control,
        handleSubmit,
        errors,
        setValue,
        getValues,
        watch,
        reset,
        watchCountry,
        watchState,
        defaultValues
    }
}

export default useCheckout