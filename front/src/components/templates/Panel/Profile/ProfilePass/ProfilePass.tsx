import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import React from "react";

const ProfilePass = () => {
  return (
    <div className="lg:col-span-1  bg-white dark:bg-zinc-800 p-4.5 rounded-2xl">
      <div className="pb-4.5 border-b border-b-gray-200 dark:border-b-slate-500">
        <span className="font-DanaDemiBold md:text-xl text-zinc-700 dark:text-white">
          تغییر رمز عبور
        </span>
      </div>
      <form id="edit-account-password" className="p-3.5 pt-8">
        <div className="space-y-5 md:space-y-6">
          <div>
            <InputForm
              type="password"
              name="old_pass"
              value=""
              txtLable="رمز عبور فعلی"
            />

          </div>

          <InputForm
            type="password"
            name="new_pass"
            value=""
            txtLable="رمز جدید را وارد کنید"
          />
        </div>
        <input type="hidden" name="nonce" value="11e330ea58" />

        <Button title="تغییر رمز" className="h-12 w-28 lg:w-full mt-5" />
      </form>
    </div>
  );
};

export default ProfilePass;
