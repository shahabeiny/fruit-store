import React, { FC } from "react";
import LightToggleHeader from "../LightToggleHeader/LightToggleHeader";
import Icon from "../Icon/Icon";

type HeaderPanelProps = {
  className?: string;
  setOpenSidebar: (openSidebar: boolean) => void;
};

const HeaderPanelMobile: FC<HeaderPanelProps> = ({
  className,
  setOpenSidebar,
}) => {
  return (
    <header
      className={`block md:hidden h-16 w-full bg-white dark:bg-zinc-800 my-2  ${
        className || ""
      }`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="sidebar__open-btn flex flex-x-center gap-x-2 font-DanaMedium text-zinc-700 dark:text-white">
          <Icon nameIcon="HiBars3BottomRight" onClick={()=> setOpenSidebar(true)}/>
          پیشخوان
        </div>

        <div className="flex gap-x-3.5">
          <div className="toggle-theme flex items-center justify-center size-10 rounded-full bg-gray-100 dark:text-zinc-800 cursor-pointer transition-colors">
            <LightToggleHeader
              className="py-0 flex-center"
              iconClassName="size-6 dark:text-orange-300"
            />
          </div>
          {/* <!-- User Links Dropdown --> */}
        
        </div>
      </div>
    </header>
  );
};

export default HeaderPanelMobile;
