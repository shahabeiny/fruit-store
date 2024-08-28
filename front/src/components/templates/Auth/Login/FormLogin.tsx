import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import LoginModel from "@/models/LoginModel";
import { LoginValidation } from "@/validators/AuthValidations";
import { useFormik } from "formik";
import React, { FC } from "react";

type FormLoginProps = {
  onSubmit: (formData: LoginModel) => Promise<any>;
};

const FormLogin: FC<FormLoginProps> = ({ onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      email_or_phone: "",
      password: "",
    },
    onSubmit: () => submitForm(),
    validationSchema: LoginValidation,
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
        {...formHook.getFieldProps("email_or_phone")}
        placeholder="شماره موبایل یا آدرس ایمیل"
        nameIcon="HiOutlineEnvelope"
        inputClassName="w-full dark:bg-zinc-800"
        error={
          formHook.touched.email_or_phone ? formHook.errors.email_or_phone : ""
        }
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
        title={formHook.isSubmitting ? "درحال ثبت ..." : "وارد شوید"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default FormLogin;
