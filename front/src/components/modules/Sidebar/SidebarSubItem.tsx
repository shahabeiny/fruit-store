import React, { FC, useState } from "react";
import Icon from "../Icon/Icon";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  nameIcon: string;
  title: string;
  subList: {
    title: string;
    link: string;
    isShow: boolean;
  }[];
};

const SidebarSubItem: FC<SidebarItemProps> = ({ nameIcon, title, subList }) => {
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const IconSubMenu = openSubMenu ? "HiChevronUp" : "HiChevronDown";
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      <div
        className={`flex justify-between items-center  ${
          openSubMenu
            ? "menu--select !bg-gray-100 dark:!bg-orange-300/20 pl-2.5"
            : ""
        }`}
        onClick={() => setOpenSubMenu((pre) => !pre)}
      >
        <SidebarItem title={title} nameIcon={nameIcon} className="flex-grow" />
        <Icon nameIcon={IconSubMenu} className="!size-4" />
      </div>
      {subList.length !== 0 && (
        <ul
          className={` flex-col gap-y-4 pr-7 text-sm transition-all ${
            openSubMenu ? "flex" : "hidden"
          }`}
        >
          {subList.map((sub, index) =>
            sub.isShow ? (
              <Link
                href={sub.link}
                className={`${pathname === sub.link && " text-orange-300"}`}
                key={index}
              >
                {sub.title}
              </Link>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
};

export default SidebarSubItem;
