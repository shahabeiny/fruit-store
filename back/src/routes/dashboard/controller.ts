import autoBind from 'auto-bind';
import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import Controller from './../controller';
import OrderRepository from '../../models/order/OrderRepo';
import OrderProductsRepository from '../../models/orderProducts/OrderProductsRepo';
import IRole from '../../interfaces/IRole';
import { AuthRequest } from '../../interfaces/IRequest';

class DashboardController extends Controller {
  private orderRepo: OrderRepository;
  private orderProductsRepo: OrderProductsRepository;

  constructor() {
    super();
    autoBind(this);
    this.orderRepo = new OrderRepository();
    this.orderProductsRepo = new OrderProductsRepository();
  }

  async getDashboard(req: Request, res: Response) {
    const data: any = {};
    let infoUser = (req as AuthRequest).user!;
    let checkPermOrder = this.checkPermission('SHOW_ORDERS', infoUser.role);

    if (checkPermOrder) {
      data.totalPriceOrder = (await this.orderRepo.calculateTotalPriceOrder())[0]['totalOrderPrice'] ?? 0;
      data.notConfirmedOrder = await this.orderListNotConfirmed();
      data.notConfirmedOrderCount = await this.orderRepo.countStatusNotConfirmed();
    } else {
      data.totalPriceOrder =
        (await this.orderRepo.calculateTotalPriceOrder(infoUser._id))[0]['totalOrderPrice'] ?? 0;
      data.notConfirmedOrder = await this.orderListNotConfirmed(infoUser._id);
      data.notConfirmedOrderCount = await this.orderRepo.countStatusNotConfirmed(infoUser._id);
    }

    return this.response({
      res,
      message: `اطلاعات پیشخوان`,
      data
    });
  }

  /////////////////// helper

  async orderListNotConfirmed(userId?: Schema.Types.ObjectId) {
    let data: any = [];
    let query: { user?: Schema.Types.ObjectId } = {};
    // let query: Partial<{user: Schema.Types.ObjectId}> = {};

    if (userId) query.user = userId;

    const orderInfo = await this.orderRepo.getOrdersWithInfoUser({ finishCart: true, ...query });

    if (orderInfo.length > 0) {
      data = await Promise.all(
        orderInfo.map(async (order) => {
          const products = await this.orderProductsRepo.findAllByOrderId(order._id);
          return { orderInfo: { ...order }, products };
        })
      );
    }
    return data;
  }

  checkPermission = (permission: string, role: IRole) => {
    if (role) {
      console.log(role)
      return role.permissions.some((per) => per.nameEng === permission);
    }
    return false;
  };
}

export default new DashboardController();
