import Logo from "@/components/modules/Logo/Logo";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center flex-col px-4 min-h-screen ">
      <Logo className="mb-5" showTitle={true} />
      <div className="max-w-[340px] w-full pt-5 pb-6 px-6 text-center bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-normal rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
