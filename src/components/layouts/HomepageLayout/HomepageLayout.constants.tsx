import { TbArrowRightToArc } from "react-icons/tb";
import { Heart, ShoppingCart, User } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Order Tracking", href: "/user/order-tracking" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  // { label: "FAQ", href: "/product/faq" },
  // { label: "Compare", href: "/product/compare" },
];

const NAV_CATEGORIES = [
  { label: "Products", href: "/product/list" },
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
    icon: <User className="text-success" />,
    showInMobile: true,
  },
  {
    label: "Wishlist",
    href: "/user/wishlist",
    variant: "light",
    isAuthBtn: false,
    icon: <Heart className="text-success" />,
    showInMobile: false,
  },
  {
    label: "Cart",
    href: "/cart",
    variant: "light",
    isAuthBtn: false,
    icon: <ShoppingCart className="text-success" />,
    showInMobile: true,
  },
];

export { AUTH_BUTTONS, NAV_LINKS, USER_ACTION_BUTTONS, NAV_CATEGORIES };
