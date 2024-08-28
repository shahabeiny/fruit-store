import HeaderLayout from "@/components/modules/HeaderPanel/HeaderPanel";
import SidebarController from "./SidebarController";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white dark:bg-zinc-800 flex gap-x-10  md:pl-6 lg:pl-10 md:py-8 w-full">
      <SidebarController>
        <div className=" py-4  h-full  md:py-0 bg-gray-100 dark:bg-zinc-700 rounded-2xl ">
          <div className="container">
            <HeaderLayout />

            {children}
          </div>

          <div className="db-overlay invisible opacity-0 fixed w-full h-full top-0 left-0 bg-black/40 z-20 transition-all"></div>
        </div>
      </SidebarController>
    </main>
  );
};

export default PanelLayout;
