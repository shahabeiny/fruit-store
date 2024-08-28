import { Schema, model } from 'mongoose';
import IRate from '../../interfaces/IRate';

const rateSchema: Schema<IRate> = new Schema(
  {
    rate: { type: Number },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { timestamps: true }
);

export default model<IRate>('Rate', rateSchema);
