import React from "react";
import ProfileForm from "./ProfileForm";

const ProfileInfo = () => {
  return (
    <div className="relative lg:col-span-2 bg-white dark:bg-zinc-800 p-4.5 rounded-2xl">
      <div className="pb-4.5 border-b border-b-gray-200 dark:border-b-slate-500">
        <span className="font-DanaDemiBold md:text-xl text-zinc-700 dark:text-white">
          جزییات حساب کاربری
        </span>
      </div>

      <ProfileForm />
    </div>
  );
};

export default ProfileInfo;
