import { FC } from "react";
import Offs from "../Off/Off";
import OfferSticky from "../OfferSticky/OfferSticky";
import Button from "../Buttons/Button/Button";
import { ProductWithoutInfoModel } from "@/models/ProductModels";
import Price from "../Price/Price";
import ProductRate from "./ProductRate";
import Image from "next/image";

type ProductProps = {
  product: ProductWithoutInfoModel;
};

const Product: FC<ProductProps> = ({  product }) => {
  return (
    <div className="relative flex flex-col justify-between items-center p-2 md:p-5 rounded-2xl bg-white dark:bg-zinc-700 shadow-normal overflow-hidden">
      {product?.off > 0 && (
        <OfferSticky
          offs={product.off}
          className="top-0 right-0 rounded-bl-lg"
        />
      )}

      <div className="flex flex-col items-center mt-4 w-full">
        {/* image */}
        <div className=" mb-2 md:mb-5 overflow-hidden w-full h-32">
          <Image
            src={`${process.env.API_URL}/${product.banner}`}
            width={146}
            height={112}
            alt={product.name}
            sizes="(max-width: 768px) 112px,auto"
            className="size-28 md:w-auto mx-auto md:hover:scale-110 transition-all"
          />
        </div>
        {/* title */}
        <h3 className=" font-DanaMedium text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-1">
          {product.name}
        </h3>
      </div>

      <div className="flex flex-col items-center justify-between w-full mt-2.5 gap-y-2 md:gap-y-2.5">
        <ProductRate rates={product?.rates ?? 0} />
        {/* price */}
        <div className="flex gap-x-2 md:gap-x-2.5 ">
          <Price
            price={product?.price ?? 0}
            off={product?.off ?? 0}
            classNamePrice="text-base md:text-xl"
          />
          {product?.off > 0 && <Offs price={product.price} />}
        </div>
        <Button
          link={product?.slug && `/detailproduct/${product?.slug ?? ""}/`}
          title="ثبت سفارش"
          className="h-12 w-full xs:w-[180px]"
        />
      </div>
    </div>
  );
};

export default Product;
