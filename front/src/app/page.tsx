import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import MainBanner from "@/components/templates/Shop/Home/MainBanner/MainBanner";
import Services from "@/components/templates/Shop/Home/Services/Services";
import dynamic from "next/dynamic";

const SliderProduct = dynamic(() => import("@/components/templates/Shop/Home/SliderProduct/SliderProduct"));
const CategoriosBanner = dynamic(() => import("@/components/templates/Shop/Home/CategoryBanner/CategoryBanner"));
const AboutUs = dynamic(() => import("@/components/templates/Shop/Home/AboutUs/AboutUs"));
const JoinUs = dynamic(() => import("@/components/templates/Shop/Home/JoinUs/JoinUs"));

  const HomePage=async ()=> {
  let getDatas = await fetch(`${process.env.API_URL}/api/home-router/main`, {
    next: { revalidate: 120 },
  });
  let convertData = (await getDatas.json()).data;

  return (
    <MainLayout>
      <MainBanner/>
      <Services />
      <SliderProduct
        title="جدیدترین محصولات"
        subTitle="تهیه شده از بهترین مزاع"
        products={convertData.newest}
               linkAll="/productlist/all"
      />
      <CategoriosBanner categories={convertData.categories}/>
      <SliderProduct
        title="پرفروش ترین محصولات"
        products={convertData.sellingProducts}
      />
      <JoinUs />
      <AboutUs />
    </MainLayout>
  );
}

export default HomePage;