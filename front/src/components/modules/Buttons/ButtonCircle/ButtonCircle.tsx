import { FC } from "react";
import Icon from "../../Icon/Icon";

type ButtonCircleProps = {
  onClick?: () => void;
  className?: string;
  nameIcon: string;
};

const ButtonCircle: FC<ButtonCircleProps> = ({
  onClick,
  className,
  nameIcon,
}) => {
  return (
    <button
      className={`fixed bottom-4 left-4  flex-center  text-zinc-700 dark:text-white text-2xl transition-opacity rounded-full shadow-normal cursor-pointer z-5 ${
        className || ""
      }`}
      onClick={() => onClick?.()}>
    
      <Icon nameIcon={nameIcon} />
    </button>
  );
};

export default ButtonCircle;
