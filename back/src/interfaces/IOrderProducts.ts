import { Schema,Document } from 'mongoose';

interface IOrderProducts extends Document {
  product: Schema.Types.ObjectId;
  finalPrice: number;
  off: number;
  order: Schema.Types.ObjectId;
  count: number;
}

export default IOrderProducts;