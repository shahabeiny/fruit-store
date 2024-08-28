import Icon from "@/components/modules/Icon/Icon";
import {
  useAddToCartMutation,
  useDeleteProductCartMutation,
  useMuinesFromCartMutation,
} from "@/redux/store/cart/cartSlice";
import { FC } from "react";

type CartCountBoxProps = {
  className?: string;
  count: number;
  eachCart: number;
  total: number;
  productId: string;
  productOrderId: string;
};

const CartCountBox: FC<CartCountBoxProps> = ({
  className,
  count,
  eachCart,
  total,
  productId,
  productOrderId,
}) => {
  const [addToCart] = useAddToCartMutation();
  const [muinesFromCart] = useMuinesFromCartMutation();
  const [deleteProductCart] = useDeleteProductCartMutation();

  const onAddCart = () => {
    addToCart({
      cartData: {
        productId,
      },
      kindPage: "CART",
    });
  };

  const onMuinesCart = () => {
    muinesFromCart({
      productId,
      productOrderId,
    });
  };

  const onDeleteProduct = () => {
    deleteProductCart(productOrderId);
  };

  return (
    <div
      className={`flex items-center justify-between gap-x-2  border border-teal-600 dark:border-emerald-500 h-10 w-40 px-2 rounded-xl text-xl  child:text-teal-600 child:dark:text-emerald-500 child:dark:hover:text-emerald-600 child:hover:text-teal-700 transition-colors ${
        className || ""
      }`}
    >
      {count < eachCart && total !== 0 ? (
        <Icon
          nameIcon="HiMiniPlusSmall"
          className="!size-5 cursor-pointer shrink-0"
          onClick={onAddCart}
        />
      ) : (
        <span className="font-DanaDemiBold text-sm">حداکثر</span>
      )}

      <div className="flex items-center gap-x-1">
        <span>{count}</span>
        <span className="text-xs tracking-tighter">کیلوگرم</span>
      </div>

      {count > 1 ? (
        <Icon
          nameIcon="HiMiniMinusSmall"
          className="!size-5 cursor-pointer shrink-0"
          onClick={onMuinesCart}
        />
      ) : (
        <Icon
          nameIcon="HiOutlineTrash"
          className="!size-5 cursor-pointer shrink-0 !text-red-500"
          onClick={onDeleteProduct}
        />
      )}
    </div>
  );
};

export default CartCountBox;
