import { OrderProductsModel } from "@/models/OrderModel";
import CartProduct from "../CartProduct/CartProduct";
import { FC } from "react";
import EmptyList from "@/components/modules/EmptyList/EmptyList";
import EmptyCartSvg from "@/components/modules/Icon/EmptyCartSvg";

type CartListProductsProps = {
  products: OrderProductsModel[];
};

const CartListProducts: FC<CartListProductsProps> = ({ products }) => {

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <> 
      {products.length > 0 ?products?.map((pro) => (
        <CartProduct productCart={pro} key={pro._id} />
      )):<EmptyList component={EmptyCartSvg} title="محصولی در سبد شما وجود ندارد" />}

      </>
      
    </div>
  );
};

export default CartListProducts;
