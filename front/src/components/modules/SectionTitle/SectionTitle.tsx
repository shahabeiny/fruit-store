import { FC } from "react";
import Icon from "../Icon/Icon";

type SectionTitleIcon = {
  nameIcon?: string;
  title: string;
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const SectionTitle: FC<SectionTitleIcon> = ({
  children,
  nameIcon,
  iconClassName,
  title,
  className,
  onClick,
}) => {
  return (
    <div className={`flex-x-center gap-x-2 md:gap-x-3  ${className || ""}`} onClick={()=>onClick?.()}>
      {nameIcon && (
        <Icon
          nameIcon={nameIcon}
          libIcon="hi2"
          className={iconClassName || ""}
        />
      )}
      <span className="line-clamp-1">{title}</span>
      {children}
    </div>
  );
};

export default SectionTitle;
