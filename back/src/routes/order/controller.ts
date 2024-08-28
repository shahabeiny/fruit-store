import OrderRepository from '../../models/order/OrderRepo';
import OrderProductsRepository from '../../models/orderProducts/OrderProductsRepo';
import ProductRepository from '../../models/product/ProductRepo';
import { Request, Response } from 'express';
import Controller from './../controller';
import autoBind from 'auto-bind';
import { AuthRequest } from '../../interfaces/IRequest';

class OrderController extends Controller {
  private OrderRepo: OrderRepository;
  private ProductRepo: ProductRepository;
  private OrderProductRepo: OrderProductsRepository;

  constructor() {
    super();
    autoBind(this);
    this.OrderRepo = new OrderRepository();
    this.ProductRepo = new ProductRepository();
    this.OrderProductRepo = new OrderProductsRepository();
  }

  async getOrders(req: Request, res: Response) {
    const { activeTab } = req.query;
    let userId  = (req as AuthRequest).user!._id;
    let data: any = [];

    const queryOptions = activeTab ? { status_delivery: activeTab } : {};

    const orderInfo = await this.OrderRepo.getOrdersWithoutInfoUser({
      user: userId,
      finishCart: true,
      ...queryOptions
    });

    if (orderInfo.length > 0) {
      data = await Promise.all(
        orderInfo.map(async (order) => {
          const products = await this.OrderProductRepo.findAllByOrderId(order._id);
          return { orderInfo: { ...order }, products };
        })
      );
    }

    return this.response({ res, message: 'لیست سفارشات خرید', data });
  }

  async getOrdersAdmin(req: Request, res: Response) {
    const { activeTab } = req.query;
    let data: any = [];

    const queryOptions = activeTab ? { status_delivery: activeTab } : {};

    const orderInfo = await this.OrderRepo.getOrdersWithInfoUser({ finishCart: true, ...queryOptions });

    if (orderInfo.length > 0) {
      data = await Promise.all(
        orderInfo.map(async (order) => {
          const products = await this.OrderProductRepo.findAllByOrderId(order._id);
          return { orderInfo: { ...order }, products };
        })
      );
    }

    return this.response({ res, message: 'لیست سفارشات ادمین', data });
  }

  async confirmOrder(req: Request, res: Response) {
    const { orderId, operate } = req.body;

    const updatedOrder = await this.OrderRepo.updateById(
      orderId,
      operate ? { status_delivery: 'not_delivered' } : { status_delivery: 'canceled' }
    );

    if (!operate) {
      const orderProducts = await this.OrderProductRepo.findAllByOrderId(orderId);

      for (const pro of orderProducts) {
        let product = await this.ProductRepo.findOneById(pro.product);
        if (product) {
          product.sold -= pro.count;
          product.total += pro.count;
          await product.save();
        }
      }
    }

    return this.response({
      res,
      message: `سفارش با موفقیت ${operate ? 'تایید' : 'کنسل'} شد`,
      data: updatedOrder
    });
  }
}

export default new OrderController();
