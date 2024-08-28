import * as Yup from 'yup';
import { textValidation } from './BaseValidations/textValidation';
import { nameEnglishRegex, namePersionRegex } from './BaseValidations/RegexValid';
import { fileSchema, imageFormats } from './BaseValidations/FileValidation';
import { objectIdValidation } from './BaseValidations/commonValid';

type ProductValidationType = { isOptionalImg: boolean; isOptionalId: boolean };

export const productValidation = ({ isOptionalImg = false, isOptionalId = false }: ProductValidationType) => {
  return Yup.object({
    name: textValidation({
      title: 'نام محصول',
      isOptional: false,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    nameEng: textValidation({
      title: 'نام انگلیسی محصول',
      isOptional: false,
      min: 2,
      max: 20,
      regex: nameEnglishRegex
    }),
    desc: textValidation({
      title: 'جزییات محصول',
      isOptional: false,
      min: 2,
      max: 400
    }),
    scientificDesc: textValidation({
      title: 'توضیحات علمی محصول',
      isOptional: false,
      min: 2,
      max: 400
    }),
    total: Yup.number().required('تعداد کل وارد نشده').min(1, 'تعداد کل باید بیشتر یا مساوی یک باشد'),
    sold: Yup.number().required('تعداد فروخته وارد نشده'),
    eachCart: Yup.number()
      .required('تعداد سبد وارد نشده')
      .test('is-less-than-total', ' تعداد سبد نمی‌تواند بیشتر از تعداد کل باشد', function (value) {
        const { total } = this.parent;
        return value <= total;
      })
      .min(1, 'تعداد سبد باید بیشتر یا مساوی یک باشد'),
    frozen: Yup.number()
      .required('تعداد یخ زده وارد نشده')
      .test('is-less-than-total', 'تعداد یخ زده نمی‌تواند بیشتر از تعداد کل باشد', function (value) {
        const { total } = this.parent;
        return value <= total;
      }),
    off: Yup.number()
      .positive('فقط اعداد مثبت وارد شود')
      .min(0, 'حداقل درصد تخفیف مجاز ۰ درصد است')
      .max(100, 'حداکثر درصد تخفیف مجاز ۱۰۰ درصد است '),
    price: Yup.number()
      .positive('فقط اعداد مثبت وارد شود')
      .min(1000, 'حداقل مبلغ مجاز ۱،۰۰۰ تومان')
      .max(10000000, 'حداکثر مبلغ مجاز ۱۰،۰۰۰،۰۰۰ تومان ')
      .required('قیمت محصول وارد نشده'),
    categoryId: objectIdValidation(false, 'دسته بندی'),
    _id: objectIdValidation(isOptionalId, 'محصول'),
    banner: fileSchema({
      isOptional: isOptionalImg,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'بنر'
    })
  });
};
