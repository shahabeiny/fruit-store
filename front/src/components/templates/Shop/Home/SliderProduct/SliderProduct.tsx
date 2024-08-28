"use client";
import React, { FC } from "react";
import HeaderTitle from "./HeaderTitle";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductModel } from "@/models/ProductModels";
import Product from "@/components/modules/Product/Product";

type SliderProductProps = {
  title: string;
  subTitle?: string;
  products: ProductModel[];
};

const SliderProduct: FC<SliderProductProps> = ({
  title,
  subTitle,
  products,linkAll
}) => {

  return (
    <div className="container mb-10 md:mb-20">
      <HeaderTitle title={title} subTitle={subTitle} linkAll={linkAll}/>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        grabCursor={true}
        dir="rtl"
        slidesPerView="auto"
        pagination={{ el: ".swiper-pagination", clickable: true }}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        // className='w-full'
      >
        {products?.map((product) => (
          <SwiperSlide
            className="max-w-[303px] space-x-1 overflow-hidden rounded-2xl"
            key={product._id}
          >
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderProduct;
