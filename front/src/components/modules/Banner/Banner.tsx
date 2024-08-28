import { FC } from "react";

type BannerProps = {
  className?: string;
  title: string;
  subTitle: string;
  bannerImg: string;
};

const Banner: FC<BannerProps> = ({ title, subTitle, className, bannerImg }) => {
  return (
    <div
      className={`flex flex-col justify-center size-full gap-4 md:gap-6 pr-7 md:pr-12 text-white rounded-2xl h-[180px] md:h-[248px] ${
        className || ""
      }`}
      style={{
        background: `linear-gradient(270deg,
          rgba(0, 0, 0, 0.3) 33.85%,
          rgba(243, 244, 246, 0.1)
        )
        100%
        ,url(${`${process.env.API_URL}/${bannerImg}`}) center/cover no-repeat`,
      }}
    >
      <h5 className="font-DanaDemiBold text-2xl/6 md:text-4xl/6 ">{title}</h5>
      <span className="md:font-DanaMedium md:text-xl/6">{subTitle}</span>
    </div>
  );
};

export default Banner;
