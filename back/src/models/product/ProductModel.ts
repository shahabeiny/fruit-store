import { Schema, model } from 'mongoose';
import IProduct from '../../interfaces/IProduct';

const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 15 },
    nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
    banner: { type: String, required: true },
    slug: { type: String, required: true },
    desc: { type: String, minLength: 2, maxLength: 400, required: true },
    scientificDesc: {
      type: String,
      minLength: 2,
      maxLength: 400,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    total: { type: Number, required: true },
    eachCart: { type: Number, default: 1 },
    frozen: { type: Number, default: 0 },
    off: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    price: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
);

productSchema.virtual('rates', {
  ref: 'Rate',
  localField: '_id',
  foreignField: 'product'
});

export default model<IProduct>('Product', productSchema);
