import express, { Router } from 'express';
import controller from './controller';
import hasPermission from '../../middlewares/checkPermission';
import { isLoggined } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { idParamValidation, validationBody } from '../../validation/BaseValidations/commonValid';
import asyncHandler from '../../utils/asyncHandler';
import editUserValidation, {
  bannUserValidation,
  editProfileUserValidation
} from '../../validation/userValidation';
const router: Router = express.Router();

router
  .route('/user')
  .get(hasPermission(['SHOW_USERS']), asyncHandler(controller.getUsers))
  .put(
    hasPermission(['EDIT_USERS']),
    ...validationBody(editUserValidation(), ['avatar']),
    asyncHandler(controller.editUser)
  )
  .patch(
    hasPermission(['EDIT_USERS']),
    ...validationBody(bannUserValidation(), ['avatar']),
    asyncHandler(controller.bannUser)
  );

router.delete(
  '/user/:id',
  hasPermission(['EDIT_USERS']),
  validateRequest({ params: idParamValidation('id','کاربر') }),
  asyncHandler(controller.deleteUser)
);

router.post(
  '/user/edit-profile',
  ...validationBody(editProfileUserValidation(), ['avatar']),
  asyncHandler(controller.editProfile)
);

router.get('/user/login-info', asyncHandler(controller.loginInfo));

router.get('/user/me', isLoggined, asyncHandler(controller.me));

export default router;
