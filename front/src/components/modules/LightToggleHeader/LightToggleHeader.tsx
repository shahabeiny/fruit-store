"use client";
import { FC, useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "next-themes";

type LightHeaderProps = {
  showTitle?: boolean;
  iconClassName?: string;
  className?: string;
};

const LightToggleHeader: FC<LightHeaderProps> = ({
  iconClassName,
  showTitle = false,
  className,
}) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkTheme = theme === "dark";
  const titleTheme = isDarkTheme ? "تم روشن" : "تم تاریک";
  const IconTheme = isDarkTheme ? HiOutlineSun : HiOutlineMoon;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <div
      className={` inline-flex items-center w-full gap-x-2.5 cursor-pointer text-orange-300 dark:text-white ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <IconTheme className={` ${iconClassName || ""}`} />

      {showTitle && <span>{titleTheme}</span>}
    </div>
  );
};

export default LightToggleHeader;
