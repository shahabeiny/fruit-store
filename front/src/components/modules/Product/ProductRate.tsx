import React from "react";
import Icon from "../Icon/Icon";

const ProductRate = ({ rates }: { rates: number }) => {
  return (
    <div className="flex items-center text-yellow-400 child:size-4 child:md:size-6 ">
      {new Array(5 - Math.trunc(rates)).fill(undefined).map((_,index) => (
        <Icon
        key={index}
          nameIcon="HiOutlineStar"
          className="text-gray-300 dark:text-gray-400"
        />
      ))}
      {new Array(Math.trunc(rates)).fill(undefined).map((_,index) => (
        <Icon nameIcon="HiOutlineStar" key={index}/>
      ))}
    </div>
  );
};

export default ProductRate;
