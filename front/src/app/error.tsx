'use client'
import Button from "@/components/modules/Buttons/Button/Button";
import { FC } from "react";

type errorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: FC<errorProps> = ({ error, reset }) => {
  return (
    <div
      className="relative min-h-[calc(100vh-theme(spacing.16))]"
      style={{
        background: `url(/images/error.png) center  no-repeat`,
      }}
    >
      <div className="absolute -bottom-[4%] left-0 right-0 mx-auto flex-center">
        <Button
          onClick={()=>reset()}
          className="h-12 w-[160px]"
          title="رفرش صفحه"
        />
      </div>
    </div>
  );
};

export default Error;
