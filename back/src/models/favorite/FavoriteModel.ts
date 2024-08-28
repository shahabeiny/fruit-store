import { Schema, model } from 'mongoose';
import IFavorite from '../../interfaces/IFavorite';

const favoriteSchema: Schema<IFavorite> = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export default model<IFavorite>('Favorite', favoriteSchema);
