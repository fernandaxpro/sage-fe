import {
  Avatar,
  Badge,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import React from "react";
import {
  AUTH_BUTTONS,
  NAV_LINKS,
  USER_ACTION_BUTTONS,
} from "../HomepageLayout.constants";
import Link from "next/link";
// import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import useHomepageLayoutNavbar from "./useHomepageLayoutNavbar";
import ModalAuth from "@/components/ui/ModalAuth";
import ShoppingCart from "@/components/ui/ShoppingCart";
import HomepageLayoutNavbarPopupHover from "./HomepageLayoutNavbarPopupHover";
import { HiBars3 } from "react-icons/hi2";
import HomepageLayoutMobileSidebar from "./HomepageLayoutMobileSidebar";
import HomepageLayoutMobileLoginDrawer from "./HomepageLayoutMobileLoginDrawer";
import { signOut, useSession } from "next-auth/react";
import { Search } from "lucide-react";

const HomepageLayoutNavbar = () => {
  const { data: session, status } = useSession();
  const {
    dataProfile,

    openModalAuth,
    handleOpenModalAuth,

    handleOpenModalShoppingCart,
    openModalShoppingCart,
    isMobileMenuOpen,
    handleMobileMenuToggle,
    isMobileLoginOpen,
    handleMobileLoginToggle,
  } = useHomepageLayoutNavbar({ session, status });

  return (
    <header>
      {/* <Navbar
        maxWidth="full"
        position="static"
        isBordered
        className="bg-primary px-5"
      >
        <div className="max-w-standard w-full mx-auto flex items-center">
          <NavbarContent>
            <p className="text-white text-sm md:text-base mx-auto md:mx-0 lg:mx-0 xl:mx-0">
              Need help? Call us on 1300 843 883
            </p>
          </NavbarContent>

          <NavbarContent justify="end" className="gap-[30px] hidden lg:flex">
            {NAV_LINKS.map((item) => (
              <NavbarItem
                as={Link}
                href={item.href}
                key={`nav-${item.label}`}
                className="text-white hover:text-gray-300 lg:relative text-sm md:text-base"
              >
                {item.label}
              </NavbarItem>
            ))}

            {status === 'unauthenticated' && (
              <>
                {AUTH_BUTTONS.map((item) => (
                  <NavbarItem key={`button-${item.label}`}>
                    <Button
                      as={Link}
                      className="bg-white text-sm md:text-base"
                      href={item.href}
                      radius="full"
                      variant={item.variant as ButtonProps["variant"]}
                    >
                      {item.icon} {item.label}
                    </Button>
                  </NavbarItem>
                ))}
              </>
            )}
          </NavbarContent>
        </div>
      </Navbar> */}

      <Navbar
        maxWidth="full"
        isBordered
        position="static"
        className="p-0 md:px-5 md:py-8"
      >
        <div className="max-w-standard w-full mx-auto flex items-center">
          <NavbarContent className="lg:hidden flex-none" justify="start">
            <Button
              isIconOnly
              variant="light"
              className="min-w-10 w-10 h-10"
              onPress={handleMobileMenuToggle}
            >
              <HiBars3 className="text-2xl text-primary" />
            </Button>
          </NavbarContent>

          <NavbarBrand as={Link} href="/">
            {/* <Image
              src="/images/general/logo.png"
              alt="logo"
              width={316}
              height={75}
              className="cursor-pointer w-[120px] h-[30px] md:w-[220px] md:h-[55px] lg:w-[280px] lg:h-[65px] xl:w-[316px] xl:h-[75px] max-w-full object-contain"
            /> */}
            <h1 className="text-3xl font-bold text-primary">Sage Gaming</h1>
          </NavbarBrand>

          <NavbarContent
            justify="start"
            className="hidden lg:flex flex-1 min-w-0"
          >
            <NavbarItem className="lg:flex-1 lg:max-w-full min-w-0 lg:relative">
              <Input
                placeholder="Search for products"
                className="w-full min-w-0 text-base text-primary"
                endContent={
                  <Search
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary"
                    strokeWidth={2}
                  />
                }
                classNames={{
                  input: `text-sm h-[40px] md:h-[44px] lg:h-[48px] font-bold text-primary placeholder:text-primary placeholder:font-bold`,
                  inputWrapper: `h-[40px] md:h-[44px] lg:h-[48px]`,
                }}
              />
            </NavbarItem>
          </NavbarContent>

          <NavbarContent
            justify="end"
            className="gap-[20px] md:gap-[28px] lg:gap-[34px]"
          >
            {USER_ACTION_BUTTONS.map((item) => (
              <NavbarItem
                key={`button-${item.label}`}
                className={
                  item.showInMobile ? "" : "hidden md:block lg:block xl:block"
                }
              >
                {item.isAuthBtn ? (
                  <>
                    {status === "authenticated" ? (
                      <NavbarItem className="hidden lg:block">
                        <Dropdown>
                          <DropdownTrigger>
                            <Avatar
                              name={dataProfile?.first_name ?? ""}
                              src={dataProfile?.profile_picture}
                              className="cursor-pointer font-bold"
                              showFallback
                            />
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem key="profile" href="/profile">
                              Profile
                            </DropdownItem>
                            <DropdownItem
                              key="signout"
                              onPress={() => signOut({ callbackUrl: "/" })}
                            >
                              Logout
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </NavbarItem>
                    ) : (
                      <>
                        <div className="hidden lg:block">
                          <ModalAuth
                            isOpen={openModalAuth}
                            onOpenChange={handleOpenModalAuth}
                            triggerButton={
                              <Button
                                color="default"
                                variant={item.variant as ButtonProps["variant"]}
                                isIconOnly
                                className="font-medium w-[36px] h-[36px] text-lg md:w-[44px] md:h-[44px] md:text-xl lg:w-[48px] lg:h-[48px] lg:text-2xl"
                              >
                                {item.icon}
                              </Button>
                            }
                          />
                        </div>
                        <Button
                          color="default"
                          variant={item.variant as ButtonProps["variant"]}
                          isIconOnly
                          className="lg:hidden font-medium w-[36px] h-[36px] text-lg md:w-[44px] md:h-[44px] md:text-xl"
                          onPress={handleMobileLoginToggle}
                        >
                          {item.icon}
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <Badge
                    color="warning"
                    content={0}
                    shape="circle"
                    className="text-white text-xs md:text-sm px-[4px] py-[2px] md:px-[6px] md:py-[3px]"
                  >
                    {item.label === "Cart" ? (
                      <ShoppingCart
                        isOpen={openModalShoppingCart}
                        onOpenChange={handleOpenModalShoppingCart}
                        triggerButton={
                          <Button
                            color="default"
                            variant={item.variant as ButtonProps["variant"]}
                            isIconOnly
                            onPress={() => handleOpenModalShoppingCart(true)}
                            className="font-medium w-[36px] h-[36px] text-lg md:w-[44px] md:h-[44px] md:text-xl lg:w-[48px] lg:h-[48px] lg:text-2xl"
                          >
                            {item.icon}
                          </Button>
                        }
                      />
                    ) : (
                      <Button
                        as={Link}
                        color="default"
                        href={
                          status === "unauthenticated"
                            ? "/auth/login"
                            : item.href
                        }
                        variant={item.variant as ButtonProps["variant"]}
                        isIconOnly
                        className="font-medium w-[36px] h-[36px] text-lg md:w-[44px] md:h-[44px] md:text-xl lg:w-[48px] lg:h-[48px] lg:text-2xl"
                      >
                        {item.icon}
                      </Button>
                    )}
                  </Badge>
                )}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
      </Navbar>

      {/* Mobile Search Bar - Visible only on mobile/tablet */}
      <div className="lg:hidden px-5 pb-4 bg-white border-b border-[#E4E4E4] w-full md:pb-6 pt-4 md:pt-0 lg:pt-0 xl:pt-0">
        <Input
          isClearable
          placeholder="What are you looking for?"
          className="w-full"
          startContent={<CiSearch className="w-5 h-5 text-gray-400" />}
          classNames={{
            input: "text-sm",
            inputWrapper: "h-[40px] rounded-full bg-[#F3F4F6]",
          }}
        />
      </div>

      <HomepageLayoutNavbarPopupHover />

      <HomepageLayoutMobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuToggle}
        onOpenLogin={handleMobileLoginToggle}
      />

      <HomepageLayoutMobileLoginDrawer
        isOpen={isMobileLoginOpen}
        onClose={handleMobileLoginToggle}
      />
    </header>
  );
};

export default HomepageLayoutNavbar;
