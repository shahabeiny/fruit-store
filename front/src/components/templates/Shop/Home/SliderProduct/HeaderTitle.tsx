import Link from 'next/link';
import { FC } from 'react';
import { GoChevronLeft } from 'react-icons/go';


type HeaderTitleProps = {
  title: string;
  subTitle?: string;  linkAll?:string,
};

const HeaderTitle: FC<HeaderTitleProps> = ({ title, subTitle,linkAll }) => {
  return (
    <div className="flex items-end justify-between mb-5 md:mb-12">
      <div>
        <h3 className="text-2xl md:text-5xl font-MorabbaMedium text-zinc-700 dark:text-white">
          {title}
        </h3>
        {subTitle && (
          <span className="text-lg md:text-3xl font-MorabbaLight text-zinc-700 dark:text-white mt-0.5 md:mt-1.5 inline-block">
            {subTitle}
          </span>
        )}
      </div>
      {
        linkAll && (<Link
          href="/productlist/all"
          className="flex items-center md:gap-x-1 text-base md:text-xl h-10 pr-3 pl-1 rounded-md text-orange-300 md:hover:bg-orange-300/20 transition-colors tracking-tightest">
          <span className="hidden md:inline-block">مشاهده همه محصولات</span>
          <span className='inline-block md:hidden'>مشاهده همه</span>
  
          <GoChevronLeft className="size-5" />
        </Link>)
      }
    </div>
  );
};

export default HeaderTitle;
