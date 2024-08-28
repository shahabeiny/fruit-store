import * as Yup from "yup";
import {
  nameEnglishRegex,
  namePersionOrEnglishRegex,
  namePersionRegex,
} from "./BaseValidations/RegexValid";
import { fileSchema, imageFormats } from "./BaseValidations/FileValidation";
import textValidation from "./BaseValidations/TextValidation";

export const ProductValidation = (imageRequired: boolean = true) => {
  return Yup.object({
    name: textValidation("name", "فارسی", namePersionRegex, 2, 15),
    nameEng: textValidation("name", "انگلیسی", nameEnglishRegex, 2, 20),
    desc: textValidation("text", undefined, undefined, 2, 400),
    scientificDesc: textValidation("text", undefined, undefined, 2, 400),
    total: Yup.number()
      .required("تعداد کل وارد نشده")
      .min(1, "تعداد کل باید بیشتر یا مساوی یک باشد"),
    sold: Yup.number().required("تعداد فروخته وارد نشده"),
    eachCart: Yup.number()
      .required("تعداد سبد وارد نشده")
      .test(
        "is-less-than-total",
        " تعداد سبد نمی‌تواند بیشتر از تعداد کل باشد",
        function (value) {
          const { total } = this.parent;
          return value <= total;
        }
      )
      .min(1, "تعداد سبد باید بیشتر یا مساوی یک باشد"),
    frozen: Yup.number()
      .required("تعداد یخ زده وارد نشده")
      .test(
        "is-less-than-total",
        "تعداد یخ زده نمی‌تواند بیشتر از تعداد کل باشد",
        function (value) {
          const { total } = this.parent;
          return value <= total;
        }
      ),
      off: Yup.number()
      .positive("فقط اعداد مثبت وارد شود")
      .min(0, "حداقل درصد تخفیف مجاز ۰ درصد است")
      .max(100, "حداکثر درصد تخفیف مجاز ۱۰۰ درصد است "),
    price: Yup.number()
      .positive("فقط اعداد مثبت وارد شود")
      .min(1000, "حداقل مبلغ مجاز ۱،۰۰۰ تومان")
      .max(10000000, "حداکثر مبلغ مجاز ۱۰،۰۰۰،۰۰۰ تومان ")
      .required("قیمت محصول وارد نشده"),
    categoryId: Yup.object({
      value: Yup.string().required("موردی انتخاب نشده"),
    }),
    banner: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: "عکس",
    }),
  });
};

export const SearchProductValidation = Yup.object({
  name: textValidation("name", "فارسی", namePersionOrEnglishRegex, 2, 20),
});

export const FinishValidation = Yup.object({
  name: textValidation("name", "فارسی", namePersionRegex, 2, 15),
  family: textValidation("name", "فارسی", namePersionRegex, 2, 15),
  address: textValidation("text", undefined, undefined, 2, 200, true),
});
