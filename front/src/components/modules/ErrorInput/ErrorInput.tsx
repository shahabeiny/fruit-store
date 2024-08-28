import React, { FC } from "react";

type ErrorInputProps = {
  title: string;
  className?: string;
};

const ErrorInput: FC<ErrorInputProps> = ({ title, className }) => {
  return (
    <h3
      className={`font-DanaDemiBold text-start text-red-500 text-base mr-3 ${
        className || ""
      }`}
    >
      {title}
    </h3>
  );
};

export default ErrorInput;
