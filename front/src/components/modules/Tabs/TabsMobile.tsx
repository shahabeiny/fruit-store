import { FC, useState } from "react";
import TabList from "./TabList";
import { TabModel } from "@/models/TabModel";
import Icon from "../Icon/Icon";
import SectionTitle from "../SectionTitle/SectionTitle";

type TabsProps = {
  className?: string;
  tabDatas: TabModel[];
  getNameTab: (tab: TabModel) => void;
};

const TabMobile: FC<TabsProps> = ({ className, getNameTab, tabDatas }) => {
  const [idCurrent, setIdCurrent] = useState("1");
  const [activeMobile, setActiveMobile] = useState<boolean>(false);

  const handleTabClick = (tab: TabModel) => {
    setIdCurrent(tab.id);
    getNameTab(tab);
  };

  return (
    <>
      <div className="inline-block xs:hidden">
        <SectionTitle
          nameIcon="HiOutlineBarsArrowDown"
          title="فیلتر"
          onClick={() => setActiveMobile(true)}
          className="cursor-pointer font-DanaDemiBold text-teal-600 dark:text-emerald-500 dark:hover:text-emerald-600 hover:text-teal-700 transition-colors"
        />

        <ul
          className={`fixed left-0 right-0 flex-center p-6 overflow-hidden rounded-t-xl shadow-normal
           bg-white dark:bg-zinc-700 z-50 h-56  text-zinc-700 dark:text-white  transition-all ${
             activeMobile ? "bottom-0" : "-bottom-50"
           }`}
        >
          <div className="flex flex-col items-start gap-y-5">
          <TabList
            isShowIcon
            tabDatas={tabDatas}
            handleTabClick={handleTabClick}
            idCurrent={idCurrent}
          />
          </div>
        </ul>
      </div>

      <div
        className={`fixed top-0 right-0 size-full transition-all bg-modal  ${
          activeMobile ? "opacity-100 z-40" : "opacity-0 z-[-1]"
        }`}
        onClick={() => setActiveMobile(false)}
      ></div>
    </>
  );
};

export default TabMobile;
