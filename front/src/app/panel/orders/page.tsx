"use client";
import Tabs from "@/components/modules/Tabs/Tabs";
import TabMobile from "@/components/modules/Tabs/TabsMobile";
import OrderList from "@/components/templates/Panel/Orders/OrderList";
import { tabOrderDatas } from "@/datas/tabData";
import { TabModel } from "@/models/TabModel";
import { useGetOrdersByAdminQuery } from "@/redux/store/order/orderSlice";
import { useState, useEffect } from "react";

const Orders = () => {
  const [tab, setTab] = useState<TabModel>(tabOrderDatas[0]);
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useGetOrdersByAdminQuery(`activeTab=${tab.nameEng}`);

  useEffect(() => {
    refetch();
  }, [tab, refetch]);

  return (
    <>
      <Tabs
        tabDatas={tabOrderDatas}
        getNameTab={(tabInfo) => setTab(tabInfo)}
      />
      <TabMobile
        tabDatas={tabOrderDatas}
        getNameTab={(tabInfo) => setTab(tabInfo)}
      />
      <OrderList orders={orders} isAdmin/>
    </>
  );
};

export default Orders;
