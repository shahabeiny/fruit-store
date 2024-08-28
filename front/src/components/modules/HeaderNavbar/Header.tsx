import LoginHeader from "./LoginHeader/LoginHeader";
import NavHeader from "./NavHeader/NavHeader";
import LightToggleHeader from "../LightToggleHeader/LightToggleHeader";
import Icon from "../Icon/Icon";
import Link from "next/link";

const Header = async () => {
  let getDatas = await fetch(`${process.env.API_URL}/api/home-router/header`, {
    next: { revalidate: 120 },
  });
  let convertData = (await getDatas.json()).data;

  return (
    <div>
      <header className="hidden sm:flex items-center h-24 px-5 lg:px-10 py-5 bg-white dark:bg-zinc-900 shadow-normal">
        <div className="flex items-center justify-between w-full">
          {/* logo & nav */}
          <NavHeader menus={convertData} />

          {/* cart & theme */}
          <div className="flex gap-x-4 lg:gap-x-5 xl:gap-x-10 text-xl text-orange-300 dark:text-white">
            <div className="flex gap-x-4 lg:gap-x-5">
              <Link href="/cart" className="py-3 cursor-pointer ">
                <Icon nameIcon="HiOutlineShoppingCart" className="!size-8" />
              </Link>
              <LightToggleHeader iconClassName="size-8" />
            </div>
            <span className="block w-px h-14 bg-black/20 dark:bg-white/10 "></span>
            <LoginHeader
              iconClassName="w-8 h-8"
              titleClassName="hidden lg:inline-block"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
