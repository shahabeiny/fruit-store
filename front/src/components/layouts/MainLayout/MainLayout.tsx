import ButtonScroll from "@/components/modules/Buttons/ButtonScroll/ButtonScroll";
import Footer from "@/components/modules/Footer/Footer";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/modules/HeaderNavbar/Header"));
const HeaderMobile = dynamic(() => import("@/components/modules/HeaderNavbar/MobileStatus/HeaderMobile"));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <HeaderMobile />
      <ButtonScroll />
      <main className="w-full my-5 md:my-10">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
