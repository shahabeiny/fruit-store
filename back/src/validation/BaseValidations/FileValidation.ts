import * as Yup from 'yup';

export const imageFormats = ['image/jpg', 'image/jpeg', 'image/png'];

type FileValidOptions = {
  isOptional: boolean;
  fileType?: string[];
  maxSizeInBytes: number;
  titleRequired?: string;
};

export const fileSchema = ({
  isOptional = false,
  titleRequired = "عکس",
  fileType,
  maxSizeInBytes = 1068569
}: FileValidOptions) => {
  let schema = isOptional ? Yup.mixed() : Yup.mixed().required(`${titleRequired} وارد نشده`);

  if (fileType) {
    schema = schema.test(
      'is-valid-type',
      'فرمت نامعتبر',
      (value: any) => !value || (value.mimetype && fileType.includes(value.mimetype))
    );
  }

  if (maxSizeInBytes) {
    schema = schema.test(
      'FILE_SIZE',
      `حداکثر آپلود ${Math.trunc(maxSizeInBytes / 1000000)}mb`,
      (value: any) => !value || (value.size <= maxSizeInBytes)
    );
  }

  return schema;
};
