import { Schema, model } from 'mongoose';
import IUser from '../../interfaces/IUser';

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, default: '' },
    family: { type: String, default: '' },
    username: { type: String, minLength: 2, maxLength: 20, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    address: { type: String },
    avatar: { type: String, default: '' },
    password: { type: String, required: true },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    is_banned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
