"use client";
import Sidebar from "@/components/modules/Sidebar/Sidebar";
import HeaderLayoutMobile from "@/components/modules/HeaderPanel/HeaderPanelMobile";
import { useState } from "react";
import Overlay from "@/components/modules/Overlay/Overlay";

const SidebarController = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  return (
    <>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <section className="min-h-screen mx-auto md:mr-[280px] lg:mr-[296px] px-4 pb-2 mb-2 md:mb-0 md:py-4 lg:py-8 lg:px-2 xl:px-4  md:bg-gray-100 md:dark:bg-zinc-700  md:rounded-4xl overflow-hidden w-full shadow-normal md:shadow-none">
        <HeaderLayoutMobile setOpenSidebar={setOpenSidebar} />
        {children}
      </section>

      <Overlay
        className={openSidebar ? "block" : "hidden"}
        onClick={() => setOpenSidebar(false)}
      />
    </>
  );
};

export default SidebarController;
