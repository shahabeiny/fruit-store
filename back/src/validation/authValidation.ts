import * as Yup from 'yup';
import { isEmailValid, isPhoneValid } from './BaseValidations/commonValid';
import { passwordRegex } from './BaseValidations/RegexValid';

const validatePassword = () =>
  Yup.string()
    .required('رمزعبور وارد نشده')
    .matches(passwordRegex, 'حداقل باید 8 کاراکتر و شامل اعداد،حروف کوچک،بزرگ و کاراکتر خاص باشد');

const validateEmailOrPhone = (value: string | undefined) => {
  return isEmailValid(value) || isPhoneValid(value);
};

export const LoginValidation = Yup.object().shape({
  email_or_phone: Yup.string()
    .required('ایمیل یا شماره موبایل وارد نشده است')
    .test('email_or_phone', 'ایمیل یا شماره موبایل نامعتبر', validateEmailOrPhone),
  password: validatePassword()
});

export const RegisterValidation = Yup.object().shape({
  username: Yup.string().required('نام کاربری وارد نشده است'),
  mobile: Yup.string()
    .required('شماره موبایل وارد نشده ')
    .test('mobile', 'شماره موبایل نامعتبر', (value) => isPhoneValid(value)),
  email: Yup.string()
    .required('ایمیل وارد نشده')
    .test('email', 'ایمیل نامعتبر', (value) => isEmailValid(value)),
  password: validatePassword()
});
