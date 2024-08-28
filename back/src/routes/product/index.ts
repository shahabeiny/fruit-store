import express, { Router } from 'express';
import controller from './controller';
import hasPermission from '../../middlewares/checkPermission';
import {isLogginedOptional, isLoggined } from '../../middlewares/auth';
import { validationBody } from '../../validation/BaseValidations/commonValid';
import { productValidation } from '../../validation/productValidation';
import asyncHandler from '../../utils/asyncHandler';

const router: Router = express.Router();

router
  .route('/product')
  .get(asyncHandler(controller.getProductsPanel))
  .post(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    ...validationBody(productValidation({ isOptionalImg: false, isOptionalId: true }), ['banner']),
    asyncHandler(controller.saveProduct))
  .put(
    isLoggined,
    hasPermission(['EDIT_PRODUCTS']),
    ...validationBody(productValidation({ isOptionalImg: true, isOptionalId: false }), ['banner']),
    asyncHandler(controller.editProduct)
  );

router.get('/product/:slug', isLogginedOptional, asyncHandler(controller.getInfoProduct));
router.get('/products-category/:slug', asyncHandler(controller.getProductsStore));

export default router;
