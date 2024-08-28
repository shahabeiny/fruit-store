"use client";
import { FinishOrderModel } from "@/models/OrderModel";
import { FC, useState } from "react";
import CartModal from "./CartModal/CartModal";
import { useFinishCartMutation } from "@/redux/store/cart/cartSlice";
import Button from "@/components/modules/Buttons/Button/Button";
import { useAppSelector } from "@/hooks/useReduxhook";

type FinishCartProps = {
  classNameButton?: string;
  orderId: string;
};

const FinishCart: FC<FinishCartProps> = ({ classNameButton, orderId }) => {
  const [showModal, setShowModal] = useState(false);
  const [editProfile] = useFinishCartMutation();
  const { user } = useAppSelector((state) => state.auth);

  const handleForm = async (formData: FinishOrderModel) => {
    try {
      const result = await editProfile(formData).unwrap();
      setShowModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Button
        className={classNameButton}
        title="تکمیل سفارش"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <CartModal
          onHide={() => setShowModal(false)}
          onSubmit={handleForm}
          init={{
            name: user?.name ?? "",
            family: user?.family ?? "",
            address: user?.address ?? "",
            orderId: orderId ?? "",
          }}
        />
      )}
    </>
  );
};

export default FinishCart;
