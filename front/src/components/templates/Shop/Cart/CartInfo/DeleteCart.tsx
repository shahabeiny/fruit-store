"use client"
import Icon from "@/components/modules/Icon/Icon";
import { useDeleteCartMutation } from "@/redux/store/cart/cartSlice";
import React, { FC } from "react";

type DeleteCartProps = {
  sizeIcon: string;
  OrderId: string;
};

const DeleteCart: FC<DeleteCartProps> = ({ OrderId, sizeIcon }) => {
  const [deleteCart] = useDeleteCartMutation();

  const handleDeleteCart = () => deleteCart(OrderId);

  return (
    <Icon
      nameIcon="HiOutlineTrash"
      className={`${sizeIcon} text-red-500`}
      onClick={handleDeleteCart}
    />
  );
};

export default DeleteCart;
