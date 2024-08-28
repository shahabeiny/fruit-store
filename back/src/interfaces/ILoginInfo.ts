import { Schema } from 'mongoose';

interface ILoginInfo {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  browser: string;
  versionBrowser: string;
  os: string;
  versionOs: string;
  ip: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ILoginInfo;
