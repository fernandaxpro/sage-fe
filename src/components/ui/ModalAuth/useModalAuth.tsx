import { ToasterContext } from "@/contexts/ToasterContext";
import { ILogin } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const loginSchema = yup.object().shape({
    email: yup.string().required("Please input your email"),
    password: yup.string().required("Please input your password"),
});

const useModalAuth = () => {
    const router = useRouter();
    const { setToaster } = useContext(ToasterContext);
    const callbackUrl: string = (router.query.callbackUrl as string) || "/";
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl
        })

        if (result?.error && result.status === 401) {
            throw new Error('Login Faild');
        }
    }
    const {
        mutate: mutateLogin,
        isPending: isPendingLogin
    } = useMutation({
        mutationFn: loginService,
        onError: () => {
            setToaster({
                type: 'error',
                message: 'Your credential is wrong'
            })
        },
        onSuccess: () => {
            reset()
            setToaster({
                type: "success",
                message: "Login success"
            })
            router.push(callbackUrl)
        }
    })

    const handleLogin = (data: ILogin) => mutateLogin(data)

    return {
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    }
}

export default useModalAuth