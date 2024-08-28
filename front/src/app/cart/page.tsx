import Header from "@/components/modules/HeaderNavbar/Header";
import CartTemplate from "@/components/templates/Shop/Cart/CartTemplate";
import React from "react";


export const metadata = {
  title: "سبد خرید",
};

const CartPage = () => {
  return (
    <>
      <Header />
      <main className="my-5 md:my-10">
        <div className="container">
          <CartTemplate />
        </div>
      </main>
    </>
  );
};

export default CartPage;
