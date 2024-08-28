"use client";
import { FC, useTransition } from "react";
import styles from "./Tab.module.css";
import Icon from "../Icon/Icon";
import { TabModel } from "@/models/TabModel";

type TabProps = {
  tab: TabModel;
  isActive: boolean;
  isShowIcon: boolean;
  onClick?: () => void;
};

const Tab: FC<TabProps> = ({ tab, isShowIcon, isActive, onClick }) => {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(() => {
      onClick?.();
    });
  };

  if (isPending) {
    return <span className="text-sm">لودینگ...</span>;
  }

  return (
    <li
      className={`flex-x-center gap-x-2 ${styles.tab} ${
        isActive && styles.tab__active
      }`}
      onClick={handleClick}
    >
      {isShowIcon && (
        <Icon
          nameIcon={tab.icon}
          className={` !size-5 ${
            isActive ? "text-orange-300" : "text-slate-500 dark:!text-white"
          }`}
        />
      )}

      <span
        className={`font-DanaMedium text-base ${styles.tab} ${
          isActive
            ? "text-orange-300 text-lg font-DanaDemiBold"
            : "text-slate-500 dark:text-white"
        }`}
      >
        {tab.name}
      </span>
    </li>
  );
};

export default Tab;
