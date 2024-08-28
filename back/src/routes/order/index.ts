import express, { Router } from 'express';
import controller from './controller';
import hasPermission from '../../middlewares/checkPermission';
import asyncHandler from '../../utils/asyncHandler';

const router: Router = express.Router();

router.get('/order/all-orders', asyncHandler(controller.getOrders));
router.get(
  '/order/all-orders-admin',
  hasPermission(['SHOW_ORDERS']),
  asyncHandler(controller.getOrdersAdmin)
);
router.post('/order/confirm-order', hasPermission(['EDIT_ORDERS']), asyncHandler(controller.confirmOrder));

export default router;
