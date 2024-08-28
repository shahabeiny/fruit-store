import Icon from "@/components/modules/Icon/Icon";
import { FC } from "react";

type ProductMoreInfoProps = {
  namePro: string;
  desc: string;
};

const ProductMoreInfo: FC<ProductMoreInfoProps> = ({ namePro, desc }) => {
  return (
    <div className="container mb-2.5 md:mb-5">
      <div className="flex flex-col items-start gap-y-8 p-5 rounded-2xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-normal">
        <h2 className="flex-x-center gap-x-2 md:gap-x-3 font-DanaDemiBold text-orange-300 text-lg md:text-xl">
          <Icon nameIcon="HiOutlineBookOpen" />
          <span>خواص علمی {namePro}</span>
        </h2>
        <p className="text-lg/[32px] md:text-xl/[36px]">{desc}</p>
      </div>
    </div>
  );
};

export default ProductMoreInfo;
