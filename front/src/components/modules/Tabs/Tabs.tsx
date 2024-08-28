"use client";
import { useState, memo, FC } from "react";
import { TabModel } from "@/models/TabModel";
import TabList from "./TabList";

type TabsProps = {
  className?: string;
  tabDatas: TabModel[];
  getNameTab: (tab: TabModel) => void;
};

const Tabs: FC<TabsProps> = ({ className, getNameTab, tabDatas }) => {
  const [idCurrent, setIdCurrent] = useState("1");

  const handleTabClick = (tab: TabModel) => {
    setIdCurrent(tab.id);
    getNameTab(tab);
  };

  return (
    <ul
      className={`hidden xs:inline-flex items-center justify-center py-4 px-6 md:px-8 overflow-hidden bg-white dark:bg-zinc-800 shadow-normal text-center 
        gap-5 md:gap-6 
      rounded-2xl
      ${className || ""}`}
    >
      <TabList
      isShowIcon={false}
        tabDatas={tabDatas}
        handleTabClick={handleTabClick}
        idCurrent={idCurrent}
      />
    </ul>
  );
};

export default memo(Tabs);
