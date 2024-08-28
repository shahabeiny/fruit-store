import { OrderProductsModel } from "@/models/OrderModel";
import { convertPrice } from "@/utils/convertPrice";
import Image from "next/image";
import { FC } from "react";

type OrderBodyProps = {
  orderProduct: OrderProductsModel;
};

const OrderBody: FC<OrderBodyProps> = ({ orderProduct }) => {
  return (
    <div className="flex-center flex-col  gap-x-2 w-full bg-gray-100 dark:bg-zinc-700 py-6 px-4 rounded-xl">
      <div className="mb-2 relative">
        <Image
          src={`${process.env.API_URL}/${orderProduct.product.banner}`}
          width={100}
          height={100}
          alt="name shoe"
          className="size-14 md:w-16 "
        />
        <span className="absolute -bottom-0 -left-0 flex-center size-auto p-1 rounded-full bg-gray-100 dark:bg-zinc-700 text-xs text-ltr">
          {orderProduct.count} kg
        </span>
      </div>
      <div className="flex flex-col child:text-center  gap-y-3">
        <h3 className="font-DanaDemiBold text-lg z-5">
          {orderProduct.product.name}
        </h3>
        <div className="flex flex-col items-start gap-y-1.5 text-base">
          <span>
            تخفیف: {orderProduct.off > 0 ? orderProduct.off + "%" : "ندارد"}
          </span>
          <span>
            قیمت نهایی:{" "}
            {convertPrice((orderProduct?.finalPrice ?? 0) * orderProduct.count)}{" "}
            تومان
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderBody;
