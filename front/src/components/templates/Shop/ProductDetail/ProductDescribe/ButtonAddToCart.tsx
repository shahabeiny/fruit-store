"use client";
import Button from "@/components/modules/Buttons/Button/Button";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentToken } from "@/redux/store/auth/authSlice";
import { useAddToCartMutation } from "@/redux/store/cart/cartSlice";
import { showToast } from "@/utils/tostifyalert";
import React, { useState } from "react";

const ButtonAddToCart = ({ productId }: { productId: string }) => {
  const [isAddCart, setIsAddCart] = useState(false);
  const [addToCart] = useAddToCartMutation();
  const token = useAppSelector(selectCurrentToken);

  const handleAddToCart = async () => {
    if (token) {
      setIsAddCart(true);
      try {
        await addToCart({
          cartData: {
            productId,
          },
          kindPage: "DETAIL",
        }).unwrap();
      } catch (err) {
      } finally {
        setIsAddCart(false);
      }
    } else {
      showToast("برای دادن سفارش باید وارد شوید", "error");
    }
  };
  return (
    <Button
      title={isAddCart ? "در حال ثبت..." : "افزودن به سبد"}
      onClick={handleAddToCart}
      disabled={isAddCart}
      className="h-12 w-[65%] xs:w-[144px]"
    />
  );
};

export default ButtonAddToCart;
