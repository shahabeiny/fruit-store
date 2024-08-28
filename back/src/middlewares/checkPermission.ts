import { Request, Response, NextFunction } from 'express';
import IPermission from '../interfaces/IPermission ';
import { AuthRequest } from '../interfaces/IRequest';

function hasPermission(requiredPermissions: string[]) {
  return function (req: Request, res: Response, next: NextFunction): void {
    let user  = (req as AuthRequest).user;
    if (!user) {
      res.status(403).send({ data: {}, message: 'شما دسترسی به این عملیات را ندارید' });
      return;
    }
 
    const userPermissions = user?.role.permissions.map((permission: IPermission) => permission.nameEng);

    const hasAllPermissions = requiredPermissions.every((permission) => userPermissions.includes(permission));

    if (hasAllPermissions) {
      next();
    } else {
      res.status(403).send({ data: {}, message: 'شما دسترسی به این عملیات را ندارید' });
    }
  };
}

export default hasPermission;
