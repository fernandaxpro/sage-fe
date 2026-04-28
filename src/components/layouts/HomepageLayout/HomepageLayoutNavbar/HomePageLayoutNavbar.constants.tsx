import { ReactNode } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

interface SocialLink {
  icon: ReactNode;
  key: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <FaFacebookF size={16} className="text-xs font-medium" />,
    key: "company.facebook",
  },
  {
    icon: <FaInstagram size={16} className="text-xs font-medium" />,
    key: "company.instagram",
  },
  {
    icon: <FaXTwitter size={16} className="text-xs font-medium" />,
    key: "company.x",
  },
  {
    icon: <FaTiktok size={16} className="text-xs font-medium" />,
    key: "company.tiktok",
  },
];

export { SOCIAL_LINKS };
