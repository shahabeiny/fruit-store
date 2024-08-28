import { Metadata } from "next";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import ProductDetailTemplate from "@/components/templates/Shop/ProductDetail/ProductDetailTemplate";

type Props = {
  params: { productSlug: string } 
}

export const generateMetadata = ({params}:Props):Metadata=>{
  let decode = decodeURIComponent(params.productSlug)
  return {
    title: {
      absolute:`محصول ${decode}`
    }
  }
}

const Detail = ({ params }: Props) => {
  return (
    <MainLayout>
      <ProductDetailTemplate productSlug={params.productSlug}/>
    </MainLayout>
  );
};

export default Detail;
