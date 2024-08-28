import Icon from '@/components/modules/Icon/Icon';
import React, { FC } from 'react';

type BoxInfoProps = {
  className?: string;
  nameIcon: string;
  title: string;
  subTitle: string;
};

const BoxInfo: FC<BoxInfoProps> = ({ nameIcon, title, subTitle, className }) => {
  return (
    <div
      className={`flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 p-2 rounded-3xl ${
        className || ''
      }`}>
      <div className="flex-center size-12 md:size-[68px] bg-white/20 rounded-2xl">
        <Icon nameIcon={nameIcon} className="size-8  md:size-9 text-white" />
      </div>
      <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
        <span className="text-xs">{title}</span>
        <span className="font-DanaDemiBold text-sm md:text-lg">{subTitle}</span>
      </div>
    </div>
  );
};

export default BoxInfo;
