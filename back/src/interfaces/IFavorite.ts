import { Schema } from 'mongoose';

interface IFavorite {
  _id: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default IFavorite;
