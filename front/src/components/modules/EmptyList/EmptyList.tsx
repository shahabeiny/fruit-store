import { FC, ComponentType } from "react";
import Icon from "../Icon/Icon";

type ErrorWithIcon = {
  component?: never;
  icon: string;
  title?: string;
};

type ErrorWithoutIcon = {
  icon?: never;
  component: ComponentType;
  title: string;
};

type ErrorProps = ErrorWithIcon | ErrorWithoutIcon;

const EmptyList: FC<ErrorProps> = ({ component: Componenet, title, icon }) => {
  return (

  
        <div className="flex-center flex-col gap-2 text-lg font-DanaDemiBold text-red-500">
          {Componenet ? (
            <Componenet />
          ) : (
            <Icon nameIcon={icon} className="!size-12"/>
          )}
          <span className="error-page__title">
            {title ? title : "موردی یافت نشد"}
          </span>
        </div>


  );
};

export default EmptyList;
