import {
  // FOOTER_INFO,
  FOOTER_MENUS,
  SOCIAL_CONFIG
  // FOOTER_INFO, 
} from "./HomepageLayoutFooter.constants";
import { useSession } from "next-auth/react";
import { Mail, Phone, ShoppingBag, Truck, Wallet } from "lucide-react";
// import useHomepageLayoutFooter from "./useHomepageLayoutFooter";
import useSetting from "@/hooks/useSetting";
import { Image } from "@heroui/react";
// import Image from "next/image";
// import { FaShippingFast } from "react-icons/fa";
// import Image from "next/image";
// import Image from "next/image";
// import Image from "next/image";
// import { FaBagShopping, FaWallet } from "react-icons/fa6";

const HomepageLayoutFooter = () => {
  const { status } = useSession();
  const {
    settingsMap,
    isLoadingGlobalSetting
  } = useSetting()

  return (
    <footer>
      <div className="max-w-standard mx-auto px-8 flex flex-col md:flex-row">
        <div className="flex-1 px-8 py-4 flex items-center justify-center bg-secondary">
          <Wallet className="text-primary h-5" /> <p className="text-primary text-sm ml-2 font-bold">100% Money back</p>
        </div>
        <div className="flex-1 px-8 py-4 flex items-center justify-center bg-secondary md:border-l md:border-r border-bordered">
          <ShoppingBag className="text-primary h-5" /> <p className="text-primary text-sm ml-2 font-bold">No-contact shipping</p>
        </div>
        <div className="flex-1 px-8 py-4 flex items-center justify-center bg-secondary">
          <Truck className="text-primary h-5" /> <p className="text-primary text-sm ml-2 font-bold">Free delivery for order over $200</p>
        </div>
      </div>

      <div className="max-w-standard w-full flex flex-col lg:flex-row mx-auto p-8 gap-4">
        <div className="flex flex-col md:flex-row basis-[50%] gap-6">
          <div className="flex basis-[40%] flex-col gap-8 md:border-r">
            <div className="flex items-center">
              {/* <h1 className="text-lg md:text-3xl font-bold text-primary">Sage Gaming</h1> */}
              <Image
                src={settingsMap['company.logo_url']}
                alt='logo'
                width={250}
                isLoading={isLoadingGlobalSetting}
                height={75}
              />
            </div>

            <div className="text-base flex flex-col gap-[10px]">
              <div className="flex items-start gap-[12px]">
                <p className="font-bold text-base md:text-lg text-muted">
                  {settingsMap["company.address"]},{" "}
                  {settingsMap["company.suburb"]},{" "}
                  {settingsMap["company.state"]}{" "}
                  {settingsMap["company.postcode"]}
                </p>
              </div>
            </div>

            <div className="flex gap-[8px]">
              {SOCIAL_CONFIG.map((social, i) => {
                const href = settingsMap?.[social.key];

                if (!href) return null;

                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-success transition-colors"
                  >
                    <span className="w-[24px] h-[24px] flex items-center justify-center">
                      {social.icon}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col basis-[60%] gap-5">
            <h4 className="text-base md:text-lg font-semibold text-primary">
              Need help
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <span><Phone className="text-primary font-bold" /></span>
                <div className="flex flex-col gap-5">
                  <h1 className="text-primary font-bold text-lg md:text-2xl">
                    {settingsMap['company.business_number']}
                  </h1>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span><Mail className="text-primary font-bold" /></span>
                <div className="flex flex-col gap-5">
                  <h1 className="text-primary font-bold text-lg">
                    {settingsMap['company.email']}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 basis-[50%]">
          {FOOTER_MENUS.map((menu, idx) => (
            <div key={idx} className="flex-1 flex flex-col gap-5">
              <h4 className="text-base md:text-lg font-semibold text-primary">
                {menu.title}
              </h4>

              {menu.items && (
                <div className="flex gap-10">
                  <ul className="flex flex-col gap-[15px] text-primary text-sm font-medium">
                    {menu.items.map((item, i) => (
                      <li key={i}>
                        <a
                          href={
                            status === "authenticated"
                              ? item.href
                              : "/auth/login"
                          }
                          className="hover:text-success transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* {menu.tags && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
                  {menu.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm p-[10px] font-medium text-primary bg-secondary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 border-t border-[#E4E4E4]">
        <div className="flex max-w-standard text-center sm:text-start gap-5 sm:gap-2 w-full mx-auto flex-col sm:flex-row justify-between items-center">
          <div className="text-base font-semibold text-primary">
            Copyright &copy; 2026 {settingsMap['company.name']}. All Rights Reserved
          </div>

          <div className="flex items-center">
            <div className="text-base font-semibold text-primary">
              Design & Develop by{" "}
              <span>
                {" "}
                <a
                  href="https://xprogroup.com.au"
                  target="_blank"
                  className="font-bold"
                >
                  <b>Xpro Group</b>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomepageLayoutFooter;
