// import Image from "next/image";
import { FaBagShopping, FaWallet } from "react-icons/fa6";
import { FOOTER_INFO, FOOTER_MENUS } from "./HomepageLayoutFooter.constants";
import { FaShippingFast } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";

const HomepageLayoutFooter = () => {
  const { status } = useSession();
  return (
    <footer
    // className="border-t border-[#E4E4E4]"
    >
      <div className="max-w-standard mx-auto px-8 flex">
        <div className="flex-1 px-8 py-4 flex items-center justify-center bg-secondary">
          <FaWallet />
        </div>
        <div className="flex-1 px-8 py-4 flex items-center justify-center bg-secondary border-l border-r border-[#D9DBDE]">
          <FaBagShopping />
        </div>
        <div className="flex-1 px-8 py-4 flex items-center justify-center bg-secondary">
          <FaShippingFast />
        </div>
      </div>

      <div className="max-w-standard w-full mx-auto p-8">
        {/* <div className="flex flex-col gap-[32px]">
          <div className="flex items-center">
            <Image
              src={FOOTER_INFO.logo.src}
              alt={FOOTER_INFO.logo.alt}
              width={FOOTER_INFO.logo.width}
              height={FOOTER_INFO.logo.height}
            />
            <h1 className="text-3xl font-bold text-primary">Sage Gaming</h1>
          </div>

          <div className="text-base flex flex-col gap-[10px]">
            {FOOTER_INFO.contacts.map((contact, i) => (
              <div key={i} className="flex items-start gap-[12px]">
                <span className="w-[23px] h-[23px] flex items-center justify-center">
                  {contact.icon}
                </span>
                <span>{contact.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-[8px]">
            {FOOTER_INFO.socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <span className="w-[24px] h-[24px] flex items-center justify-center">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </div> */}

        <div className="flex gap-12">
          {FOOTER_MENUS.map((menu, idx) => (
            <div key={idx} className="flex-1 flex flex-col gap-5">
              <h4 className="text-base font-semibold text-black">
                {menu.title}
              </h4>

              {menu.items && (
                <div className="flex gap-10">
                  <ul className="flex flex-col gap-[15px] text-black text-sm font-medium">
                    {menu.items.map((item, i) => (
                      <li key={i}>
                        <a
                          href={
                            status === "authenticated"
                              ? item.href
                              : "/auth/login"
                          }
                          className="hover:text-blue-600 transition-colors"
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
          <div className="text-base font-semibold">
            Copyright &copy; 2026 SAGE GAMES. All Rights Reserved
          </div>

          <div className="flex items-center">
            <div className="text-base font-semibold">
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
