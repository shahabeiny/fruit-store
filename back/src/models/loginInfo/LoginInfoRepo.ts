import CommonService from '../../services/commonService';
import { FilterQuery, Schema } from 'mongoose';
import LoginInfo from './LoginInfoModel';
import { Request } from 'express';

class LoginInfoRepository {
  async saveLoginInfo(req: Request, userId: Schema.Types.ObjectId, refreshToken: string) {
    let getIp = CommonService.getIPUser(req);
    let agent = CommonService.getAgentInfo(req.headers['user-agent'] || '');
    await LoginInfo.create({ user: userId, ip: getIp, ...agent, refreshToken });
  }

  async findOneByRefreshToken(refreshToken: string) {
    return await LoginInfo.findOne({refreshToken});
  }

  async findAllByUserId(userId: Schema.Types.ObjectId) {
    return await LoginInfo.find({user:userId}).select('-__v').sort({ createdAt: -1 });
  }
}

export default LoginInfoRepository;
