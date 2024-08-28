import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import styles from "./OrderItem.module.css";
import { FC } from "react";
import { OrderInfoModel } from "@/models/OrderModel";
import { tabOrderDatas } from "@/datas/tabData";
import { formatDate } from "@/utils/formatDate";
import { convertPrice } from "@/utils/convertPrice";
import OrderItemUserModal from "./OrderItemUserModal";
import OrderConfirm from "./OrderConfirm";

const getOrderData = (statusOrderEng: string) => {
  for (let i = 0; i < tabOrderDatas.length; i++) {
    if (tabOrderDatas[i].nameEng === statusOrderEng) {
      return tabOrderDatas[i];
    }
  }
  return null;
};

type OrderHeaderProps = {
  isAdmin: boolean;
  orderInfo: OrderInfoModel;
  totalPriceOrder: number;
};

const OrderHeader: FC<OrderHeaderProps> = ({
  orderInfo,
  totalPriceOrder,
  isAdmin,
}) => {
  let data = getOrderData(orderInfo.status_delivery);
  return (
    <div className="flex flex-col gap-y-4 w-full pb-4.5 border-b border-b-gray-200 dark:border-b-slate-500">
      <div className="flex-x-center justify-between">
        <SectionTitle
          title={data?.name ?? ""}
          nameIcon={data?.icon ?? ""}
          className="text-lg md:text-xl font-DanaDemiBold"
          iconClassName="text-orange-300 !size-6 md:!size-8"
        />

        {isAdmin && orderInfo.status_delivery === "not_confirmed" && (
          <OrderConfirm orderId={orderInfo._id} />
        )}
      </div>

      <div className="flex flex-wrap gap-y-2">
        <div className={`${styles.order__title} flex-x-center`}>
          <SectionTitle
            title={formatDate(orderInfo.createdAt)}
            className="text-basic md:text-lg"
          />
        </div>
        <div className={`${styles.order__title} flex-x-center`}>
          <SectionTitle
            title={`کد سفارش ${orderInfo.orderID}`}
            className="text-basic md:text-lg"
          />
        </div>
        <div className={`${styles.order__title}  flex-x-center`}>
          <SectionTitle
            title={`مبلغ ${convertPrice(totalPriceOrder)} تومان`}
            className="text-basic md:text-lg"
          />
        </div>
        {isAdmin && (
          <OrderItemUserModal
            className={styles.order__title}
            user={orderInfo.user}
          />
        )}
      </div>
    </div>
  );
};

export default OrderHeader;
