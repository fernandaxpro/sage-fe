import authService from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Session } from "next-auth";
import { UserExtended } from '@/types/Auth';
import { useState } from 'react';

interface PropTypes {
  session: Session | null;
  status: string;
}


const useHomepageLayoutNavbar = (props: PropTypes) => {
  const { session, status } = props;
  const router = useRouter();
  const user = session?.user as UserExtended | undefined;

  const [openModalAuth, setOpenModalAuth] = useState<boolean>(false);
  const [openModalShoppingCart, setOpenModalShoppingCart] = useState<boolean>(false)

  const handleOpenModalAuth = (value: boolean) => {
    setOpenModalAuth(value);
  };

  const handleOpenModalShoppingCart = (value: boolean) => {
    setOpenModalShoppingCart(value)
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  const handleMobileLoginToggle = () => setIsMobileLoginOpen(!isMobileLoginOpen);


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
  };
};

export default useHomepageLayoutNavbar;
