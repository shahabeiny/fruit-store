import express, { Router } from 'express';
import controller from './controller';
import asyncHandler from '../../utils/asyncHandler';
import { idParamValidation } from '../../validation/BaseValidations/commonValid';
import validateRequest from '../../middlewares/validateRequest';

const router: Router = express.Router();

router.post('/cart/add-cart', asyncHandler(controller.addCart));
router.patch('/cart/muines-cart', asyncHandler(controller.muinesCart));
router.delete(
  '/cart/delete-cart/:orderId',
  validateRequest({ params: idParamValidation('orderId', 'سفارش') }),
  asyncHandler(controller.deleteCart)
);
router.delete(
  '/cart/delete-product/:productOrderId',
  validateRequest({ params: idParamValidation('productOrderId', 'محصول سفارش') }),
  asyncHandler(controller.deleteProduct)
);
router.post('/cart/finish-cart', asyncHandler(controller.finishCart));
router.get('/cart', asyncHandler(controller.getCart));

export default router;
