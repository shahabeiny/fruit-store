"use client";
import { useGetInfoProductQuery } from "@/redux/store/product/productSlice";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import ProductDescribe from "./ProductDescribe/ProductDescribe";
import ProductMoreInfo from "./ProductMoreInfo/ProductMoreInfo";
import { FC } from "react";

type Props = {
  productSlug : string
}

const ProductDetail:FC<Props> = ( {productSlug}) => {
  const { data } = useGetInfoProductQuery(productSlug);
  return (
    <>
      <Breadcrumbs
        namePro={data?.product?.name ?? ""}
        catSlug={data?.product.category.slug ?? ""}
        catName={data?.product.category.name ?? ""}
      />
      <ProductDescribe myRate={data?.myRate ?? 0} product={data?.product!} />
      <ProductMoreInfo
        namePro={data?.product?.name ?? ""}
        desc={data?.product?.scientificDesc ?? ""}
      />
      {/* <ProductComments/> */}
    </>
  );
};

export default ProductDetail;
