"use client"
import Tabs from '@/components/modules/Tabs/Tabs';
import { tabOrderDatas } from '@/datas/tabData';
import { OrderModel } from '@/models/OrderModel';
import { TabModel } from '@/models/TabModel';
import { useGetOrdersByAdminQuery } from '@/redux/store/order/orderSlice';
import React, { useEffect, useState,FC } from 'react'


const OrderTab = () => {
  const [tab, setTab] = useState<TabModel>(tabOrderDatas[0]);

  const {
    data: orders = [],
    refetch,
    isLoading
  } = useGetOrdersByAdminQuery(`activeTab=${tab.nameEng}`);

  useEffect(() => {
    refetch();
  }, [tab]);

  
  
  return (
    <Tabs
    className="order__tab"
    tabDatas={tabOrderDatas}
    getNameTab={(tabInfo) => setTab(tabInfo)}
  />
  )
}

export default OrderTab