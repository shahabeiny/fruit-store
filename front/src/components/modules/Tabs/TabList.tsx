import { FC } from "react";
import Tab from "./Tab";
import { TabModel } from "@/models/TabModel";

type TabListProps = {
  tabDatas: TabModel[];
  handleTabClick: (tab: TabModel) => void;
  idCurrent: string;
  isShowIcon:boolean
};

const TabList: FC<TabListProps> = ({ tabDatas,isShowIcon, handleTabClick, idCurrent }) => {

  return (
    <>
      {tabDatas.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          isShowIcon={isShowIcon}
          isActive={tab.id === idCurrent}
          onClick={() => handleTabClick(tab)}
        />
      ))}
    </>
  );
};

export default TabList;
