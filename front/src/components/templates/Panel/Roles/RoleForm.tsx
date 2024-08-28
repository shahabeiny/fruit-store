"use client";
import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import { PermissionModel, RoleModel, addRoleModel } from "@/models/RoleModel";
import { useFormik } from "formik";
import Select from "react-select";
import { FC, useMemo } from "react";
import { RoleValidation } from "@/validators/UsersValidation";

type RoleFormProps = {
  init: RoleModel | null;
  permissions: PermissionModel[];
  onSubmit: (formData: addRoleModel) => Promise<any>;
};

type permForServer = { value: string; label: string };

function optionsCreator(permissions: PermissionModel[]) {
  let arr: { value: string; label: string }[] = [];
  permissions?.map((per) => arr.push({ value: per._id, label: per.name }));
  return arr;
}

const RoleForm: FC<RoleFormProps> = ({ init, onSubmit, permissions }) => {
  const initialValues = useMemo(
    () => ({
      name: init ? init.name : "",
      nameEng: init ? init.nameEng : "",
      permissions: init ? optionsCreator(init.permissions) : [],
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: RoleValidation,
  });

  const submitForm = async () => {
    try {
      const formData: addRoleModel = {
        ...formHook.values,
        permissions: formHook.values.permissions.map(
          (per: permForServer) => per.value
        ),
      };

      if (init?._id) {
        formData._id = init?._id ?? "";
      }
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
        placeholder="نام نقش"
        type="text"
        {...formHook.getFieldProps("name")}
        nameIcon="HiOutlineLanguage"
        error={formHook.touched.name ? formHook.errors.name : ""}
        inputClassName="w-full "
      />

      <InputForm
        placeholder="نام انگلیسی نقش"
        type="text"
        {...formHook.getFieldProps("nameEng")}
        nameIcon="HiOutlineLanguage"
        error={formHook.touched.nameEng ? formHook.errors.nameEng : ""}
        inputClassName="w-full"
      />

      <Select
        name="permissions"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        className="mt-2"
        value={formHook.values.permissions}
        options={optionsCreator(permissions)}
        onChange={(v) => formHook.setFieldValue("permissions", v)}
        onBlur={formHook.handleBlur}
        isMulti
      />

      <Button
        className="h-12 w-full rounded-full mt-2"
        title={formHook.isSubmitting ? "درحال ثبت ..." : "ثبت نقش"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default RoleForm;
