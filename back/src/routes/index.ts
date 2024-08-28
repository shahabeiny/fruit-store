import express from 'express';
const router = express.Router();

import authRouter from './auth';
import homeRouter from './home';
import userRouter from './user';
import roleRouter from './role';
import cartRouter from './cart';
import orderRouter from './order';
import categoryRouter from './category';
import dashboardRouter from './dashboard';
import favoriteRouter from './favorite';
import productRouter from './product';
import error from '../middlewares/error';
import { isLoggined } from '../middlewares/auth';

router.use('/user-router', isLoggined, userRouter);
router.use('/role-router', isLoggined, roleRouter);
router.use('/cart-router', isLoggined, cartRouter);
router.use('/order-router', isLoggined, orderRouter);
router.use('/category-router', isLoggined, categoryRouter);
router.use('/dashboard-router', isLoggined, dashboardRouter);
router.use('/favorite-router', isLoggined, favoriteRouter);
router.use('/auth-router', authRouter);
router.use('/home-router', homeRouter);
router.use('/product-router', productRouter);

router.use(error);

export default router;
