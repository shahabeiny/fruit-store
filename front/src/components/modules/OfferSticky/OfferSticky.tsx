import {FC} from 'react';

type OfferStickProps = {
  offs:number,
  className?:string
}

const OfferSticky:FC<OfferStickProps> = ({offs,className}) => {
  return (
    <span className={`absolute flex-shrink-0 block h-5 md:h-[30px] px-2.5 md:px-3 bg-orange-300  font-DanaDemiBold tex-xs/[24px] md:text-base/[34px] text-white dark:text-zinc-700 z-5 ${className || ''}`}>
      {offs}%
    </span>
  );
};

export default OfferSticky;
