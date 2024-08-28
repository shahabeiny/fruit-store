import express, { Router } from 'express';
import controller from './controller';

const router: Router = express.Router();

// const validator = require('../../validation/favoriteValidator');
// const validate = require('../../middlewares/validate');

router
  .route('/favorite')
  .get(controller.getFavorites)
  .post(
    // validator.favoriteValidator(), 
    // validate, 
    controller.saveFavorite);

router.delete('/favorite/delete/:id', 
//  validator.paramIdValidator(), 
// validate,
 controller.deleteFavorite);

router.post('/rate/add', 
// validator.rateValidator(), 
// validate,
 controller.saveRate);

 export default router;
