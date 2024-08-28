import autoBind from 'auto-bind';
import Controller from './../controller';
import UserRepository from '../../models/user/UserRepo';
import LoginInfoRepository from '../../models/loginInfo/LoginInfoRepo';
import { Request, Response } from 'express';

import { Schema } from 'mongoose';
import RoleRepository from '../../models/role/RoleRepo';
import { AuthRequest } from '../../interfaces/IRequest';
import IUser from '../../interfaces/IUser';
import Uploader from '../../services/uploadService';

class UserController extends Controller {
  private UserRepo: UserRepository = new UserRepository();
  private RoleRepo: RoleRepository = new RoleRepository();
  private Uploader: Uploader = new Uploader();

  constructor() {
    super();
    autoBind(this);
  }

  async getUsers(req: Request, res: Response) {
    const query = req.query.activeTab;
    let seachUser = {};

    if (query === 'nonbanned') {
      seachUser = { is_banned: false };
    } else if (query === 'banned') {
      seachUser = { is_banned: true };
    }

    let users = await this.UserRepo.findAll(seachUser);
    for (let i = 0; i < users.length; i++) {
      users[i] = await this.UserRepo.populateUserRole(users[i]);
    }

    const roles = await this.RoleRepo.findAll();

    return this.response({
      res,
      message: 'لیست کاربران ',
      data: { users, roles }
    });
  }

  async editUser(req: Request, res: Response) {
    let { _id, name, family, username, email, mobile, address, role } = req.body;

    const isExistUser = await this.UserRepo.findOneById(_id);
    if (!isExistUser) {
      return this.response({
        res,
        code: 404,
        message: 'کاربر یافت نشد'
      });
    }

    const isExistValueUser = await this.UserRepo.checkUserExists({ username, email, mobile }, _id);
    if (isExistValueUser) {
      return this.response({ res, code: 422, message: 'این مقادیر برای کاربر دیگری ثبت شده است' });
    }

    const editValues: Partial<IUser> = { name, family, username, email, mobile, address, role };

    if (req.files && req.files.avatar) {
      editValues.avatar = await this.Uploader.uploadFile(req, 'avatar');
    }

    const updatedUser = await this.UserRepo.updateById(_id, editValues);

    return this.response({
      res,
      message: `کاربر ${username} با موفقیت ویرایش شد`,
      data: updatedUser
    });
  }

  async editProfile(req: Request, res: Response) {
    let {_id,username} = (req as AuthRequest).user!;
    let { name, family, address } = req.body;

    const editValues: Partial<IUser> = { name, family, address };

  if (req.files && req.files.avatar) {
      editValues.avatar = await this.Uploader.uploadFile(req, 'avatar');
    }

    let updatedProfile = await this.UserRepo.updateById(_id, editValues);

    return this.response({
      res,
      message: `کاربر ${username} با موفقیت ویرایش شد`,
      data: updatedProfile
    });
  }

  async bannUser(req: Request, res: Response) {
    let { _id, is_banned } = req.body;
    
    const isExistUser = await this.UserRepo.findOneById(_id);
    if (!isExistUser) {
      return this.response({
        res,
        code: 404,
        message: 'کاربر یافت نشد'
      });
    }

    await this.UserRepo.updateById(_id, { is_banned });

    return this.response({
      res,
      message: ` کاربر موردنظر با موفقیت ${is_banned ? 'حذف' : 'بازگردانی'} شد`,
      data: { _id, is_banned }
    });
  }

  async deleteUser(req: Request, res: Response) {
    const _id = new Schema.Types.ObjectId(req.params.id);

    const isExistUser = await this.UserRepo.findOneById(_id);
    if (!isExistUser) {
      return this.response({
        res,
        code: 404,
        message: 'کاربر یافت نشد'
      });
    }

    const deletedUser = await this.UserRepo.deleteOneById(_id);

    return this.response({
      res,
      message: ` کاربر موردنظر با موفقیت حذف شد`,
      data: deletedUser
    });
  }

  async loginInfo(req: Request, res: Response) {
    let _id = (req as AuthRequest).user!._id;
    let loginInfoRepo = new LoginInfoRepository();
    const info = await loginInfoRepo.findAllByUserId(_id);

    return this.response({
      res,
      message: `اطلاعات ورود کاربر`,
      data: info
    });
  }

  async me(req: Request, res: Response) {
    this.response({
      res,
      message: 'با موفقیت وارد شدید',
      data: (req as AuthRequest).user
    });
  }
}

export default new UserController();
