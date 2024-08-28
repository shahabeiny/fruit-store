import { FC } from "react";
import Logo from "../../Logo/Logo";
import Link from "next/link";
import Icon from "../../Icon/Icon";
import MenuController from "./MenuController";

const HeaderMobile: FC = async () => {
  let getDatas = await fetch(`${process.env.API_URL}/api/home-router/header`, {
    next: { revalidate: 120 },
  });
  let convertData = (await getDatas.json()).data;

  return (
    <header className="flex sm:hidden items-center justify-between h-16 px-4 bg-white dark:bg-zinc-700 transition-all shadow-normal">
      <MenuController menus={convertData} />
      <Logo className="size-10" showTitle={false} />
      <Link href="/cart" className="py-3 cursor-pointer ">
        <Icon
          nameIcon="HiOutlineShoppingCart"
          className="text-zinc-700 dark:text-white cursor-pointer"
        />
      </Link>
    </header>
  );
};

export default HeaderMobile;
