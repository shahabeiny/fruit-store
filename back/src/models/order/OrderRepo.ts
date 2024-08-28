import { FilterQuery, Schema, UpdateQuery } from 'mongoose';
import Order from './OrderModel';
import IOrder from '../../interfaces/IOrder';

class OrderRepository {
  async countStatusNotConfirmed(user?: Schema.Types.ObjectId) {
    return await Order.countDocuments({ finishCart: true, status_delivery: 'not_confirmed', user });
  }

  async findOne(filter: FilterQuery<typeof Order>) {
    return await Order.findOne(filter).exec();
  }

  async findOneOrderOpen(user: Schema.Types.ObjectId, finishCart: boolean) {
    return await this.findOne({ user, finishCart });
  }

  async getOrdersWithInfoUser(filter: FilterQuery<typeof Order>) {
    return await Order.find(filter)
      .populate({ path: 'user', select: 'username email avatar mobile address' })
      .sort({ createdAt: -1 })
      .select('-__v -updatedAt')
      .lean();
  }

  async getOrdersWithoutInfoUser(filter: FilterQuery<typeof Order>) {
    return await Order.find(filter).sort({ createdAt: -1 }).select('-__v -updatedAt -user').lean();
  }

  async getCart(user: Schema.Types.ObjectId, finishCart: boolean) {
    return await Order.findOne({ user, finishCart }).sort({ createdAt: -1 }).select('-__v -updatedAt -user');
  }

  async create(time_cancel: Date, user: Schema.Types.ObjectId) {
    return await Order.create({
      time_cancel,
      user
    });
  }

  async deleteOneById(_id: Schema.Types.ObjectId) {
    let deletedOrder = await Order.findOneAndDelete({ _id }).lean();
    if (deletedOrder) {
      return deletedOrder;
    } else {
      return null;
    }
  }

  async updateById(_id: Schema.Types.ObjectId, editValues: Partial<IOrder>) {
    return await Order.findByIdAndUpdate(_id, editValues, {
      new: true
    })
      .select('-__v')
      .lean()
      .exec();
  }

  async calculateTotalPriceOrder(userId?: Schema.Types.ObjectId) {
    let userFilter: any = {};

    if (userId) {
      userFilter = { user: userId };
    }

    const filteredOrdersPipeline = [
      {
        $match: { ...userFilter, finishCart: true, status_delivery: { $in: ['not_delivered', 'delivered'] } }
      }
    ];

    const orderProductsPipeline = [
      { $lookup: { from: 'orderproducts', localField: '_id', foreignField: 'order', as: 'orderProducts' } },
      { $unwind: '$orderProducts' },
      {
        $addFields: {
          orderProductsTotalPrice: { $multiply: ['$orderProducts.finalPrice', '$orderProducts.count'] }
        }
      }
    ];

    const orderTotalPricePipeline = [
      {
        $group: {
          _id: '$_id',
          orderTotalPrice: { $sum: '$orderProductsTotalPrice' }
        }
      }
    ];

    const totalOrderPricePipeline = [
      {
        $group: {
          _id: null,
          totalOrderPrice: { $sum: '$orderTotalPrice' }
        }
      }
    ];

    const result = await Order.aggregate([
      ...filteredOrdersPipeline,
      ...orderProductsPipeline,
      ...orderTotalPricePipeline,
      ...totalOrderPricePipeline
    ]);
  
    return result;
  }
  
}

export default OrderRepository;
