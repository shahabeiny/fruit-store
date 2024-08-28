"use client";
import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import { CategoryModel } from "@/models/CategoryModel";
import { FC, useMemo } from "react";
import { useFormik } from "formik";
import useFileInput from "@/hooks/useFileInput";
import { ProductModel } from "@/models/ProductModels";
import Select from "react-select";
import { ProductValidation } from "@/validators/ProductValidations";
import ErrorInput from "@/components/modules/ErrorInput/ErrorInput";

type FormProductPrpps = {
  categories: CategoryModel[];
  init: ProductModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const optionsCreator = (categories: CategoryModel[]) => {
  return (
    categories?.map((b) => ({
      value: b._id ?? "",
      label: `دسته بندی ${b.name}`,
    })) || []
  );
};

const ProductForm: FC<FormProductPrpps> = ({ init, categories, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      name: init?.name ?? "",
      nameEng: init?.nameEng ?? "",
      desc: init?.desc ?? "",
      scientificDesc: init?.scientificDesc ?? "",
      total: init?.total ?? 0,
      eachCart: init?.eachCart ?? 0,
      sold: init?.sold ?? 0,
      frozen: init?.frozen ?? 0,
      price: init?.price ?? 0,
      off: init?.off ?? 0,
      banner: "",
      categoryId: init
        ? {
            value: init.category?._id,
            label: `دسته بندی ${init.category?.name}`,
          }
        : { value: "", label: "انتخاب دسته بندی" },
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: init ? ProductValidation(false) : ProductValidation,
  });

  const { handleInputChange, filePreview } = useFileInput({
    fieldName: "banner",
    setFieldValue: formHook.setFieldValue,
  });

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();

    for (const key in values) {
      if (key !== "categoryId" && key !== "banner") {
        formData.append(key, values[key]?.toString() ?? "");
      }
    }
    formData.append("banner", values.banner);
    formData.append("categoryId", values.categoryId.value);
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
        placeholder="نام محصول"
        txtLable="نام محصول"
        type="text"
        {...formHook.getFieldProps("name")}
        nameIcon="HiOutlineLanguage"
        error={formHook.touched.name ? formHook.errors.name : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="نام انگلیسی محصول"
        txtLable="نام انگلیسی محصول"
        type="text"
        {...formHook.getFieldProps("nameEng")}
        nameIcon="HiOutlineLanguage"
        error={formHook.touched.nameEng ? formHook.errors.nameEng : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="تعداد کل محصول(کیلوگرم)"
        txtLable="تعداد کل"
        type="number"
        {...formHook.getFieldProps("total")}
        nameIcon="HiOutlineWallet"
        error={formHook.touched.total ? formHook.errors.total : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="مجاز برای هر سبد(کیلوگرم)"
        txtLable="تعداد مجاز سبد"
        type="number"
        {...formHook.getFieldProps("eachCart")}
        nameIcon="HiOutlineShoppingCart"
        error={formHook.touched.eachCart ? formHook.errors.eachCart : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="تعداد فروخته شده محصول(کیلوگرم)"
        txtLable="تعداد فروخته شده"
        type="number"
        {...formHook.getFieldProps("sold")}
        nameIcon="HiOutlineTag"
        error={formHook.touched.sold ? formHook.errors.sold : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="تعداد فریز شده محصول(کیلوگرم)"
        txtLable="تعداد فریز شده"
        type="number"
        {...formHook.getFieldProps("frozen")}
        nameIcon="HiOutlineLockClosed"
        error={formHook.touched.frozen ? formHook.errors.frozen : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="قیمت هر کیلوگرم را وارد کنید"
        txtLable={`قیمت هر کیلوگرم `}
        type="number"
        {...formHook.getFieldProps("price")}
        nameIcon="HiOutlineCurrencyDollar"
        error={formHook.touched.price ? formHook.errors.price : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="درصد تخفیف محصول"
        txtLable="درصد تخفیف محصول"
        type="number"
        {...formHook.getFieldProps("off")}
        nameIcon="HiOutlineReceiptPercent"
        error={formHook.touched.off ? formHook.errors.off : ""}
        inputClassName="w-full"
      />

      <InputForm
        type="textarea"
        placeholder="توضیح محصول"
        txtLable="توضیح محصول"
        {...formHook.getFieldProps("desc")}
        nameIcon="HiOutlineListBullet"
        error={formHook.touched.desc ? formHook.errors.desc : ""}
        inputClassName="w-full h-36"
      />

      <InputForm
        type="textarea"
        placeholder="توضیح علمی محصول"
        txtLable="توضیح علمی"
        nameIcon="HiOutlineListBullet"
        inputClassName="w-full h-36"
        {...formHook.getFieldProps("scientificDesc")}
        error={
          formHook.touched.scientificDesc ? formHook.errors.scientificDesc : ""
        }
      />

      <Select
        name="categoryId"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.categoryId}
        options={optionsCreator(categories)}
        className="mt-2"
        onChange={(v) => formHook.setFieldValue("categoryId", v)}
        onBlur={formHook.handleBlur}
      />
      {formHook.errors.categoryId && formHook.touched.categoryId && (
        <ErrorInput
          className="mt-1"
          title={formHook.errors.categoryId.value ?? ""}
        />
      )}

      <InputForm
        txtLable="آپلود بنر:"
        type="file"
        name="banner"
        onChange={handleInputChange}
        onBlur={formHook.handleBlur}
        accept="image/*"
        error={formHook.touched.banner ? formHook.errors.banner : ""}
        inputClassName="w-full dark:bg-zinc-800"
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
        title={formHook.isSubmitting ? "درحال ثبت ..." : "ثبت محصول"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default ProductForm;
