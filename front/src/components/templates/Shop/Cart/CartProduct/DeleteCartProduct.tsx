import Icon from "@/components/modules/Icon/Icon";
import { useDeleteProductCartMutation } from "@/redux/store/cart/cartSlice";
import React from "react";

const DeleteCartProduct = ({ productOrderId }: { productOrderId: string }) => {
  const [deleteProductCart] = useDeleteProductCartMutation();

  const onDeleteProduct = () => deleteProductCart(productOrderId);

  return (
    <>
      <div className="hidden md:block absolute top-1.5 left-1 group">
        <Icon
          nameIcon="HiOutlineEllipsisVertical"
          className="size-2 text-red-500"
        />
        <div
          className="absolute top-full left-2.5 w-40 flex flex-col items-start gap-y-4
      p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible border-t-[3px] z-5
    border-t-red-500 text-zinc-700 dark:text-white bg-white dark:bg-zinc-800 tracking-normal text-base  rounded-xl shadow-normal transition-all delay-75 child:transition-colors child-hover:text-red-500 "
        >
          <span onClick={onDeleteProduct} className="cursor-pointer">حذف محصول</span>
        </div>
      </div>

      <Icon
        nameIcon="HiOutlineTrash"
        className="!size-5 cursor-pointer shrink-0 text-red-500 absolute top-1.5 left-1 inline-block md:hidden"
        onClick={onDeleteProduct}
      />
    </>
  );
};

export default DeleteCartProduct;
