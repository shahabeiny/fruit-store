import {FC} from "react";
import Banner from "@/components/modules/Banner/Banner";
import { CategoryModel } from "@/models/CategoryModel";

type CategoriosBannerProps = {
  categories : CategoryModel[]
}

const CategoriosBanner:FC<CategoriosBannerProps> = ({categories}) => {
  
  return (
    <section className="mb-10 md:mb-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
          {
            categories?.
              slice(0, 2)
              ?.map((cat: CategoryModel) => (
                <Banner
                  key={cat._id}
                  title={`انواع ${cat.name}`}
                  subTitle={cat.subName}
                  bannerImg={cat.banner}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriosBanner;
