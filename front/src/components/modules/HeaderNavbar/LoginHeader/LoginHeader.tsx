"use client";
import { useAppSelector } from "@/hooks/useReduxhook";
import Link from "next/link";
import { FC } from "react";
import Icon from "../../Icon/Icon";
import Image from "next/image";
import Avatar from "../../Avatar/Avatar";

type LoginHeaderProps = {
  iconClassName?: string;
  titleClassName?: string;
};

const LoginHeader: FC<LoginHeaderProps> = ({
  iconClassName,
  titleClassName,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user?.username ? (
        <Link
          href="/panel/"
          title={user?.username}
          className="inline-flex items-center gap-x-2.5 tracking-tightest cursor-pointer"
        >
          <Avatar src={user?.avatar??''} alt={user?.username} className={`size-14 ${iconClassName || ''}`}/>
          <span className={titleClassName || ""}>{user?.username}</span>
     
        </Link>
      ) : (
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-x-2.5 tracking-tightest"
        >
          <Icon
            nameIcon="HiOutlineArrowLeftOnRectangle"
            className={`rotate-180 ${iconClassName}`}
          />
          <span className={titleClassName || ""}>ورود | ثبت نام</span>
        </Link>
      )}
    </>
  );
};

export default LoginHeader;
