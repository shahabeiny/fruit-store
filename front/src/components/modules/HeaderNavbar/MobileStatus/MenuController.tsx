"use client";
import { FC,useState } from "react";
import Icon from "../../Icon/Icon";
import Overlay from "../../Overlay/Overlay";

import { MenuModel } from "@/models/HomeModel";
import dynamic from "next/dynamic";

const MenuMobileHeader = dynamic(() => import("./MenuMobile/MenuMobile"));

type MenuControllerProps = {
  menus: MenuModel[];
};

const MenuController:FC<MenuControllerProps> = ({menus}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <Icon
        nameIcon="HiBars3"
        className="text-zinc-700 dark:text-white cursor-pointer"
        onClick={() => setOpenMenu((pre) => !pre)}
      />

      <MenuMobileHeader openMenu={openMenu} setOpenMenu={setOpenMenu} menus={menus}/>
      <Overlay
        className={openMenu ? "block" : "hidden"}
        onClick={() => setOpenMenu(false)}
      />
    </>
  );
};

export default MenuController;
