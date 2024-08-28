import { Schema, model } from 'mongoose';
import ICategory from '../../interfaces/category/ICategory';

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 15 },
    nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
    banner: { type: String, required: true },
    slug: { type: String, required: true },
    subName: { type: String, minLength: 2, maxLength: 20, required: true }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
);

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category'
});

export default model<ICategory>('Category', categorySchema);
