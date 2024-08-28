"use client";
import BoxInfo from "@/components/templates/Panel/Main/BoxInfo";
import OrderList from "@/components/templates/Panel/Orders/OrderList";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import { useGetDashboardQuery } from "@/redux/store/home/homeSlice";
import checkPermission from "@/utils/checkPermission";
import { convertPrice } from "@/utils/convertPrice";
import React from "react";

const Main = () => {
  const {
    data: {
      notConfirmedOrder = [],
      totalPriceOrder=0,
      notConfirmedOrderCount=0,
    } = {},
  } = useGetDashboardQuery();
  
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <div className="flex flex-wrap gap-y-4 gap-x-2 md:gap-x-4 lg:gap-x-3 mb-10">
        <BoxInfo
          nameIcon="HiOutlineClipboardDocumentList"
          title="سفارشات تایید نشده"
          className="bg-pink-500 dark:bg-rose-500"
          subTitle={`${notConfirmedOrderCount} سفارش`}
        />
        <BoxInfo
          nameIcon="HiOutlineChatBubbleOvalLeft"
          title="کامنت های تایید نشده"
          className="bg-amber-400 dark:bg-yellow-400"
          subTitle="0 کامنت"
        />
        <BoxInfo
          nameIcon="HiOutlineBanknotes"
          title="مبلغ کل سفارشات"
          className="bg-sky-500 dark:bg-sky-400"
          subTitle={`${convertPrice(totalPriceOrder ?? 0)} تومان`}
        />
      </div>

      <div>
        <div>
          <div className="flex justify-between items-center bg-white dark:bg-zinc-800 px-3.5 py-2.5 md:p-4.5 mb-4 md:mb-5 rounded-2xl shadow-normal">
            <span className="font-DanaDemiBold md:text-xl text-zinc-700 dark:text-white">
              آخرین سفارشات
            </span>
          </div>
          <OrderList
            orders={notConfirmedOrder}
            isAdmin={checkPermission("EDIT_ORDERS", user?.role)}
          />
        </div>

        <div>
          <div className="bg-white dark:bg-zinc-800 p-3.5 md:p-4.5 rounded-2xl mt-7">
            <div className="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-slate-500">
              <span className="font-DanaDemiBold md:text-xl text-zinc-700 dark:text-white">
                کامنت های اخیر
              </span>
            </div>
            <div className="flex-center">
              <span className="text-lg">کامنتی یافت نشد</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
