"use client";
import Icon from "@/components/modules/Icon/Icon";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import { useConfirmOrderMutation } from "@/redux/store/order/orderSlice";
import checkPermission from "@/utils/checkPermission";
import { handleWarningSwal } from "@/utils/sweetalert";
import { FC } from "react";

type OrderConfirmProps = {
  orderId: string;
};

const OrderConfirm: FC<OrderConfirmProps> = ({ orderId }) => {
  const [confirmOrder] = useConfirmOrderMutation();
  const userInfo = useAppSelector(selectCurrentUser);

  const handleConfirm = (operate: boolean) => {
    handleWarningSwal(
      () =>
        confirmOrder({
          orderSlug: `activeTab=not_confirmed`,
          orderData: { orderId, operate },
        }),
      `آیا سفارش ${operate ? "تایید" : "کنسل"} شود؟`,
      operate ? "تایید" : "کنسل"
    );
  };

  return (
    <>
      {checkPermission("EDIT_ORDERS", userInfo?.role) ? (
        <div className="flex-x-center justify-between p-2  w-20 md:w-24 border border-teal-600 dark:border-emerald-500 rounded-xl">
          <Icon
            nameIcon="HiOutlineCheck"
            className="text-teal-600 dark:text-emerald-500 dark:hover:text-emerald-600 hover:text-teal-700 transition-colors"
            onClick={() => handleConfirm(true)}
          />
          <Icon
            nameIcon="HiXMark"
            className=" text-pink-500 hover:text-pink-600 dark:dark:text-rose-600 dark:text-rose-500 transition-colors"
            onClick={() => handleConfirm(false)}
          />
        </div>
      ) : null}
    </>
  );
};

export default OrderConfirm;
