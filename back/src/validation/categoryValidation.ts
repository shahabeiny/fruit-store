import * as yup from 'yup';
import { objectIdValidation } from './BaseValidations/commonValid';
import { fileSchema, imageFormats } from './BaseValidations/FileValidation';
import { nameEnglishRegex, namePersionRegex } from './BaseValidations/RegexValid';
import { textValidation } from './BaseValidations/textValidation';

type CategoryValidationType = {isOptionalImg: boolean,isOptionalId: boolean};

const categoryValidation = ({isOptionalImg = false,isOptionalId= false}:CategoryValidationType) => {
  return yup.object({
    name: textValidation({
      title: 'نام دسته بندی',
      isOptional: false,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    nameEng: textValidation({
      title: 'نام انگلیسی دسته بندی',
      isOptional: false,
      min: 2,
      max: 20,
      regex: nameEnglishRegex
    }),
    subName:  textValidation({
      title: 'توضیح مختصر محصول',
      isOptional: false,
      min: 2,
      max: 15,
      regex: namePersionRegex
    }),
    banner: fileSchema({
      isOptional: isOptionalImg,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: "بنر",
    }),
    _id: objectIdValidation(isOptionalId, 'دسته بندی')
  });
};

export default categoryValidation;
