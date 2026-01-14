import { TbArrowRightToArc } from "react-icons/tb";
import { Heart, ShoppingCart, User } from "lucide-react";

const NAV_LINKS = [
  { label: "FAQ", href: "/product/faq" },
  { label: "Blog", href: "/product/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Compare", href: "/product/compare" },
];

const NAV_CATEGORIES = [
  { label: "Products", href: "/products" },
  { label: "Pre-Order", href: "/pre-order" },
  { label: "Pre-Own", href: "/pre-own" },
  { label: "Retro", href: "/retro" },
  { label: "Shop", href: "/shop" },
  { label: "Membership", href: "/membership" },
  { label: "Repairs", href: "/repairs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const AUTH_BUTTONS = [
  {
    label: "Login",
    href: "/auth/login",
    variant: "solid",
    icon: <TbArrowRightToArc />,
  },
];

const USER_ACTION_BUTTONS = [
  {
    label: "Account",
    href: "/user/profile",
    variant: "light",
    isAuthBtn: true,
    icon: <User />,
    showInMobile: true,
  },
  {
    label: "Wishlist",
    href: "/product/wishlist",
    variant: "light",
    isAuthBtn: false,
    icon: <Heart />,
    showInMobile: false,
  },
  {
    label: "Cart",
    href: "/cart",
    variant: "light",
    isAuthBtn: false,
    icon: <ShoppingCart />,
    showInMobile: true,
  },
];

export { AUTH_BUTTONS, NAV_LINKS, USER_ACTION_BUTTONS, NAV_CATEGORIES };
