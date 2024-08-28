import { OrderModel } from "@/models/OrderModel";
import OrderItem from "./OrderItem/OrderItem";
import { FC, memo } from "react";
import EmptyOrderSvg from "@/components/modules/Icon/EmptyOrderSvg";
import EmptyList from "@/components/modules/EmptyList/EmptyList";

type OrderListProps = {
  isAdmin: boolean;
  orders: OrderModel[];
};

const OrderList: FC<OrderListProps> = memo(
  ({ orders, isAdmin }) => {
    return (
      <div className="mt-6 space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem order={order} isAdmin={isAdmin} key={order.orderInfo._id}/>)
        ) : (
          <EmptyList component={EmptyOrderSvg} title="سفارشی یافت نشد" />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const prevData = prevProps.orders;
    const nextData = nextProps.orders;
    return prevData === nextData;
  }
);

OrderList.displayName = 'OrderList';
export default OrderList;
