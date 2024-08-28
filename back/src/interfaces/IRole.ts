import { Schema,Document } from 'mongoose';
import IPermission from './IPermission ';

interface IRole{
  _id: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  permissions: IPermission[];
  createdAt: Date;
  updatedAt: Date;
  usersNum:number;
}

export interface IEditRole{
  _id?: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  permissions: Schema.Types.ObjectId[];
}

export default IRole;
