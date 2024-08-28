"use client";
import React, { useMemo } from "react";
import CartListProducts from "./CartListProducts/CartListProducts";
import CartInfo from "./CartInfo/CartInfo";
import CartInfoMobile from "./CartInfo/CartInfoMobile/CartInfoMobile";
import { useGetCartQuery } from "@/redux/store/cart/cartSlice";
import { pick } from "lodash";

const CartTemplate = () => {
  const { data: { orderInfo, products = [] } = {} } = useGetCartQuery();

  const editProductList = useMemo(() => {
    return products.map((pro) => {
      return {
        ...pro,
        product: pick(pro.product, [
          "_id",
          "name",
          "nameEng",
          "banner",
          "slug",
          "off",
          "total",
          "eachCart",
          "frozen",
          "sold",
          "price",
        ]),
      };
    });
  }, [products]);

  return (
    <div className="flex items-start gap-y-4 gap-x-3.5 xl:gap-x-5 w-full">
      <CartListProducts products={editProductList} />
      { editProductList.length !== 0 ?(
        <>
          <CartInfo
            className="basis-[35%] w-full hidden md:flex"
            orderInfo={orderInfo}
            products={editProductList}
          />
          <CartInfoMobile
            className="flex md:hidden"
            orderInfo={orderInfo}
            products={editProductList}
          />
        </>
      ):null}
    </div>
  );
};

export default CartTemplate;
