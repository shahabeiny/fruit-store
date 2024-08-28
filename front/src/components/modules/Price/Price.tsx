import { convertPrice, convertPriceWithOffs } from "@/utils/convertPrice";
import { FC } from "react";

type PriceProps = {
  off: number;
  price: number;
  classNamePrice?: string;
};

const Price: FC<PriceProps> = ({ price, off, classNamePrice }) => {
  const newPrice =
    off > 0 ? convertPriceWithOffs(price, off) : convertPrice(price);
  return (
    <div className="text-teal-600 dark:text-emerald-500">
      <span
        className={`font-DanaDemiBold text-base md:text-xl ${
          classNamePrice || ""
        }`}
      >
        {newPrice}
      </span>
      <span className="text-xs md:text-sm tracking-tighter"> تومان</span>
    </div>
  );
};

export default Price;
