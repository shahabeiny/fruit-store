import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

type ValidationSchemas = {
  body?: yup.ObjectSchema<any>;
  params?: yup.ObjectSchema<any>;
  fileFields?: string[];
};

const validateRequest =
  (schemas: ValidationSchemas) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const bodyWithFiles = { ...req.body };
        if (schemas.fileFields) {
          schemas.fileFields.forEach((field) => {
            bodyWithFiles[field] = req.files?.[field];
          });
        }
        await schemas.body.validate(bodyWithFiles, { abortEarly: false });
      }
      if (schemas.params) {
        await schemas.params.validate(req.params, { abortEarly: false });
      }
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = error.errors.map((err, index) => `${index + 1}. ${err}`).join(' '); // خطاها را به صورت یک رشته تبدیل کنید
        return res.status(400).json({
          message: errorMessages || 'خطا در اعتبارسنجی'
        });
      }
      return res.status(500).json({
        message: 'خطای داخلی سرور'
      });
    }
  };

export default validateRequest;
