import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import UserRepository from '../models/user/UserRepo';
import { AuthRequest } from '../interfaces/IRequest';


export async function isLoggined(req: Request, res: Response, next: NextFunction) {
  let UserRepo = new UserRepository();
  const token = req.get('Authorization')?.split(' ');

  if (!token || !token[1]) {
    res.status(403).send({ data: {}, message: 'امکان دسترسی ندارید' });
    return;
  }

  if (token.length !== 2 || token[0] !== 'Bearer') {
    res.status(403).send({ data: {}, message: 'توکن نامعتبر است' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token[1], config.get('access_token'));
    let user = await UserRepo.findOneById(decoded._id);
    if(user){
      user = await UserRepo.populateUserRole(user);
      (req as AuthRequest).user = user;
      next();
    }else{
      res.status(404).send({ data: {}, message: 'کاربر یافت نشد '});
    }

  } catch (ex) {
    res.status(403).send({ data: {}, message: 'توکن منقضی و نامعتبر است' });
  }
}

export async function isLogginedOptional(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get('Authorization')?.split(' ');
    if (!token || !token[1]) {
      (req as AuthRequest).user = null; // اگر توکنی ارسال نشده بود
      return next();
    }

    if (token.length !== 2 || token[0] !== 'Bearer') {
      (req as AuthRequest).user = null; // اگر توکن معتبری ارسال نشده بود
      return next();
    }

    const decoded: any = jwt.verify(token[1], config.get('access_token'));
    if (!decoded) {
      (req as AuthRequest).user = null; // اگر توکن منقضی شده بود
      return next();
    }


    let UserRepo = new UserRepository();
    let user = await UserRepo.findOneById(decoded._id);
    if (!user) {
      (req as AuthRequest).user = null; // کاربر وجود ندارد

      return next();
    }

    user = await UserRepo.populateUserRole(user);
    (req as AuthRequest).user = user;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    (req as AuthRequest).user = null;
    next();
  }
}
