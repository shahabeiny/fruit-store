"use client";
import { FC } from "react";
import ButtonCircle from "../ButtonCircle/ButtonCircle";
import Icon from "../../Icon/Icon";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import checkPermission from "@/utils/checkPermission";

type ButtonAddCategoryProps = {
  onClick?: () => void;
  className?: string;
  isCenter?: boolean;
  nameIcon: string;
  title: string;
  permission: string;
};

const ButtonAddCategory: FC<ButtonAddCategoryProps> = ({
  title,
  nameIcon,
  isCenter = true,
  className,
  permission,
  onClick,
}) => {
  const userInfo = useAppSelector(selectCurrentUser);
  return (
    <>
      {checkPermission(permission, userInfo?.role) ? (
        <div className={isCenter ? "flex-center" : ""}>
          <div
            className={`hidden md:inline-flex items-center gap-x-2  text-xl text-zinc-700 dark:text-white  bg-orange-200 
    hover:bg-orange-300 dark:bg-zinc-800 dark:hover:bg-zinc-900 rounded-xl px-4 py-3 transition-colorsf cursor-pointer ${className}`}
            onClick={() => onClick?.()}
          >
            <Icon nameIcon={nameIcon} />
            <span className="box-value__title">{title}</span>
          </div>
          <ButtonCircle
            nameIcon={nameIcon}
            className="left-6 md:hidden size-12 bg-orange-300 dark:bg-zinc-900 text-white"
            onClick={() => onClick?.()}
          />
        </div>
      ) : null}
    </>
  );
};

export default ButtonAddCategory;
