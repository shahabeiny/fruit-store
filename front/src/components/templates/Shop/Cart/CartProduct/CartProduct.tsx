import OfferSticky from "@/components/modules/OfferSticky/OfferSticky";
import CartCountBox from "../../../../modules/CartCountBox/CartCountBox";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import Offs from "@/components/modules/Off/Off";
import { FC } from "react";
import { OrderProductsModel } from "@/models/OrderModel";
import DeleteCartProduct from "./DeleteCartProduct";
import { convertPrice, totalConvertPrice } from "@/utils/convertPrice";
import Price from "@/components/modules/Price/Price";
import Image from "next/image";

type CartProductProps = {
  productCart: OrderProductsModel;
};

const CartProduct: FC<CartProductProps> = ({ productCart }) => {
  return (
    <div className="relative basis-full sm:basis-[65%] flex flex-col items-center gap-y-4 xs:flex-row xs:items-start gap-x-4.5 lg:gap-x-6 xl:gap-x-8 p-5 rounded-2xl overflow-hidden  bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-normal">
      {productCart?.product?.off > 0 && (
        <OfferSticky
          offs={productCart.product.off}
          className="top-0 right-0 rounded-bl-lg"
        />
      )}
      {/* menu delete */}
      <DeleteCartProduct productOrderId={productCart._id} />
      {/* section right */}
      <div className="flex flex-col items-center justify-between gap-y-4.5 md:gap-y-5">
        <div>

           <Image
            src={`${process.env.API_URL}/${productCart.product.banner}`}
            width={900}
            height={450}
            alt={productCart.product.name}
            className="size-20 md:size-32"
          />
        </div>
        <CartCountBox
          className="h-10 w-36 md:w-40"
          count={productCart.count}
          eachCart={productCart.product.eachCart}
          total={productCart.product.total}
          productId={productCart.product._id}
          productOrderId={productCart._id}
        />
      </div>
      {/* section left */}
      <div className="flex flex-col w-full items-start justify-between gap-y-4.5 md:gap-y-5">
        {/* section left --> top */}
        <h3 className="font-DanaDemiBold text-lg lg:text-xl line-clamp-2">
          {productCart.product.name}
        </h3>
        {/* section left --> mid */}
        <div className="space-y-3 ">
          <SectionTitle
            title="تازه و ارگانیک"
            nameIcon="HiArrowPathRoundedSquare"
            className="text-sm lg:text-basis"
          />
          <SectionTitle
            title="کیفیت تضمین شده"
            nameIcon="HiOutlineCheckBadge"
            className="text-sm lg:text-basis"
          />
          <SectionTitle
            title="ارسال سریع از انبار"
            nameIcon={"HiOutlineTruck"}
            className="text-sm lg:text-basis"
          />
        </div>
        {/* section left --> bottom */}
        <div>
          <div className="flex gap-x-2 items-end text-end xs:items-start md:gap-x-2.5">
            <span>قیمت:</span>

            <Price
              price={productCart.product.price}
              off={productCart.product.off}
              classNamePrice="text-base md:text-lg"
            />
            {productCart.product.off > 0 && (
              <Offs price={productCart.product.price} />
            )}
          </div>
          <div className="flex gap-x-2 items-end text-end xs:items-start md:gap-x-2.5 mt-2">
            <span>قیمت نهایی:</span>
            <div className="text-teal-600 dark:text-emerald-500">
              <span className="font-DanaDemiBold text-base md:text-lg">
                {convertPrice(totalConvertPrice(
                  productCart.product.price,
                  productCart.product.off,
                  productCart.count
                ))}
              </span>
              <span className="text-xs md:text-sm tracking-tighter">
                {" "}
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
