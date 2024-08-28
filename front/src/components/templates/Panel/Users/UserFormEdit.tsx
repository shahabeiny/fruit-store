"use client";
import { useFormik } from "formik";
import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import React, { FC, useMemo } from "react";
import { RoleModel } from "@/models/RoleModel";
import UserModel from "@/models/UserModel";
import { UserValidation } from "@/validators/UsersValidation";
import useFileInput from "@/hooks/useFileInput";
import Select from "react-select";
import ErrorInput from "@/components/modules/ErrorInput/ErrorInput";

type UserFormEditPrpps = {
  roles: RoleModel[];
  init: UserModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const UserFormEdit: FC<UserFormEditPrpps> = ({ roles, init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      username: init!.username ?? "",
      name: init!.name ?? "",
      family: init!.family ?? "",
      email: init!.email ?? "",
      mobile: init!.mobile ?? "",
      address: init!.address ?? "",
      avatar: "",
      roleId: init
        ? { value: init.role?._id, label: `نقش ${init.role?.name}` }
        : { value: "", label: "انتخاب نقش" },
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: UserValidation(false),
  });

  const { handleInputChange,filePreview } = useFileInput({
    fieldName: "avatar",
    setFieldValue: formHook.setFieldValue,
    
  });

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();

    for (const key in values) {
      if (key !== "roleId" && key !== "avatar") {
        formData.append(key, values[key]?.toString() ?? "");
      }
    }
    formData.append("avatar", values.avatar);
    formData.append("role", values.roleId.value);

    if (init?._id) {
      formData.append("_id", init!._id);
    }

    return formData;
  };

  const submitForm = async () => {
    try {
      const formData = createFormData(formHook.values);
      await onSubmit(formData);
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit} className="space-y-3">
      <InputForm
        placeholder="نام کاربری"
        type="text"
        {...formHook.getFieldProps("username")}
        nameIcon="HiOutlineUser"
        inputClassName="w-full"
        error={formHook.touched.username ? formHook.errors.username : ""}
      />

      <InputForm
        placeholder="اسم"
        type="text"
        {...formHook.getFieldProps("name")}
        nameIcon="HiOutlineLanguage"
        inputClassName="w-full"
        error={formHook.touched.name ? formHook.errors.name : ""}
      />

      <InputForm
        placeholder="فامیلی"
        type="text"
        {...formHook.getFieldProps("family")}
        nameIcon="HiOutlineLanguage"
        inputClassName="w-full"
        error={formHook.touched.family ? formHook.errors.family : ""}
      />

      <InputForm
        placeholder="ایمیل"
        type="email"
        {...formHook.getFieldProps("email")}
        nameIcon="HiOutlineEnvelope"
        inputClassName="w-full"
        error={formHook.touched.email ? formHook.errors.email : ""}
      />

      <InputForm
        placeholder="شماره موبایل"
        type="text"
        {...formHook.getFieldProps("mobile")}
        nameIcon="HiOutlinePhone"
        inputClassName="w-full text-ltr"
        error={formHook.touched.mobile ? formHook.errors.mobile : ""}
      />

      <InputForm
        placeholder="آدرس"
        type="text"
        {...formHook.getFieldProps("address")}
        nameIcon="HiOutlineMapPin"
        inputClassName="w-full"
        error={formHook.touched.address ? formHook.errors.address : ""}
      />

      <Select
        name="roleId"
        className="mt-2"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.roleId}
        options={
          roles?.map((role) => ({
            value: role._id ?? "",
            label: `نقش ${role.name}`,
          })) || []
        }
        onChange={(v) => formHook.setFieldValue("roleId", v)}
        onBlur={formHook.handleBlur}
      />
      {formHook.errors.roleId && formHook.touched.roleId && (
        <ErrorInput
          className="mt-1"
          title={formHook.errors.roleId.value ?? ""}
        />
      )}

      <InputForm
        type="file"
        txtLable="آپلود عکس:"
        name="avatar"
        onChange={handleInputChange}
        onBlur={formHook.handleBlur}
        inputClassName="w-full"
        accept="image/*"
        error={formHook.touched.avatar ? formHook.errors.avatar : ""}
      />

{filePreview && (
        <img
          src={filePreview}
          alt="Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}

      <Button
        className="h-12 w-full rounded-full"
        title={formHook.isSubmitting ? "درحال ثبت..." : "تغییر کاربر"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default UserFormEdit;
