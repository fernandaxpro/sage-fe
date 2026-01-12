import { CiMap } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { LuMail, LuPhone } from "react-icons/lu";

const FOOTER_INFO = {
  logo: {
    src: "/images/general/logo.png",
    alt: "logo",
    width: 316,
    height: 75,
  },
  contacts: [
    {
      icon: <LuPhone />,
      text: "1300 843 883",
    },
    {
      icon: <LuMail />,
      text: "admin@alarmexpert.com.au",
    },
    {
      icon: <CiMap />,
      text: "Church Avenue, Mascot, NSW, 2020",
    },
  ],
  socials: [
    {
      icon: <FaFacebookF />,
      href: "#",
    },
    {
      icon: <FaTwitter />,
      href: "#",
    },
    {
      icon: <FaInstagram />,
      href: "#",
    },
  ],
};

const FOOTER_MENUS = [
  {
    title: "Pages",
    items: [
      { label: "Blog", href: "/product/blog" },
      // { label: "FAQ", href: "/product/faq" },
      // { label: "Compare", href: "/product/compare" },
      // { label: "Contact", href: "/contact" },
      // { label: "My Account", href: "/user" },
      // { label: "Product", href: "/product/list" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "My Account", href: "/user" },
      { label: "My Order", href: "/product/my-order" },
      { label: "Address", href: "/product/my-address" },
      { label: "Wishlist", href: "/product/wishlist" },
    ],
  },
  {
    title: "Store",
    items: [{ label: "Shop", href: "/access-control" }],
  },
  {
    title: "Need Help",
    items: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Returns Policy", href: "/returns" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Price Match Guarantee", href: "/price-match" },
      { label: "Warranty Policy", href: "/warranty" },
    ],
  },
  // {
  //   title: "Tags",
  //   tags: ["Suitable for Commercial", "Suitable for House of Apartment"],
  // },
];

export { FOOTER_INFO, FOOTER_MENUS };
