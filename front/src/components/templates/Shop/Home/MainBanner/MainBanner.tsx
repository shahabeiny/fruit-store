import React from "react";

const MainBanner = () => {
  return (
    <section
    style={{
      background: `100%,url(/images/firstbanner.webp) center/cover no-repeat`,
    }}
      className="h-[250px] sm:h-[300px] lg:h-[400px] xl:h-[440px] w-full mb-10 md:mb-20 -mt-5 md:-mt-10"
    >
      <div className="container overflow-hidden  h-full  flex justify-end items-start pt-20">
        <div className="text-white z-5">
          <h2 className="font-MorabbaBold text-2xl mb-0.5 md:text-5xl lg:text-6xl/[62px] md:mb-2">
            تازه ترین رو از ما بخواهید
          </h2>
          <span className="font-MorabbaLight text-xl md:text-4xl lg:text-5xl/[64px]">
            ارسال رایگان و سریع
          </span>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
