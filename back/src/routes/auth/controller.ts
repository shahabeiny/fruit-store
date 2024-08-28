import Controller from './../controller';
import autoBind from 'auto-bind';
import SecurityService from '../../services/securityService';
import UserRepository from '../../models/user/UserRepo';
import LoginInfoRepository from '../../models/loginInfo/LoginInfoRepo';
import IUser from '../../interfaces/IUser';
import { Request, Response } from 'express';

class AuthController extends Controller {
  private UserRepo: UserRepository = new UserRepository();
  private LoginInfoRepo: LoginInfoRepository = new LoginInfoRepository();

  constructor() {
    super();
    autoBind(this);
  }

  async register(req: Request, res: Response) {
    const { email, mobile, username, password } = req.body;
    let result = { msg: '', code: 201, data: {} };

    let searchUsers = await this.UserRepo.findAllByEmailMobileOrUsername(email, mobile, username);

    if (searchUsers.length > 0) {
      for (let user of searchUsers) {
        let errors = this.checkErrorRegister(user, email, mobile, username);
        if (errors.length > 0) {
          result.msg =
            errors.length > 0 ? errors.map((error, index) => ` ${index + 1} : ${error}  `).join('\n') : '';
          result.code = 422;
        }
      }
    } else {
      result.data = await this.UserRepo.create({ email, mobile, username, password });

      result.msg = 'کاربر جدید با موفقیت ایجاد شد';
      result.code = 201;
    }

    this.response({
      res,
      message: result.msg,
      code: result.code,
      data: result.data
    });
  }

  async login(req: Request, res: Response) {
    let { email_or_phone, password } = req.body;

    let result = { msg: '', code: 200, data: {} };
    let isKindLogin = this.kindLogin(email_or_phone);

    let user = await this.UserRepo.findOneByCriteria({ [isKindLogin.nameEng]: email_or_phone });

    if (!user) {
      result.msg = 'کاربری با این مشخصات یافت نشد';
      result.code = 401;
    } else {
      const isValid = await SecurityService.comparePasswords(password, user.password);
      if (!isValid) {
        result.msg = `${isKindLogin.name} یا رمزعبور اشتباه است `;
        result.code = 400;
      } else {
        const accessToken = SecurityService.generateAccessToken(user._id);
        const refreshToken = SecurityService.generateRefreshToken(user._id);

        SecurityService.setRefreshTokenCookie(res, refreshToken);
        await this.LoginInfoRepo.saveLoginInfo(req, user._id, refreshToken);

        let getDetailUser = await this.UserRepo.populateUserRole(user);
        result.msg = 'با موفقیت وارد شدید';
        result.data = { user: getDetailUser, token: accessToken };
      }
    }

    this.response({
      res,
      message: result.msg,
      code: result.code,
      data: result.data
    });
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh-token'];

    if (!refreshToken) {
      return res.status(401).json({ message: 'رفرش توکن یافت نشد !!' });
    }

    const infoRefresh = await this.LoginInfoRepo.findOneByRefreshToken(refreshToken);
    if (!infoRefresh) {
      return res.status(401).json({ message: 'کاربر یافت نشد !!' });
    }

    const decoded = SecurityService.verifyToken(refreshToken, 'refresh');
    if (!decoded) {
      return res.status(401).json({ message: 'توکن معتبر نیست یا انقضا ندارد' });
    }

    const newAccessToken = SecurityService.generateAccessToken(infoRefresh.user);

    this.response({ res, code: 201, message: 'توکن دسترسی جدید صادر شد', data: newAccessToken });
  }

  async logout(req: Request, res: Response) {
    await SecurityService.logout(res);
    this.response({ res, code: 200, message: 'با موفقیت خارج شدید' });
  }

  ///////////////////// helper methods

  checkErrorRegister(user: IUser, email: string, mobile: string, username: string) {
    const errors = [];
    if (user.email === email) errors.push(' ایمیل قبلا ثبت شده است');
    if (user.mobile === mobile) errors.push(' شماره موبایل قبلا ثبت شده است');
    if (user.username === username) errors.push(' نام کاربری قبلا ثبت شده است');
    return errors;
  }

  kindLogin(email_or_phone: string): { name: string; nameEng: 'email' | 'mobile' } {
    const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return emailRegexp.test(email_or_phone)
      ? { name: 'ایمیل', nameEng: 'email' }
      : { name: 'موبایل', nameEng: 'mobile' };
  }
}

export default new AuthController();
