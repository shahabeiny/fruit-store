import express, { Router } from 'express';
import controller from './controller';;
import asyncHandler from '../../utils/asyncHandler';
import { validationBody } from '../../validation/BaseValidations/commonValid';
import { LoginValidation, RegisterValidation } from '../../validation/authValidation';

const router: Router = express.Router();

router.post('/register', ...validationBody(RegisterValidation), asyncHandler(controller.register));
router.post('/login', ...validationBody(LoginValidation), asyncHandler(controller.login));
router.post('/refresh-token', asyncHandler(controller.refreshToken));
router.post('/logout', asyncHandler(controller.logout));

export default router;
