import OfferSticky from "@/components/modules/OfferSticky/OfferSticky";
import Offs from "@/components/modules/Off/Off";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import Icon from "@/components/modules/Icon/Icon";
import { ProductModel } from "@/models/ProductModels";
import { FC } from "react";
import Price from "@/components/modules/Price/Price";
import RatingStar from "../RatingStar/RatingStar";
import ButtonAddToCart from "./ButtonAddToCart";
import Image from "next/image";

type ProductDescribeProps = {
  myRate: number;
  product: ProductModel;
};

const ProductDescribe: FC<ProductDescribeProps> = ({ myRate, product }) => {
  return (
    <div className="container mb-2.5 md:mb-5">
      <div className="relative flex items-start flex-wrap sm:flex-nowrap gap-y-4 gap-x-3.5 xl:gap-x-5  p-5  rounded-2xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-normal overflow-hidden">
        {/* offer */}

        {product?.off > 0 && (
          <OfferSticky
            offs={product.off}
            className="top-0 left-0 rounded-br-lg"
          />
        )}
        {/* section right */}
        <div className="basis-[100%] sm:basis-[35%] md:basis-[30%] relative text-zinc-700 dark:text-white pr-4">
          {/* <Icon nameIcon="HiOutlineHeart" className="absolute top-10 right-0" /> */}
          <Icon nameIcon="HiOutlineShare" className="absolute top-0 right-0" />
          {/* image */}
          <div className="flex-center">
          <Image
              width={900}
              height={450}
              src={
                (product?.banner &&
                  `${process.env.API_URL}/${product?.banner}`) ??
                ""
              }
              alt={product?.name}
              sizes="(max-width: 640px) 128px ,(max-width: 768px) 160px,(max-width: 1024px) 176px,240px"
              className="size-32 sm:size-40 md:size-44 lg:size-60"
            />
          </div>
        </div>
        {/* section left */}
        <div className="basis-[100%] sm:basis-[65%] md:basis-[70%]">
          <div className="flex flex-col justify-between gap-y-4">
            <div>
              {/* title */}
              <h5 className="font-DanaDemiBold text-center sm:text-start text-lg md:text-xl line-clamp-1">
                {product?.name}
              </h5>
              {/* stars */}
              <RatingStar
                value={myRate}
                id={product?._id ?? ""}
                className="mt-3 md:mt-3.5 md:2.5"
              />

              {/* </div> */}
              {/* decribe */}
              <p className="font-DanaMedium text-lg md:text-xl/[38px] mt-3 md:mt-3.5 md:2.5">
                {product?.desc}
              </p>
            </div>
            <SectionTitle
              title="ارسال سریع از انبار"
              nameIcon={"HiOutlineTruck"}
              className="tracking-tightest"
              iconClassName="text-orange-300"
            />
            <div className="flex items-end justify-between flex-wrap gap-x-2 sx:gap-x-3">
              {/* counter */}
              {/* <div className="flex-x-center gap-x-3">
                <span className="hidden md:inline-block">چند کیلو می خوای؟</span>
                <Counter />
              </div> */}

              <div className="flex items-end justify-end gap-2  w-full mt-3.5   sx:mt-0">
                {/* price & offerPrice */}
                <div className="flex flex-col items-center gap-x-2 md:gap-x-2.5 ">
                  <Price
                    price={product?.price ?? 0}
                    off={product?.off ?? 0}
                    classNamePrice="text-base md:text-xl"
                  />
                  {product?.off > 0 && <Offs price={product.price} />}
                </div>

                {/* submitOrder */}
                <ButtonAddToCart productId={product?._id ?? ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescribe;
