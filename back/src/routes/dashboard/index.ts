import express, { Router } from 'express';
import controller from './controller';

const router: Router = express.Router();

router.get('/dashboard', controller.getDashboard);

export default router;
