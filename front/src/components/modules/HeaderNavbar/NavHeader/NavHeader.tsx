"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "../../Logo/Logo";
import styles from "./NavHeader.module.css";
import { FC } from "react";
import { MenuModel } from "@/models/HomeModel";

type NavHeaderProps = {
  menus: MenuModel[];
};

const NavHeader: FC<NavHeaderProps> = ({ menus }) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-x-6 lg:gap-x-9 h-14">
      {/* logo */}
      <Logo className="h-14" classNameTitle="hidden lg:inline" showTitle />

      {/* menu */}
      <ul
        className="flex items-center gap-x-6 lg:gap-x-9 h-full child:leading-[56px] text-xl text-zinc-800 dark:text-white tracking-tightest
       child:transition-colors child-hover:text-orange-300"
      >
        <li className="font-DanaMedium ">
          <Link
            href="/"
            className={` ${pathname === "/" && styles.menu__selected}`}
          >
            خانه
          </Link>
        </li>
        <li className="relative group">
          <Link
            href={`/productlist/all`}
            className={`group-hover:text-orange-300 transition-colors ${
              pathname.slice(0, pathname.lastIndexOf("/")) === "/productlist" &&
              styles.menu__selected
            }`}
          >
            محصولات
          </Link>
          <div
            className="absolute top-full w-52 flex flex-col items-start gap-y-4 z-10
          p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible  text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 border-t-[3px] tracking-normal text-base border-t-orange-300 rounded-2xl shadow-normal transition-all delay-75 child:transition-colors child-hover:text-orange-300"
          >
            {menus.map((menu, index) => (
              <Link
                href={`/productlist/${menu.slug}`}
                key={index}
                className={`${
                  pathname === `/productlist/${menu.slug}` && " text-orange-300"
                }`}
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </li>
        <li>
          <Link href="/">درباره ما</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;
