"use client";
import Tabs from "@/components/modules/Tabs/Tabs";
import TabMobile from "@/components/modules/Tabs/TabsMobile";
import OrderList from "@/components/templates/Panel/Orders/OrderList";
import { tabOrderDatas } from "@/datas/tabData";
import { TabModel } from "@/models/TabModel";
import {useGetOrdersByUserQuery } from "@/redux/store/order/orderSlice";
import { useState, useEffect } from "react";

const OrderMe = () => {
  const [tab, setTab] = useState<TabModel>(tabOrderDatas[0]);
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useGetOrdersByUserQuery(`activeTab=${tab.nameEng}`);

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
      <OrderList orders={orders} isAdmin={false}/>
    </>
  );
};

export default OrderMe;
