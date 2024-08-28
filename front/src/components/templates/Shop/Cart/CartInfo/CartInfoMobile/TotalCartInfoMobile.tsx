"use client";
import { useCartTotals } from "@/hooks/useCartTotals";
import { OrderProductsModel } from "@/models/OrderModel";
import { convertPrice } from "@/utils/convertPrice";
import { FC } from "react";

type CartInfoProps = {
  products: OrderProductsModel[];
};

const TotalCartInfoMobile: FC<CartInfoProps> = ({ products }) => {
  const { totalPrice, totalCount } = useCartTotals({ products });
  return (
    <div className="flex flex-col items-center gap-y-0.5">
      <div className="text-teal-600 dark:text-emerald-500">
        <span className="font-DanaDemiBold text-base md:text-xl">
          {convertPrice(totalPrice)}
        </span>
        <span className="text-xs md:text-sm tracking-tighter"> تومان</span>
      </div>
      <div className="hidden md:flex items-center gap-x-1 ">
        <span>{totalCount}</span>
        <span className="text-xs tracking-tighter">کیلوگرم</span>
      </div>
    </div>
  );
};

export default TotalCartInfoMobile;
