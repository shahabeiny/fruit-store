import { Schema,Document } from 'mongoose';

interface ICategory {
  _id: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  banner: string;
  slug: string;
  subName: string;
  createdAt: Date;
  updatedAt: Date;
  productsNum:number;
}

export interface IEditCategory{
  _id?: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  subName: string;
  banner?: string;
}



export default ICategory;
