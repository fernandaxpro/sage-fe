import authService from '@/services/auth.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Session } from "next-auth";
import { ILogin, UserExtended } from '@/types/Auth';
import { useContext, useState } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { ToasterContext } from '@/contexts/ToasterContext';

interface PropTypes {
  session: Session | null;
  status: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().required("Please input your email"),
  password: yup.string().required("Please input your password"),
});


const useHomepageLayoutNavbar = (props: PropTypes) => {
  const { session, status } = props;
  const router = useRouter();
  const user = session?.user as UserExtended | undefined;
  const { setToaster } = useContext(ToasterContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [openModalAuth, setOpenModalAuth] = useState<boolean>(false);
  const [openModalShoppingCart, setOpenModalShoppingCart] = useState<boolean>(false)

  const handleOpenModalAuth = (value: boolean) => {
    setOpenModalAuth(value);
  };

  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const handleMobileLoginToggle = () => setIsMobileLoginOpen(!isMobileLoginOpen);

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
      setIsMobileMenuOpen(false)
      setOpenModalAuth(false)
      setIsMobileLoginOpen(false)
      router.push(callbackUrl)
    }
  })

  const handleLogin = (data: ILogin) => mutateLogin(data)

  const handleOpenModalShoppingCart = (value: boolean) => {
    setOpenModalShoppingCart(value)
  }

  const getProfile = async () => {
    if (!user?.id) return null;
    const { data } = await authService.getProfile(user.id);
    return data.data;
  }

  const { data: dataProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: getProfile,
    enabled: router.isReady || status === 'authenticated'
  })

  return {
    dataProfile,

    openModalAuth,
    handleOpenModalAuth,

    handleOpenModalShoppingCart,
    openModalShoppingCart,

    isMobileMenuOpen,
    handleMobileMenuToggle,

    isMobileLoginOpen,
    handleMobileLoginToggle,

    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useHomepageLayoutNavbar;
