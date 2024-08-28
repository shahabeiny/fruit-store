import CounterDown from "@/components/modules/CounterDown/CounterDown";
import { OrderInfoModel, OrderProductsModel } from "@/models/OrderModel";
import { FC } from "react";
import TotalCartInfoMobile from "./TotalCartInfoMobile";
import DeleteCart from "../DeleteCart";
import FinishCart from "../FinishCart";

type CartInfoProps = {
  className?: string;
  orderInfo: OrderInfoModel | undefined;
  products: OrderProductsModel[];
};

const CartInfoMobile: FC<CartInfoProps> = ({
  className,
  orderInfo,
  products,
}) => {
  return (
    <div
      className={`fixed bottom-0 right-0 left-0 h-16 px-4 rounded-t-xl flex items-center justify-between gap-y-4 gap-x-3.5 xl:gap-x-5 w-full shadow-normal
      bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white  ${
        className || ""
      }`}
    >
      <TotalCartInfoMobile products={products} />

      <CounterDown
        time={orderInfo?.time_cancel ?? ""}
        className="hidden xs:inline-block"
      />

      <div className="flex-x-center gap-1 xs:gap-2">
        <DeleteCart sizeIcon="!size-6" OrderId={orderInfo?._id ?? ""} />

        <FinishCart
          orderId={orderInfo?._id ?? ""}
          classNameButton="h-12 w-28 xs:w-[140px] rounded-xl"
        />
      </div>
    </div>
  );
};

export default CartInfoMobile;
