import Image from "next/image";
import { FC } from "react";

type AvatarProps = {
  className?: string;
  src?: string;
  alt?: string;
};

const Avatar: FC<AvatarProps> = ({ className, src, alt }) => {

  return (
    <div>
      <Image
        height={100}
        width={100}
        src={src ?  `${process.env.API_URL}/${src}`: "/images/avatar.png"}
        alt={alt ? alt : "avatar"}
        className={`object-cover rounded-full inline-block size-14 ${
          className || ""
        }`}
      />
    </div>
  );
};

export default Avatar;
