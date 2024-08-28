"use client";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { FC, useState } from "react";
import LoginHeader from "../../LoginHeader/LoginHeader";
import Logo from "../../../Logo/Logo";
import { GiFruitBowl } from "react-icons/gi";
import Link from "next/link";
import LightToggleHeader from "@/components/modules/LightToggleHeader/LightToggleHeader";
import { MenuModel } from "@/models/HomeModel";
import Icon from "@/components/modules/Icon/Icon";
import { usePathname } from "next/navigation";

type MenuMobileProps = {
  menus: MenuModel[];
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
};

const MenuMobile: FC<MenuMobileProps> = ({ openMenu, setOpenMenu, menus }) => {
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const IconSubMenu = openSubMenu ? HiChevronUp:HiChevronDown;
  const pathname = usePathname();

  return (
    <div
      className={`overflow-y-auto fixed top-0 bottom-0  w-64 min-h-screen py-3 px-4 bg-white dark:bg-zinc-700 z-20 transition-all ${
        openMenu ? "right-0" : "-right-64"
      }`}
    >
      {/* menu top */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-b-gray-200 dark:border-b-white/10">
        <Logo className="h-12" showTitle />
        <Icon
          nameIcon="HiOutlineXMark"
          className="!size-5 text-zinc-600 dark:text-white cursor-pointer"
          onClick={() => setOpenMenu(false)}
        />
      </div>

      {/* menu body */}
      <ul className=" space-y-6 dark:text-white text-zinc-600">
        <Link
          href="/"
          className={`menu  ${pathname === "/" && "menu--select"}`}
        >
          <Icon nameIcon="HiOutlineHome" className="!size-5" />
          صفحه اصلی
        </Link>

        <div className="flex justify-between items-center transition-colors">
          <Link
            href={`/productlist/all`}
            className={`menu basis-[90%] ${
              pathname.slice(0, pathname.lastIndexOf("/")) === "/productlist" &&
              "menu--select"
            }`}
          >
            <GiFruitBowl className="size-5" />
            محصولات
          </Link>

          <IconSubMenu
            className="size-4 cursor-pointer"
            onClick={() => setOpenSubMenu((pre) => !pre)}
          />
        </div>

        <ul
          className={`flex-col gap-y-3 pr-7 text-sm  transition-all ${
            openSubMenu ? "flex" : "hidden"
          }`}
        >
          {menus.map((menu, index) => (
            <Link href={`/productlist/${menu.slug}`} key={index}>
              {menu.name}
            </Link>
          ))}
        </ul>

        <Link href="#" className="menu">
          <Icon nameIcon="HiOutlineBriefcase" className="!size-5" />
          درباره ما
        </Link>
      </ul>

      {/* menu bottom */}
      <div className="flex flex-col items-start gap-y-4 text-orange-400 dark:text-white py-8 mt-6 px-2.5 border-t border-t-gray-200 dark:border-t-white/10">
        <LoginHeader iconClassName="!size-5" />

        <LightToggleHeader iconClassName="size-5" showTitle={true} />

        <Link href="/" className="inline-flex items-center gap-x-2.5">
          <Icon nameIcon="HiOutlineShoppingCart" className="!size-5" />
          <span>سبد خرید</span>
        </Link>
      </div>
    </div>
  );
};

export default MenuMobile;
