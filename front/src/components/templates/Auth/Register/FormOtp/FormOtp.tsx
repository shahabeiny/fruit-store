import Button from "@/components/modules/Buttons/Button/Button";
import Icon from "@/components/modules/Icon/Icon";
import InputForm from "@/components/modules/InputForm/InputForm";
import React from "react";

const FormOtp = () => {
  return (
    <>
      <div className="flex-x-center justify-between">
        <Icon
          nameIcon="HiOutlineArrowRightCircle"
          className="size-7 text-slate-500 dark:text-white cursor-pointer"
        />
        <span className="font-DanaDemiBold text-xl">کد تایید</span>
      </div>
      <span className="block text-center my-4 sm:my-5">
        کد تایید برای <span className="otp-phone__text">09226675453</span> ارسال
        شد.{" "}
      </span>
      <form className="otp__form">
        <div className="flex justify-center items-center gap-x-1 " dir="ltr">
          <InputForm
            type="number"
            name="mobile"
            value="0"
            inputClassName=" size-14 rounded-[10px] dark:bg-zinc-800"
          />
          <InputForm
            type="number"
            name="mobile"
            value="0"
            inputClassName="size-14 rounded-[10px] dark:bg-zinc-800"
          />
          <InputForm
            type="number"
            name="mobile"
            value="0"
            inputClassName="size-14 rounded-[10px] dark:bg-zinc-800"
          />
          <InputForm
            type="number"
            name="mobile"
            value="0"
            inputClassName="size-14 rounded-[10px] dark:bg-zinc-800"
          />
          <InputForm
            type="number"
            name="mobile"
            value="0"
            inputClassName="size-14 rounded-[10px] dark:bg-zinc-800"
          />
        </div>

        <Button title="تایید" className="h-12 w-full mt-5 rounded-full" />
      </form>
      <div className="flex items-center justify-between font-danaMedium text-sm text-slate-500 mt-5">
        <a
          href="https://sabzlearn.ir/terms-conditions/"
          className="underline underline-offset-2"
        >
          حریم خصوصی
        </a>
        <button type="button">
          ارسال دوباره
          <span className="timer hidden">
            (<span className="minute">00</span>:
            <span className="second">00</span>)
          </span>
        </button>
      </div>
    </>
  );
};

export default FormOtp;
