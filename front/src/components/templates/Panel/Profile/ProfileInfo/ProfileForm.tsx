"use client";
import Button from "@/components/modules/Buttons/Button/Button";
import Icon from "@/components/modules/Icon/Icon";
import InputForm from "@/components/modules/InputForm/InputForm";
import useFileInput from "@/hooks/useFileInput";
import { UserProfileValidation } from "@/validators/UsersValidation";
import { useFormik } from "formik";
import { memo, useMemo } from "react";
import ProfileHistory from "./ProfileHistory";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import { useEditProfuleByUserMutation } from "@/redux/store/user/userSlice";
import Image from "next/image";

const ProfileForm = () => {
  const user = useAppSelector(selectCurrentUser);
  const [editProfile] = useEditProfuleByUserMutation();

  const initialValues = useMemo(
    () => ({
      avatar: "",
      name: user?.name ?? "",
      family: user?.family ?? "",
      address: user?.address ?? "",
    }),
    [user]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: UserProfileValidation(false),
  });

  const { handleInputChange } = useFileInput({
    fieldName: "avatar",
    setFieldValue: formHook.setFieldValue,
  });

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]?.toString() ?? "");
    }
    formData.append("avatar", values.avatar);
    return formData;
  };

  const submitForm = async () => {
    try {
      const formData = createFormData(formHook.values);
      await editProfile(formData).unwrap();
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit} className="relative p-3.5 pt-8">
      <ProfileHistory />
      <div className="relative mb-11">
         <Image
            src={user?.avatar ? `${process.env.API_URL}/${user?.avatar}`:"/images/avatar.png"}
            width={900}
            height={450}
            alt={user?.username??''}
            className="w-32 md:w-44 h-32 md:h-44 rounded-full"
          />
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleInputChange}
          onBlur={formHook.handleBlur}
          accept="image/*"
          className="hidden cursor"
        />
        <label htmlFor="avatar" className="block relative cursor-pointer">
          <span className="absolute bottom-0 right-0 flex-center w-10 md:w-14 h-10 md:h-14 rounded-full bg-sky-600 dark:bg-secondary dark:hover:bg-blue-600 border-2 md:border-4 border-white dark:border-gray-800 cursor-pointer transition-colors">
            <Icon
              nameIcon="HiArrowUpTray"
              className="size-5 md:size-6 text-white"
            />
          </span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
        <InputForm
          type="text"
          name="phone"
          value={user?.mobile}
          txtLable="شماره موبایل"
          disabled={false}
          inputClassName="text-ltr bg-gray-200 child:cursor-not-allowed"
        />
        <div className="hidden md:block"></div>
        <InputForm
          type="text"
          {...formHook.getFieldProps("name")}
          txtLable="نام"
          placeholder="نام"
          error={formHook.touched.name ? formHook.errors.name : ""}
        />

        <InputForm
          type="text"
          {...formHook.getFieldProps("family")}
          txtLable="نام خانوادگی"
          placeholder="نام خانوادگی"
          error={formHook.touched.family ? formHook.errors.family : ""}
        />

        <InputForm
          type="text"
          name="username"
          value={user?.username}
          disabled={false}
          inputClassName="bg-gray-200 child:cursor-not-allowed"
          txtLable="نام کاربری"
        />

        <InputForm
          type="email"
          name="email"
          value={user?.email}
          disabled={false}
          inputClassName="bg-gray-200 child:cursor-not-allowed"
          txtLable="ایمیل"
        />

        <InputForm
          placeholder="آدرس"
          txtLable="آدرس"
          type="text"
          {...formHook.getFieldProps("address")}
          error={formHook.touched.address ? formHook.errors.address : ""}
        />
      </div>

      <Button
        className="h-12 w-28 rounded-full mt-5"
        title={formHook.isSubmitting ? "درحال ثبت ..." : "تغییر اطلاعات"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(ProfileForm);
