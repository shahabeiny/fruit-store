import express, { Router } from 'express';
import controller from './controller';
import trimBody from '../../middlewares/trimBody';
import hasPermission from '../../middlewares/checkPermission';
import validateRequest from '../../middlewares/validateRequest';
import { idParamValidation, validationBody } from '../../validation/BaseValidations/commonValid';
import asyncHandler from '../../utils/asyncHandler';
import roleValidation from '../../validation/roleValidation';

const router: Router = express.Router();

roleValidation;
router
  .route('/role')
  .get(hasPermission(['SHOW_ROLES']), asyncHandler(controller.getRoles))
  .post(hasPermission(['EDIT_ROLES']), ...validationBody(roleValidation()), asyncHandler(controller.addRole))
  .put(hasPermission(['EDIT_ROLES']), ...validationBody(roleValidation()), asyncHandler(controller.editRole));

router.delete(
  '/role/:id',
  hasPermission(['EDIT_ROLES']),
  validateRequest({ params: idParamValidation('id','نقش') }),
  asyncHandler(controller.deleteRole)
);

export default router;
