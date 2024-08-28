"use client"

import { memo, FC, lazy, Suspense, useState, useEffect } from 'react';
import { IconBaseProps, IconType } from 'react-icons/lib';
import React from 'react';

type typesPropsIcon = {
  nameIcon: string;
  libIcon?: string;
  onClick?: () => void;
  propsIcon?: IconBaseProps;
  title?: string;
  className?: string;
};

type iconModel = { name: string; lib: string };

const listIcons: iconModel[] = [
  { name: 'HiOutlineTruck', lib: 'hi2' },
  { name: 'HiOutlineHeart', lib: 'hi2' },
  { name: 'HiOutlineShare', lib: 'hi2' },
  { name: 'HiOutlineStar', lib: 'hi2' }
];

const Icon: FC<typesPropsIcon> = ({ nameIcon, libIcon, title, className, propsIcon, onClick }) => {
  const [Iconn, setIcon] = useState<IconType | any>();

  useEffect(() => {
    const loadIcon = async () => {
      const searchIcon =  listIcons.find((icon: iconModel) => icon.name === nameIcon);
      const icon = await import(`react-icons/hi2`).then(m => m[nameIcon]);
      setIcon(() => icon);
    }; loadIcon();
  }, [nameIcon]);
  


  return (
    <div
      className={`size-6 ${className || ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={() => onClick?.()}>
      {/* {title && <span className="tooltip__child">{title}</span>} */}

      {/* <Suspense>
      <IconLazy {...propsIcon} />
      </Suspense> */}
      {Iconn ? <Iconn {...propsIcon} className='size-full' /> : null}
 
    </div>
  );
};

export default memo(Icon);
