import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Response } from 'express';

class SecurityService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  generateAccessToken(_id: Schema.Types.ObjectId, date = '5m'): string {
    return jwt.sign({ _id }, config.get<string>('access_token'), { expiresIn: date });
  }

  generateRefreshToken(_id: Schema.Types.ObjectId, date = '30d'): string {
    return jwt.sign({ _id }, config.get<string>('refresh_token'), { expiresIn: date });
  }

  verifyToken(token: string, nameToken: string) {
    return jwt.verify(token, config.get(`${nameToken}_token`));
  }

  setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
  }

  async logout(res: Response) {
    res.cookie('refresh-token', '', {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(0)
    });
  }
}


export default new SecurityService();
