import { OrderModel, OrderProductsModel } from "@/models/OrderModel";
import React, { FC, memo } from "react";
import OrderHeader from "./OrderHeader/OrderHeader";
import OrderBody from "./OrderBody/OrderBody";

const calculateTotalPrice = (products: OrderProductsModel[]) => {
  let totalPrice = 0;

  for (const productCart of products) {
    totalPrice += (productCart?.finalPrice ?? 0) * productCart.count;
  }
  return totalPrice;
};

type OrderItemProps = {
  className?: string;
  order: OrderModel;
  isAdmin: boolean;
};

const OrderItem: FC<OrderItemProps> = memo(
  ({ order, isAdmin }) => {
    return (
      <section className="flex flex-col items-start gap-y-4  p-5 rounded-2xl overflow-hidden  bg-white dark:dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-normal w-full">
        <OrderHeader
          orderInfo={order.orderInfo}
          totalPriceOrder={calculateTotalPrice(order.products)}
          isAdmin={isAdmin}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2 w-full">
          {order?.products.map((orderProduct) => (
            <OrderBody orderProduct={orderProduct} key={orderProduct._id}/>
          ))}
        </div>
      </section>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.order.orderInfo._id === nextProps.order.orderInfo._id;
  }
);
OrderItem.displayName = 'OrderItem';
export default OrderItem;
