import { Schema } from 'mongoose';

interface IPermission {
  _id: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IPermission;
