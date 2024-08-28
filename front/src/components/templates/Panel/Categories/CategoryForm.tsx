"use client";
import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import { CategoryModel } from "@/models/CategoryModel";
import { FC, useMemo } from "react";
import { useFormik } from "formik";
import { CategoryValidations } from "@/validators/CategoryValidations";
import useFileInput from "@/hooks/useFileInput";

type FormCategoryPrpps = {
  init: CategoryModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const CategoryForm: FC<FormCategoryPrpps> = ({ init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      name: init?.name ?? "",
      nameEng: init?.nameEng ?? "",
      subName: init?.subName ?? "",
      banner: "",
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: init ? CategoryValidations(false) : CategoryValidations,
  });

  const { handleInputChange, filePreview } = useFileInput({
    fieldName: "banner",
    setFieldValue: formHook.setFieldValue,
  });

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]?.toString() ?? "");
    }

    formData.append("banner", values.banner);
    if (init?._id) {
      formData.append("_id", init._id);
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
        placeholder="نام دسته بندی"
        type="text"
        {...formHook.getFieldProps("name")}
        nameIcon="HiOutlineLanguage"
        error={formHook.touched.name ? formHook.errors.name : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="نام انگلیسی دسته بندی"
        type="text"
        {...formHook.getFieldProps("nameEng")}
        nameIcon="HiOutlineLanguage"
        error={formHook.touched.nameEng ? formHook.errors.nameEng : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="توضیح دسته بندی"
        type="text"
        {...formHook.getFieldProps("subName")}
        nameIcon="HiOutlineListBullet"
        error={formHook.touched.subName ? formHook.errors.subName : ""}
        inputClassName="w-full "
      />

      <InputForm
        txtLable="آپلود بنر:"
        type="file"
        name="banner"
        onChange={handleInputChange}
        onBlur={formHook.handleBlur}
        accept="image/*"
        error={formHook.touched.banner ? formHook.errors.banner : ""}
        inputClassName="w-full "
      />
      
      {filePreview && (
        <img
          src={filePreview}
          alt="Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}

      <Button
        className="h-12 w-full rounded-full mt-2"
        title={formHook.isSubmitting ? "درحال ثبت ..." : "ثبت دسته بندی"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default CategoryForm;
