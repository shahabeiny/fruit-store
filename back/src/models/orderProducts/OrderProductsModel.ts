import { Schema, model } from 'mongoose';
import IOrderProducts from '../../interfaces/IOrderProducts';

const OrderProductsSchema: Schema<IOrderProducts> = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    finalPrice: { type: Number, default: 0 },
    off: { type: Number },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    count: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default model<IOrderProducts>('OrderProducts', OrderProductsSchema);
