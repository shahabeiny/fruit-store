import { FilterQuery, Schema, UpdateQuery } from 'mongoose';
import OrderProducts from './OrderProductsModel';
import IOrderProducts from '../../interfaces/IOrderProducts';

class OrderProductsRepository {
  async countByOrderId(order: Schema.Types.ObjectId) {
    return await OrderProducts.countDocuments({ order });
  }

  async findOne(filter: FilterQuery<typeof OrderProducts>) {
    return await OrderProducts.findOne(filter).exec();
  }

  async findOneById(_id: Schema.Types.ObjectId) {
    return await this.findOne({ _id });
  }

  async findOneProductInOrder(order: Schema.Types.ObjectId, product: Schema.Types.ObjectId) {
    return await this.findOne({ order, product });
  }

  async findAll(filter: FilterQuery<typeof OrderProducts>) {
    return await OrderProducts.find(filter).populate({ path: 'product', select: '-__v' })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findAllByOrderId(order: Schema.Types.ObjectId) {
    return await this.findAll({order})
  }

  async populateProduct(orderProducts: IOrderProducts) {
    return orderProducts.populate({ path: 'product', select: '-__v' });
  }

  async create(product: Schema.Types.ObjectId, order: Schema.Types.ObjectId) {
    return await OrderProducts.create({
      product,
      order
    });
  }

  async deleteOneByOrderId(order: Schema.Types.ObjectId) {
    let deletedOrderProducts = await OrderProducts.findOneAndDelete({order}).lean();
    if (deletedOrderProducts) {
      return deletedOrderProducts;
    } else {
      return null;
    }
  }

  async deleteManyByOrderId(order: Schema.Types.ObjectId) {
    return await OrderProducts.deleteMany({order}).lean();
  }

  async updateCountById(_id: Schema.Types.ObjectId, count:number) {
    return await OrderProducts.findByIdAndUpdate(_id,  { $inc: { count } }, {
      new: true
    }).exec();
  }

  findBestSellingProducts = async () => {
    const orders = OrderProducts.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'order',
          foreignField: '_id',
          as: 'order_info'
        }
      },
      {
        $match: {
          'order_info.finishCart': true,
          'order_info.status_delivery': { $in: ['delivered', 'not_delivered'] }
        }
      },
      {
        $group: {
          _id: '$product',
          totalOrders: { $sum: '$count' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product_info'
        }
      },
      {
        $unwind: '$product_info'
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'product_info.category',
          foreignField: '_id',
          as: 'category_info'
        }
      },
      {
        $lookup: {
          from: 'rates',
          localField: '_id',
          foreignField: 'product',
          as: 'rate_info'
        }
      },
      {
        $project: {
          _id: '$product_info._id',
          name: '$product_info.name',
          nameEng: '$product_info.nameEng',
          banner: '$product_info.banner',
          slug: '$product_info.slug',
          price: '$product_info.price',
          off: '$product_info.off',
          category: {
            _id: { $arrayElemAt: ['$category_info._id', 0] },
            name: { $arrayElemAt: ['$category_info.name', 0] },
            nameEng: { $arrayElemAt: ['$category_info.nameEng', 0] },
            image: { $arrayElemAt: ['$category_info.banner', 0] },
            slug: { $arrayElemAt: ['$category_info.slug', 0] },
            desc: { $arrayElemAt: ['$category_info.subName', 0] }
          },
          rates: { $avg: '$rate_info.rate' },
          createdAt: '$product_info.createdAt',
          totalOrders: 1
        }
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 }
    ]);

    return orders;
  };
}

export default OrderProductsRepository;
