import express from 'express';
import controller from './controller';
import hasPermission from '../../middlewares/checkPermission';
import asyncHandler from '../../utils/asyncHandler';
import validateRequest from '../../middlewares/validateRequest';
import { idParamValidation, validationBody } from '../../validation/BaseValidations/commonValid';
import categoryValidation from '../../validation/categoryValidation';

const router = express.Router();

router
  .route('/category')
  .get(asyncHandler(controller.getCategories))
  .post(
    hasPermission(['EDIT_PRODUCTS']),
    ...validationBody(categoryValidation({ isOptionalImg: false, isOptionalId: true }), ['banner']),
    asyncHandler(controller.saveCategory)
  )
  .put(
    hasPermission(['EDIT_PRODUCTS']),
    ...validationBody(categoryValidation({ isOptionalImg: true, isOptionalId: false }), ['banner']),
    asyncHandler(controller.editCategory)
  );

router.delete(
  '/category/:id',
  hasPermission(['EDIT_PRODUCTS']),
  validateRequest({ params: idParamValidation('id','دسته بندی') }),
  asyncHandler(controller.deleteCategory)
);

export default router;
