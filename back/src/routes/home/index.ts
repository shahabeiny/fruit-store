import express, { Router} from 'express';
import controller from './controller';

const router: Router = express.Router();


router.get('/main', controller.main);
router.get('/header', controller.header);

export default router;
  