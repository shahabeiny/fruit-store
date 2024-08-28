import { Schema, model } from 'mongoose';
import ILoginInfo from '../../interfaces/ILoginInfo';

const loginInfoSchema: Schema<ILoginInfo> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    browser: { type: String },
    versionBrowser: { type: String },
    os: { type: String },
    versionOs: { type: String },
    ip: { type: String },
    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);

export default model<ILoginInfo>('LoginInfo', loginInfoSchema);
