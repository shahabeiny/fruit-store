import autoBind from 'auto-bind';
import Controller from './../controller';
import RoleRepository from '../../models/role/RoleRepo';
import PermissionRepository from '../../models/permission/PermissionRepo';
import UserRepository from '../../models/user/UserRepo';
import { Request, Response } from 'express';

class RoleController extends Controller {
  private RoleRepo: RoleRepository = new RoleRepository();
  private UserRepo: UserRepository = new UserRepository();
  private PermRepo: PermissionRepository = new PermissionRepository();

  constructor() {
    super();
    autoBind(this);
  }

  async getRoles(req: Request, res: Response) {
    const roles = await this.RoleRepo.getRoles();
    const permissions = await this.PermRepo.getPermissionsList();

    return this.response({
      res,
      message: ' لیست نقش ها ',
      data: { roles, permissions }
    });
  }

  async addRole(req: Request, res: Response) {
    let { name, nameEng, permissions } = req.body;

    const isExistValueRole = await this.RoleRepo.findOneByCriteria({ name });
    if (isExistValueRole) {
      return this.response({ res, code: 422, message: 'این نام برای نقش دیگری ثبت شده است' });
    }

    let newRrole = await this.RoleRepo.createRole({ name, nameEng, permissions });

    return this.response({
      res,
      code: 201,
      message: 'نقش جدید با موفقیت ذخیره شد',
      data: newRrole
    });
  }

  async editRole(req: Request, res: Response) {
    let { _id, name, nameEng, permissions } = req.body;

    const isExistRole = await this.RoleRepo.findOneById(_id);
    if (!isExistRole) {
      return this.response({
        res,
        code: 404,
        message: 'نقش یافت نشد'
      });
    }

    const isExistValueRole = await this.RoleRepo.findOneByCriteria({ name }, _id);
    if (isExistValueRole) {
      return this.response({ res, code: 422, message: 'این نام برای نقش ذیگری ثبت شده است' });
    }

    const updatedRole = await this.RoleRepo.updateById(_id, { name, nameEng, permissions });

    return this.response({
      res,
      message: 'نقش با موفقیت ویرایش شد',
      data: updatedRole
    });
  }

  async deleteRole(req: Request, res: Response) {
    const _id = req.params.id as any;

    const isExistRole = await this.RoleRepo.findOneById(_id);
    if (!isExistRole) {
      return this.response({
        res,
        code: 404,
        message: 'نقش یافت نشد'
      });
    }

    const isExistUser = await this.UserRepo.checkUserExists({ role: _id });
    if (isExistUser) {
      return this.response({
        res,
        code: 409,
        message: 'این نقش استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }

    const deletedRole = await this.RoleRepo.deleteOneById(_id);

    return this.response({
      res,
      message: 'نقش با موفقیت حذف شد',
      data: deletedRole
    });
  }
}

export default new RoleController();