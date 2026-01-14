import { Facebook, Instagram, X } from "lucide-react";

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
      { label: "About us", href: "#" },
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
      { label: "My account", href: "/user/profile" },
      { label: "My order", href: "/user/order" },
      { label: "Return", href: "/product/my-address" },
      { label: "Wishlist", href: "/user/wishlist" },
      { label: "Shipping", href: "/user/adress" },
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

export { FOOTER_INFO, FOOTER_MENUS };
