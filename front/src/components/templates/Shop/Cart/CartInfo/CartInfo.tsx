"use client";
import CounterDown from "@/components/modules/CounterDown/CounterDown";
import { useCartTotals } from "@/hooks/useCartTotals";
import { OrderInfoModel, OrderProductsModel } from "@/models/OrderModel";
import { convertPrice } from "@/utils/convertPrice";
import React, { FC } from "react";
import DeleteCart from "./DeleteCart";
import FinishCart from "./FinishCart";

type CartInfoProps = {
  className?: string;
  orderInfo: OrderInfoModel | undefined;
  products: OrderProductsModel[];
};

const CartInfo: FC<CartInfoProps> = ({ className, products, orderInfo }) => {
  const { totalPrice, totalCount } = useCartTotals({ products });

  return (
    <>
      <div
        className={`sticky top-4 flex flex-col gap-y-2.5  p-4 lg:p-5 rounded-xl 
        bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-normal ${
          className || ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between">
          <span className="hidden lg:inline-block">قیمت</span>
          <div className="text-teal-600 dark:text-emerald-500 w-full text-center lg:w-auto">
            <span className="font-DanaDemiBold text-base md:text-xl">
              {convertPrice(totalPrice)}
            </span>
            <span className="text-xs md:text-sm tracking-tighter"> تومان</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <span>وزن</span>
          <div className="flex items-center gap-x-1">
            <span>{totalCount}</span>
            <span className="text-xs tracking-tighter">کیلوگرم</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <span>انقضا سبد</span>
          <CounterDown time={orderInfo?.time_cancel ?? ""} />
        </div>
        <div className="flex items-center justify-between gap-x-2 md:gap-x-3">
          <DeleteCart sizeIcon="size-8" OrderId={orderInfo?._id ?? ""} />

          <FinishCart
            orderId={orderInfo?._id ?? ""}
            classNameButton="h-12 w-full rounded-xl mt-2.5"
          />
        </div>
      </div>
    </>
  );
};

export default CartInfo;
