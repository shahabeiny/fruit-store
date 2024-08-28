import { FC } from "react";
import Breadcrumb from "./Breadcrumb";

type BreadcrumbsProps ={
  namePro:string,
  catSlug:string,
  catName:string
}

const Breadcrumbs:FC<BreadcrumbsProps> = ({namePro,catSlug,catName}) => {
  return (
    <div className="container mb-5 md:mb-10">
      <div className="hidden xs:flex items-center h-[50px] bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white rounded-2xl overflow-x-auto overflow-y-hidden shadow-normal">
        <Breadcrumb link="/" nameIcon="HiOutlineHome" />
        <Breadcrumb link="/productlist/all" title="محصولات" />
        <Breadcrumb link={`/productlist/${catSlug}`} title={`انواع ${catName}`} />
        <Breadcrumb  title={namePro} />
      </div>
    </div>
  );
};

export default Breadcrumbs;
