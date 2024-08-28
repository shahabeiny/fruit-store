import * as yup from 'yup';
import { objectIdValidation} from './BaseValidations/commonValid';
import { textValidation } from './BaseValidations/textValidation';
import { nameEnglishRegex, namePersionRegex } from './BaseValidations/RegexValid';

const roleValidation = () => {
  return yup.object({
     name: textValidation({
      title: 'نام نقش',
      isOptional: false,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    nameEng: textValidation({
      title: 'نام انگلیسی نقش',
      isOptional: false,
      min: 2,
      max: 20,
      regex: nameEnglishRegex
    }),
    permissions: yup.array().of(objectIdValidation(true, 'مجوز')).notRequired()
  });
};

export default roleValidation;
