import * as yup from 'yup';
import mongoose from 'mongoose';
import { mobileRegex} from './RegexValid';
import validateRequest from '../../middlewares/validateRequest';
import trimBody from '../../middlewares/trimBody';

export const isEmailValid = (email: string | undefined) => yup.string().email().isValidSync(email);

export const isPhoneValid = (mobile: string | undefined) =>
  yup.string().matches(mobileRegex).isValidSync(mobile);

export const passwordValidation = yup
  .string()
  .required('رمز عبور وارد نشده')
  .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد');

const isValidObjectId = (val: string) => mongoose.Types.ObjectId.isValid(val);

export const objectIdValidation = (isOptional: boolean = false, titleId: string = '') => {
  const schema = yup
    .string()
    .test('is-objectid', `آی‌دی ${titleId} معتبر نیست`, (value) => !value || isValidObjectId(value));
  return isOptional ? schema.notRequired() : schema.required(`آی‌دی ${titleId} ضروری است`);
};

// اعتبارسنجی پارامتر id
export const idParamValidation = (paramName: string, titleId: string = '') => {
  return yup.object().shape({
    [paramName]: objectIdValidation(false,titleId)
  });
};

export const validationBody = (validationSchema: any, fileFields: string[] = []) => [
  validateRequest({ body: validationSchema, fileFields }),
  trimBody
];
