import Button from "@/components/modules/Buttons/Button/Button";
import InputForm from "@/components/modules/InputForm/InputForm";
import { FinishOrderModel } from "@/models/OrderModel";
import { FinishValidation } from "@/validators/ProductValidations";
import { useFormik } from "formik";
import { FC, memo, useMemo } from "react";

interface CartFormPrpps {
  init: FinishOrderModel | null;
  onSubmit: (formData: FinishOrderModel) => Promise<any>;
}

const CartForm: FC<CartFormPrpps> = ({ init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      name: init!.name ?? "",
      family: init!.family ?? "",
      address: init!.address ?? "",
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: FinishValidation,
  });

  const submitForm = async () => {
    try {
      const formData: FinishOrderModel = {
        ...formHook.values,
        orderId: init?.orderId ?? "",
      };
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
        placeholder="اسم"
        txtLable="اسم"
        type="text"
        {...formHook.getFieldProps("name")}
        nameIcon="HiLanguage"
        error={formHook.touched.name ? formHook.errors.name : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="فامیلی"
        txtLable="فامیلی"
        type="text"
        {...formHook.getFieldProps("family")}
        nameIcon="HiLanguage"
        error={formHook.touched.family ? formHook.errors.family : ""}
        inputClassName="w-full"
      />

      <InputForm
        placeholder="آدرس"
        txtLable="آدرس"
        type="text"
        {...formHook.getFieldProps("address")}
        nameIcon="HiOutlineMapPin"
        error={formHook.touched.address ? formHook.errors.address : ""}
        inputClassName="w-full"
      />

      <Button
        className="h-12 w-full rounded-full mt-2"
        title={formHook.isSubmitting ? "درحال ثبت ..." : "نهایی کردن"}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(CartForm);
