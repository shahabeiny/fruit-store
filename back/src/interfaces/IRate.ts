import { Schema } from 'mongoose';

interface IRate extends Document {
  _id: Schema.Types.ObjectId;
  rate: number;
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default IRate;
