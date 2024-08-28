import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const errorHandler = (err: Error & { status: number }, req: Request, res: Response, next: NextFunction) => {
  winston.error(err.message, err);
  return res.status(err.status || 500).json({ message: err.message || 'خطای سرور' });
};

export default errorHandler;
