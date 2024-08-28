import * as Yup from "yup";
import {
  nameEnglishRegex,
  namePersionRegex,
} from "./BaseValidations/RegexValid";
import { fileSchema, imageFormats } from "./BaseValidations/FileValidation";
import textValidation from "./BaseValidations/TextValidation";

export const CategoryValidations = (imageRequired: boolean = true) => {
  return Yup.object({
    name: textValidation("name", "فارسی", namePersionRegex, 2, 15),
    nameEng: textValidation("name", "انگلیسی", nameEnglishRegex, 2, 20),
    subName: textValidation("name", "فارسی", namePersionRegex, 2, 15),
    banner: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: "بنر",
    }),
  });
};
