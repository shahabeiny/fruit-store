"use client";

import React, { FC, useState } from "react";
import SidebarItem from "./SidebarItem";
import Logo from "../Logo/Logo";
import SidebarSubItem from "./SidebarSubItem";
import { useSetLogotMutation } from "@/redux/store/auth/authApi";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import { useAppSelector } from "@/hooks/useReduxhook";
import checkPermission from "@/utils/checkPermission";
import Icon from "../Icon/Icon";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

type SidebarProps = {
  className?: string;
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({
  className,
  openSidebar,
  setOpenSidebar,
}) => {
  const router = useRouter();
  const [logout] = useSetLogotMutation();
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();

  const handleExit = () => {
    deleteCookie("userPermission");
    logout();
    router.push("/");
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 z-30 bg-white dark:bg-zinc-800 flex flex-col w-64 my-0 md:my-6 pl-3 md:pl-0 pr-6 py-5 lg:py-0 mx-auto shrink-0  transition-all lg:transition-none md:right-0 ${
        openSidebar ? "right-0" : "-right-64"
      } ${className || ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <Logo showTitle={true} />
        <Icon
          nameIcon="HiOutlineXMark"
          className="text-slate-500 dark:text-slate-400 !size-5 md:hidden cursor-pointer"
          onClick={() => setOpenSidebar(false)}
        />
      </div>
      <div className="space-y-6 pl-1 h-full font-DanaDemiBold dark:text-white text-zinc-700 overflow-y-auto">
        <SidebarItem
          link="/panel/"
          nameIcon="HiOutlineHome"
          title="پیشخوان"
          className={`  ${
            pathname === "/panel" &&
            "menu--select !bg-gray-100 dark:!bg-orange-300/20"
          }`}
        />
        <SidebarItem
          link="/panel/profile"
          className={`${
            pathname === "/panel/profile" &&
            "menu--select !bg-gray-100 dark:!bg-orange-300/20"
          }`}
          nameIcon="HiOutlineUser"
          title="پروفایل"
        />
        {/* <SidebarItem
          link="/panel/favorites"
          nameIcon="HiOutlineHeart"
          title="علاقه مندی ها"
        /> */}
        {user && checkPermission("SHOW_PRODUCTS", user.role) && (
          <SidebarItem
            link="/panel/categories"
            className={`${
              pathname === "/panel/categories" &&
              "menu--select !bg-gray-100 dark:!bg-orange-300/20"
            }`}
            nameIcon="HiOutlineListBullet"
            title="دسته بندی"
          />
        )}

        {user && checkPermission("SHOW_PRODUCTS", user.role) && (
          <SidebarItem
            link="/panel/products"
            className={`${
              pathname === "/panel/products" &&
              "menu--select !bg-gray-100 dark:!bg-orange-300/20"
            }`}
            nameIcon="HiArrowPathRoundedSquare"
            title="محصولات"
          />
        )}
        {/* <SidebarItem
          link="/panel/slides"
          nameIcon="HiOutlinePhoto"
          title="اسلایدها"
        /> */}
        {user && !checkPermission("SHOW_ORDERS", user.role) && (
          <SidebarItem
            link="/panel/orders/me"
            className={`${
              pathname === "/panel/orders/me" &&
              "menu--select !bg-gray-100 dark:!bg-orange-300/20"
            }`}
            nameIcon="HiOutlineClipboardDocumentCheck"
            title="سفارشات"
          />
        )}
        {user && checkPermission("SHOW_ORDERS", user.role) && (
          <SidebarSubItem
            nameIcon="HiOutlineClipboardDocumentCheck"
            title="سفارشات"
            subList={[
              { title: "لیست سفارشات", link: "/panel/orders", isShow: true },
              { title: "سفارشات من", link: "/panel/orders/me", isShow: true },
            ]}
          />
        )}
        {/* <SidebarItem
          link="/panel/comments"
          nameIcon="HiOutlineChatBubbleOvalLeft"
          title="نظرات"
        /> */}
        {user && checkPermission("SHOW_USERS", user.role) && (
          <SidebarSubItem
            nameIcon="HiOutlineUserGroup"
            title="کاربران"
            subList={[
              { title: "لیست کاربران", link: "/panel/users", isShow: true },
              {
                title: "نقش ها",
                link: "/panel/roles",
                isShow: checkPermission("SHOW_ROLES", user.role),
              },
            ]}
          />
        )}
        <SidebarItem
          nameIcon="HiArrowRightOnRectangle"
          title="خروج"
          onClick={handleExit}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
