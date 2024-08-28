import * as yup from 'yup';

type TextValidationOptions = {
  title: string;
  isOptional?: boolean;
  min?: number;
  max?: number;
  regex?: RegExp;
};

export const textValidation = ({
  title,
  isOptional = false,
  min = 2,
  max = 20,
  regex
}: TextValidationOptions) => {
  let schema = yup.string();

  if (!isOptional) {
    schema = schema
      .required(`فیلد ${title} الزامی است.`)
      .min(min, `فیلد ${title} باید حداقل ${min} حرف باشد`)
      .max(max, `فیلد ${title} باید حداکثر ${max} حرف باشد`);

    if (regex) {
      schema = schema.matches(regex, `فیلد ${title} معتبر نیست`);
    }
  }

  return schema;
};
