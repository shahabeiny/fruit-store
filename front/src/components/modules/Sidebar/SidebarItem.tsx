import React, { FC } from "react";
import Icon from "../Icon/Icon";
import Link from "next/link";

type SidebarItemProps = {
  className?: string;
  link?: string;
  onClick?: () => void;
  nameIcon: string;
  title: string;
};

const SidebarItem: FC<SidebarItemProps> = ({
  className,
  link,
  nameIcon,
  title,
  onClick,
}) => {

  return (
    <>
      {link ? (
        <Link href={link} className={`menu ${className || ""}`}>
          <Icon nameIcon={nameIcon} />
          <span>{title}</span>
        </Link>
      ) : (
        <span className={`menu cursor-pointer ${className || ""}`} onClick={()=>onClick?.()}>
          <Icon nameIcon={nameIcon} />
          <span>{title}</span>
        </span>
      )}
    </>
  );
};

export default SidebarItem;
