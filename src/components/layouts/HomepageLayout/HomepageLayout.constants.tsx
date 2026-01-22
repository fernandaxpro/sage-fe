/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbArrowRightToArc } from "react-icons/tb";
import { Heart, ShoppingCart, User } from "lucide-react";
import { FaBox } from "react-icons/fa6";
import { ReactNode } from "react";

export interface SubItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface BrandItem {
  name: string;
  items: SubItem[];
}

export interface PopupContent {
  brands?: BrandItem[];
}

export type PopupContentMap = {
  [key: string]: PopupContent;
};

export const createItems = (labels: string[]): SubItem[] => {
  return labels.map((label) => ({
    label,
    href: `/products/${label.toLowerCase().replace(/\s+/g, "-")}`,
    icon: <FaBox className="w-5 h-5" />,
  }));
};

export const convertCategoriesToPopupContent = (categories: any[]): PopupContent => {
  const brands: BrandItem[] = categories.map((category) => ({
    name: category.name,
    items: category.children?.map((child: any) => ({
      label: child.name,
      href: `/product/list?category=${child.url_slug}`,
      icon: <FaBox className="w-5 h-5" />,
      url_logo: child.url_logo || "", 
    })) || []
  }));

  return { brands };
};

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Order Tracking", href: "/user/order-tracking" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  // { label: "FAQ", href: "/product/faq" },
  // { label: "Compare", href: "/product/compare" },
];

const NAV_CATEGORIES = [
  { label: "Products" },
  { label: "Pre-Order", href: "/pre-order" },
  { label: "Pre-Own", href: "/pre-own" },
  { label: "Retro", href: "/retro" },
  { label: "Shop", href: "/product/list" },
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
