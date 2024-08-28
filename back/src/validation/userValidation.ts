import * as yup from 'yup';
import { objectIdValidation, isPhoneValid, isEmailValid } from './BaseValidations/commonValid';
import { fileSchema, imageFormats } from './BaseValidations/FileValidation';
import { textValidation } from './BaseValidations/textValidation';
import { namePersionRegex } from './BaseValidations/RegexValid';

export const editUserValidation = () => {
  return yup.object({
    name: textValidation({
      title: 'اسم',
      isOptional: true,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    family: textValidation({
      title: 'فامیلی',
      isOptional: true,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    address: textValidation({
      title: 'آدرس',
      isOptional: true,
      min: 2,
      max: 200,
      regex: namePersionRegex
    }),
    mobile: yup
      .string()
      .required('شماره موبایل وارد نشده ')
      .test('mobile', 'شماره موبایل نامعتبر', (value) => isPhoneValid(value)),
    email: yup
      .string()
      .required('ایمیل وارد نشده')
      .test('email', 'ایمیل نامعتبر', (value) => isEmailValid(value)),
    avatar: fileSchema({
      isOptional: true,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'بنر'
    }),
    username: yup.string().required('نام کاربری وارد نشده است'),
    role: objectIdValidation(false, 'نقش'),
    _id: objectIdValidation(false, 'کاربر')
  });
};

export const editProfileUserValidation = () => {
  return yup.object({
    name: textValidation({
      title: 'اسم',
      isOptional: false,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    family: textValidation({
      title: 'فامیلی',
      isOptional: false,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    address: textValidation({
      title: 'آدرس',
      isOptional: false,
      min: 2,
      max: 200,
      regex: namePersionRegex
    }),
    avatar: fileSchema({
      isOptional: true,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'بنر'
    })
  });
};

export const bannUserValidation = () => {
  return yup.object({
    is_banned: yup.boolean().required('وضعیت مسدود سازی الزامی است.'),
    _id: objectIdValidation(false, 'کاربر')
  });
};

export default editUserValidation;
