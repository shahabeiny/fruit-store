import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import Banner from "@/components/modules/Banner/Banner";
import ProductList from "@/components/templates/Shop/ProductList/ProductList";
import { Metadata } from "next";

type Props = {
  params: { categorySlug: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  let kindCat =
    params.categorySlug !== "all"
      ? decodeURIComponent(params.categorySlug)
      : "";

  return {
    title: {
      absolute: `لیست محصولات ${kindCat}`,
    },
  };
};

const ProductListPage = async ({ params }: Props) => {
  let getDatas = await fetch(
    `${process.env.API_URL}/api/product-router/products-category/${params.categorySlug}`,
    {
      next: { revalidate: 60 },
    }
  );
  let convertData = (await getDatas.json()).data;

  return (
    <MainLayout>
      {convertData.category && (
        <Banner
          title={`انواع ${convertData.category.name}`}
          subTitle={convertData.category.subName}
          bannerImg={convertData.category.banner}
          className=" mb-10 md:mb-20 mx-auto w-[94%] h-[180px] md:h-[280px]"
        />
      )}

      <ProductList products={convertData.products} />
    </MainLayout>
  );
};

export default ProductListPage;
