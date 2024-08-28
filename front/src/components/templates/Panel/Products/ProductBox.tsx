import Icon from "@/components/modules/Icon/Icon";
import Offs from "@/components/modules/Off/Off";
import OfferSticky from "@/components/modules/OfferSticky/OfferSticky";
import Price from "@/components/modules/Price/Price";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import { useAppSelector } from "@/hooks/useReduxhook";
import { ProductModel } from "@/models/ProductModels";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import checkPermission from "@/utils/checkPermission";
import Image from "next/image";
import React, { FC } from "react";

type ProductBoxProps = {
  product: ProductModel;
  onEdit?: () => void;
  onDelete?: () => void;
};

const ProductBox: FC<ProductBoxProps> = ({ product, onEdit }) => {
  const userInfo = useAppSelector(selectCurrentUser);
  return (
    <div className="relative flex flex-col  items-center gap-y-4  p-5 rounded-2xl bg-white dark:bg-zinc-800 shadow-normal overflow-hidden">
      {product.off > 0 && (
        <OfferSticky
          offs={product.off}
          className="top-0 right-0 rounded-bl-lg"
        />
      )}
      {checkPermission("EDIT_PRODUCTS", userInfo?.role) && (
        <Icon
          nameIcon="HiOutlinePencilSquare"
          className="absolute top-4 left-3 text-sky-500 dark:text-sky-400 !size-5"
          onClick={() => onEdit?.()}
        />
      )}
      <div className="flex flex-col items-center mt-4 w-full">
        {/* image */}
        <div className="overflow-hidden w-full h-32">
          <Image
          src={`${process.env.API_URL}/${product.banner}`}
          width={100}
          height={100}
            alt={product.name}
            className="size-28 md:w-auto mx-auto md:hover:scale-110 transition-all"
          />
        </div>
        {/* title */}
        <h5 className="mt-2 font-DanaMedium text-sm sx:text-xl text-zinc-700 dark:text-white line-clamp-1">
          {product.name}
        </h5>
      </div>

      <div className="flex flex-col justify-between w-full mt-2.5 gap-y-2.5 text-zinc-700 dark:text-white">
        <div className="flex-x-center gap-x-1">
          <SectionTitle
            nameIcon="HiOutlineWallet"
            title="موجودی محصول:"
            iconClassName="!size-5"
            className=" !gap-x-2 "
          />
          <span> {product.total}کیلو </span>
        </div>
        <div className="flex-x-center gap-x-1">
          <SectionTitle
            nameIcon="HiOutlineShoppingCart"
            title="مجاز برای هر سبد:"
            iconClassName="!size-5"
            className="!gap-x-2"
          />
          <span> {product.eachCart}کیلو </span>
        </div>
        <div className="flex-x-center gap-x-1">
          <SectionTitle
            nameIcon="HiOutlineLockClosed"
            title="فریز شده:"
            iconClassName="!size-5"
            className="!gap-x-2"
          />
          <span>{product.frozen}کیلو</span>
        </div>
        <div className="flex-x-center gap-x-1">
          <SectionTitle
            nameIcon="HiOutlineTag"
            title="فروخته شده:"
            iconClassName="!size-5"
            className="!gap-x-2"
          />
          <span>{product.sold}کیلو</span>
        </div>
        {/* price */}
        <div className="flex gap-x-2 md:gap-x-2.5 ">
          <Icon nameIcon="HiOutlineCurrencyDollar" />
          <div className="flex items-start flex-col ">
            <Price
              price={product.price}
              off={product.off}
              classNamePrice="text-base md:text-xl"
            />
            {product.off > 0 && <Offs price={product.price} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
