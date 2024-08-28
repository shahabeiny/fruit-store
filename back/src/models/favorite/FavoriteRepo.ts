import { FilterQuery, Schema } from 'mongoose';
import Favorite from './FavoriteModel';

class FavoriteRepository {
  async createFavorite(productId: Schema.Types.ObjectId, userId: Schema.Types.ObjectId) {
    let saveNewFavorite = await Favorite.create({
      product: productId,
      user: userId
    });

    await saveNewFavorite.populate({
      path: 'product'
    });

    return saveNewFavorite;
  }

  async findOne(product: Schema.Types.ObjectId, user: Schema.Types.ObjectId) {
    return await Favorite.findOne({ product, user });
  }

  async findAllByUser(user: Schema.Types.ObjectId) {
    return await Favorite.find({ user });
  }

  async deleteOneById(
    product: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId
  ): Promise<Schema.Types.ObjectId> {
    await Favorite.deleteOne({ product, user }).exec();
    return product;
  }
}

export default FavoriteRepository;
