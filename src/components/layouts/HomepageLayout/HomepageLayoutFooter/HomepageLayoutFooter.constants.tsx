import { Facebook, Instagram, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const SOCIAL_CONFIG = [
  {
    key: "company.facebook",
    icon: <FaFacebookF />,
  },
  {
    key: "company.instagram",
    icon: <FaInstagram />,
  },
  {
    key: "company.x",
    icon: <FaXTwitter />,
  },
  {
    key: "company.tiktok",
    icon: <FaTiktok />,
  },
];


const FOOTER_INFO = {
  logo: {
    src: "/images/general/logo.png",
    alt: "logo",
    width: 316,
    height: 75,
  },
  contacts: [
    // {
    //   icon: <LuPhone />,
    //   text: "1300 843 883",
    // },
    // {
    //   icon: <LuMail />,
    //   text: "admin@alarmexpert.com.au",
    // },
    {
      // icon: <CiMap />,
      text: "1487 Rocky Horse Carrefour Arlington, TX 16819",
    },
  ],
  socials: [
    {
      icon: <Facebook />,
      href: "#",
    },
    {
      icon: <Instagram />,
      href: "#",
    },
    {
      icon: <X />,
      href: "#",
    },
  ],
};

const FOOTER_MENUS = [
  {
    title: "Information",
    items: [
      { label: "About us", href: "/about" },
      { label: "Delivery information", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Sales", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
  // {
  //   title: "Pages",
  //   items: [
  //     { label: "Blog", href: "/product/blog" },
  //   ],
  // },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/user/profile" },
      { label: "Order", href: "/user/order" },
      { label: "Address", href: "/user/address" },
      { label: "Wishlist", href: "/user/wishlist" },
      // { label: "Shipping", href: "/user/adress" },
    ],
  },
  {
    title: "Store",
    items: [
      { label: "Affiliate", href: "#" },
      { label: "Bestsellers", href: "#" },
      { label: "Discount", href: "#" },
      { label: "Latest products", href: "#" },
      { label: "Sale", href: "#" },
    ],
  },
  // {
  //   title: "Tags",
  //   tags: ["Suitable for Commercial", "Suitable for House of Apartment"],
  // },
];

export { 
  SOCIAL_CONFIG,
  FOOTER_INFO, 
  FOOTER_MENUS 
};
