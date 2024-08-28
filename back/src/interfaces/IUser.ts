import { Schema, Document } from 'mongoose';
import IRole from './IRole';

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  family: string;
  username: string;
  email: string;
  mobile: string;
  address?: string;
  avatar: string;
  password: string;
  role: IRole;
  is_banned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCriteria {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  mobile: string;
  role: Schema.Types.ObjectId;
}

export interface ICreateUser {
  email: string;
  mobile: string;
  username: string;
  password: string;
}

export interface IProfile {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  mobile: string;
  role: Schema.Types.ObjectId;
}

export default IUser;
