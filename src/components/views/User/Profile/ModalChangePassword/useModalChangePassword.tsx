/* eslint-disable @typescript-eslint/no-explicit-any */
import userService from "@/services/user.service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useForm } from "react-hook-form";

const passwordSchema = yup.object().shape({
    new_password: yup
        .string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters"),
    confirm_password: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("new_password")], "Passwords must match"),
});

interface IChangePassword {
    new_password: string;
    confirm_password: string;
}

interface PropTypes {
    onClose: () => void;
    refetchProfile: () => void;
}

const useModalChangePassword = ({ onClose, refetchProfile }: PropTypes) => {
    const { data } = useSession();
    const user: any = data?.user || null;
    const { setToaster } = useContext(ToasterContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        trigger, 
    } = useForm<IChangePassword>({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            new_password: "",
            confirm_password: "",
        },
        mode: "onChange", 
    });

    const {
        mutateAsync: mutateUpdatePassword,
        isPending: isLoadingUpdatePassword,
    } = useMutation({
        mutationFn: async (payload: IChangePassword) => {
            const transformedPayload = {
                password: payload.new_password,
                confirm_password: payload.confirm_password
            };
            
            const { data } = await userService.updateProfileById(
                transformedPayload,
                user?.id
            );
            return data?.data;
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Password updated successfully",
            });
            reset();
            onClose();
            refetchProfile();
        },
        onError: () => {
            setToaster({
                type: "error",
                message: "Failed to update password",
            });
        },
    });

    const handleUpdatePassword = async (data: IChangePassword) => {
        await mutateUpdatePassword(data);
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoadingUpdatePassword,
        handleUpdatePassword,
        reset,
        trigger,
    };
};

export default useModalChangePassword;