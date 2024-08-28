import Image from "next/image";
import { FC } from "react";

type ServiceProps = {
  title: string;
  subTitle: string;
  imgName: string;
  imgDarkName: string;
};

const Service: FC<ServiceProps> = ({
  title,
  subTitle,
  imgName,
  imgDarkName,
}) => {
  return (
    <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 w-1/2 lg:w-auto">
      <Image
        width={400}
        height={400}
        src={`/images/svgs/services/${imgName}.svg`}
        className="dark:hidden size-20"
        alt="Service Image"
      />
      <Image
        width={400}
        height={400}
        src={`/images/svgs/services/${imgDarkName}.svg`}
        className="hidden dark:inline-block size-20"
        alt="Dark Service Image"
      />

      <div>
        <h3 className="mb-1 md:mb-3.5 font-DanaDemiBold text-sm md:text-lg/6">
          {title}
        </h3>
        <span className="text-xs md:text-sm/6">{subTitle}</span>
      </div>
    </div>
  );
};

export default Service;
