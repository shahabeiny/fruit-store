import mongoose, { Schema,Document } from 'mongoose';
import IRate from './IRate';

interface IProduct extends Document{
  _id: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  banner: string;
  slug: string;
  desc: string;
  scientificDesc: string;
  category: mongoose.Types.ObjectId;
  total: number;
  eachCart: number;
  frozen: number;
  off: number;
  sold: number;
  price: number;
  is_deleted: boolean;
  rates?: IRate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEditProduct{
  _id?: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  banner?: string;
  slug?: string;
  desc: string;
  scientificDesc: string;
  category: Schema.Types.ObjectId;
  total: number;
  eachCart: number;
  frozen: number;
  off: number;
  sold: number;
  price: number;
  rates?: IRate[];
}

export interface IProductCriteria {
  _id: Schema.Types.ObjectId;
  name: string;
  nameEng: string;
  slug: string;
  category: Schema.Types.ObjectId;
}

export default IProduct;
