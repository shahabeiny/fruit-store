"use client";
import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import LoginModel from "@/models/LoginModel";
import { RegisterValidation } from "@/validators/AuthValidations";
import { useFormik } from "formik";
import { FC } from "react";

type FormRegisterProps = {
  onSubmit: (formData: LoginModel) => Promise<any>;
};

const FormRegister: FC<FormRegisterProps> = ({ onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      username: "",
      mobile: "",
      email: "",
      password: "",
    },
    onSubmit: () => submitForm(),
    validationSchema: RegisterValidation,
  });

  const submitForm = async () => {
    try {
      const formData: LoginModel = { ...formHook.values };
      await onSubmit(formData);
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit} className="space-y-5">
      <InputForm
        type="text"
        {...formHook.getFieldProps("username")}
        placeholder="نام کاربری"
        nameIcon="HiOutlineUser"
        inputClassName="w-full dark:bg-zinc-800"
        error={formHook.touched.username ? formHook.errors.username : ""}
      />
      <InputForm
        type="text"
        {...formHook.getFieldProps("mobile")}
        placeholder="شماره موبایل"
        nameIcon="HiOutlinePhone"
        inputClassName="w-full dark:bg-zinc-800"
        error={formHook.touched.mobile ? formHook.errors.mobile : ""}
      />
      <InputForm
        type="email"
        {...formHook.getFieldProps("email")}
        placeholder="آدرس ایمیل"
        nameIcon="HiOutlineEnvelope"
        inputClassName="w-full dark:bg-zinc-800"
        error={formHook.touched.email ? formHook.errors.email : ""}
      />
      <InputForm
        type="password"
        {...formHook.getFieldProps("password")}
        placeholder="رمز عبور"
        nameIcon="HiOutlineLockClosed"
        inputClassName="w-full dark:bg-zinc-800"
        error={formHook.touched.password ? formHook.errors.password : ""}
      />
      <Button
        className="h-12 w-full rounded-full mt-2"
        title={formHook.isSubmitting ? "درحال ثبت ..." : "ادامه"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default FormRegister;
