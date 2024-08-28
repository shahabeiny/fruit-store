"use client"
import Link from "next/link";
import { FC } from "react";

type ButtonProps = {
  onClick?:()=>void;
  title: string;
  link?: string;
  disabled?: boolean;
  className?: string;
};

const Button: FC<ButtonProps> = ({ link, title, className, disabled,onClick }) => {
  const KindButton = link ? (
    <Link href={link}>{title}</Link>
  ) : (
    <button type="submit" disabled={disabled} onClick={()=>onClick?.()}>
      {title}
    </button>
  );
  return (
    <span
      className={`flex-center text-center text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 hover:bg-teal-700 transition-colors rounded-xl tracking-tightest child:w-full ${
        className || ""
      }`}
    >
      {KindButton}
    </span>
  );
};

export default Button;
