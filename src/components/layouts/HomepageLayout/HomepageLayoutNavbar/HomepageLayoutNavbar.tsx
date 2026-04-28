/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useState } from "react";
import {
  // AUTH_BUTTONS,
  NAV_LINKS,
  USER_ACTION_BUTTONS,
} from "../HomepageLayout.constants";
import Link from "next/link";
import useHomepageLayoutNavbar from "./useHomepageLayoutNavbar";
import ModalAuth from "@/components/ui/ModalAuth";
import ShoppingCart from "@/components/ui/ShoppingCart";
import HomepageLayoutNavbarPopupHover from "./HomepageLayoutNavbarPopupHover";
import { HiBars3 } from "react-icons/hi2";
import HomepageLayoutMobileSidebar from "./HomepageLayoutMobileSidebar";
import HomepageLayoutMobileLoginDrawer from "./HomepageLayoutMobileLoginDrawer";
import { signOut, useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { SOCIAL_LINKS } from "./HomePageLayoutNavbar.constants";
import { useWishlist } from "@/hooks/useWishlist";
import useSetting from "@/hooks/useSetting";

const HomepageLayoutNavbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    settingsMap,
    isLoadingGlobalSetting
  } = useSetting();
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

    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useHomepageLayoutNavbar({ session, status });
  const { wishlistCount } = useWishlist();
  const currentPath = router.pathname;

  const [cartCount, setCartCount] = useState(1);

  const getBadgeCount = (label: string) => {
    switch (label) {
      case "Cart":
        return cartCount;
      case "Wishlist":
        return wishlistCount ?? 0;
      default:
        return 0;
    }
  };

  return (
    <header>
      <Navbar
        maxWidth="full"
        position="static"
        className="bg-secondary px-5 h-[4vh] min-h-[4vh]"
      >
        <div className="max-w-standard w-full mx-auto flex items-center justify-betweenr">
          <NavbarContent
            justify="start"
            className="flex-grow-0 !justify-center lg:!justify-start"
          >
            <p className="text-primary text-xs font-semibold whitespace-nowrap">
              100% Secure delivery without contacting the courier
            </p>
          </NavbarContent>

          <NavbarContent
            justify="end"
            className="gap-0 hidden lg:flex flex-grow-0"
          >
            <div className="flex items-center gap-0">
              {NAV_LINKS.map((item) => (
                <NavbarItem
                  as={Link}
                  href={item.href}
                  key={`nav-${item.label}`}
                  className="text-primary hover:text-success text-xs font-semibold px-4 border-r border-bordered last:border-r-0"
                >
                  {item.label}
                </NavbarItem>
              ))}

              {SOCIAL_LINKS.map((item, index) => {
                const href = settingsMap?.[item?.key]; 
                if (!href) return null;
                return (
                  <NavbarItem
                    as={Link}
                    href={href}
                    key={`social-${index}`}
                    className="text-primary hover:text-success text-xs font-semibold px-3 border-r border-bordered last:border-r-0"
                  >
                    {item.icon}
                  </NavbarItem>
                )
              })}

              <NavbarItem className="text-primary text-xs font-semibold border-r border-bordered">
                <Select
                  defaultSelectedKeys={["english"]}
                  className="min-w-[100px]"
                  classNames={{
                    trigger:
                      "bg-transparent border-none shadow-none h-auto min-h-0 px-4 data-[hover=true]:bg-transparent",
                    value: "!text-primary !text-xs !font-semibold",
                    mainWrapper: "h-auto",
                    base: "h-auto min-h-0",
                  }}
                  disallowEmptySelection
                >
                  <SelectItem key="english">English</SelectItem>
                  <SelectItem key="french">French</SelectItem>
                </Select>
              </NavbarItem>

              <NavbarItem className="text-primary text-xs font-semibold border-r border-bordered">
                <Select
                  radius="none"
                  defaultSelectedKeys={["usd"]}
                  className="min-w-[100px]"
                  classNames={{
                    trigger:
                      "bg-transparent border-none shadow-none h-auto min-h-0 px-4 data-[hover=true]:bg-transparent",
                    value: "!text-primary !text-xs !font-semibold",
                    mainWrapper: "h-auto",
                    base: "h-auto min-h-0",
                  }}
                  disallowEmptySelection
                >
                  <SelectItem key="usd">USD</SelectItem>
                  <SelectItem key="euro">EURO</SelectItem>
                </Select>
              </NavbarItem>
            </div>
          </NavbarContent>
        </div>
      </Navbar>

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

          {/* Sidebar Logo */}
          <NavbarBrand>
            {/* <Image
              src="/images/general/logo.png"
              alt="logo"
              width={316}
              height={75}
              className="cursor-pointer w-[120px] h-[30px] md:w-[220px] md:h-[55px] lg:w-[280px] lg:h-[65px] xl:w-[316px] xl:h-[75px] max-w-full object-contain"
            /> */}
            <Link href="/" className="flex items-center">
              <div className="cursor-pointer">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                  Sage Gaming
                </h1>
              </div>
            </Link>
          </NavbarBrand>

          {/* Sidebar Search  */}
          <NavbarContent
            justify="start"
            className="hidden lg:flex flex-1 min-w-0 !basis-[30%]"
          >
            <NavbarItem className="lg:flex-1 lg:max-w-full flex !items-center gap-6 min-w-0 lg:relative">
              <div className="hidden lg:block ">
                <p className="text-sm text-primary font-bold">
                  Need help? 0020 500 - SAGE GAMING - 000
                </p>
              </div>

              <Input
                placeholder="Search for products"
                className="w-full min-w-0 text-base"
                endContent={
                  <Search
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-primary"
                    strokeWidth={2}
                  />
                }
                radius="full"
                classNames={{
                  input: `text-sm h-[40px] md:h-[44px] lg:h-[48px] font-bold !text-primary placeholder:text-primary placeholder:font-bold`,
                  inputWrapper: `h-[40px] md:h-[44px] lg:h-[48px]`,
                }}
              />
            </NavbarItem>
          </NavbarContent>

          {/* Sidebar Action */}
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
                              isBordered
                              as="button"
                              name={dataProfile?.first_name ?? ""}
                              src={dataProfile?.profile_picture}
                              className="cursor-pointer font-bold"
                              showFallback
                            />
                          </DropdownTrigger>
                          <DropdownMenu>
                            {currentPath !== "/user/profile" ? (
                              <DropdownItem key="profile" href="/user/profile">
                                Profile
                              </DropdownItem>
                            ) : null}
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
                    content={getBadgeCount(item.label)}
                    shape="circle"
                    classNames={{
                      badge: "min-w-[24px] h-[24px] md:min-w-[28px] md:h-[28px] flex items-center justify-center text-secondary bg-primary text-xs md:text-sm font-semibold"
                    }}
                    isInvisible={getBadgeCount(item.label) === 0}
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
      </div>

      <HomepageLayoutNavbarPopupHover />

      <HomepageLayoutMobileSidebar
        dataProfile={dataProfile}
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuToggle}
        onOpenLogin={handleMobileLoginToggle}
      />

      <HomepageLayoutMobileLoginDrawer
        isOpen={isMobileLoginOpen}
        onClose={handleMobileLoginToggle}
        control={control}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        isPendingLogin={isPendingLogin}
        errors={errors}
      />
    </header>
  );
};

export default HomepageLayoutNavbar;
