import OrderRepository from '../../models/order/OrderRepo';
import OrderProductsRepository from '../../models/orderProducts/OrderProductsRepo';
import ProductRepository from '../../models/product/ProductRepo';
import { Request, Response } from 'express';
import Controller from './../controller';
import autoBind from 'auto-bind';
import { AuthRequest } from '../../interfaces/IRequest';
import convertPriceWithOffs from '../../utils/convertPriceWithOffs';

class CartController extends Controller {
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

  async addCart(req: Request, res: Response) {
    const { productId } = req.body;
    let userId  = (req as AuthRequest).user!._id;

    // 1. Check if the product is in stock
    const product = await this.ProductRepo.findOneById(productId);

    if (!product || product.total === 0) {
      return this.response({
        res,
        code: 422,
        message: 'محصول موجودی ندارد'
      });
    }

    // 2. Check if the user has an open order, create one if not
    let findOrder = await this.OrderRepo.findOneOrderOpen(userId, false);

    if (!findOrder) {
      findOrder = await this.OrderRepo.create(this.addHours(new Date(), 3), userId);

      // Create OrderProducts for the new order
      await this.OrderProductRepo.create(productId, findOrder._id);
    } else {
      // 3. Check if the product already exists in the order
      const existProductInOrder = await this.OrderProductRepo.findOneProductInOrder(findOrder._id, productId);

      if (existProductInOrder) {
        // 4. If the product exists, update its quantity
        if (existProductInOrder.count < product.eachCart) {
          await this.OrderProductRepo.updateCountById(existProductInOrder._id, 1);
        } else {
          return this.response({
            res,
            code: 401,
            message: `شما دارای محدودیت ${product.eachCart} کیلوگرم در هر سبد می باشید`
          });
        }
      } else {
        // 5. If the product is not in the order, add it
        await this.OrderProductRepo.create(productId, findOrder._id);
      }
    }

    // 6. Update the product size information
    const updatedProduct = await this.ProductRepo.updateCountById(productId, {
      $inc: { total: -1, frozen: 1 }
    });

    const successMessage = findOrder ? 'سفارش با موفقیت ثبت شد' : 'محصول با موفقیت به سفارش افزوده شد';

    return this.response({
      res,
      code: 201,
      message: successMessage,
      data: updatedProduct
    });
  }

  async muinesCart(req: Request, res: Response) {
    const { productId, productOrderId } = req.body;

    // Update ProductSize
    const productUpdated = await this.ProductRepo.updateCountById(productId, { $inc: { total: 1, frozen: -1 } });

    // Update OrderProducts
    await this.OrderProductRepo.updateCountById(productOrderId, -1);

    return this.response({
      res,
      message: 'تعداد با موفقیت کم شد',
      data: productUpdated
    });
  }

  async deleteCart(req: Request, res: Response) {
    const orderId = req.params.orderId as any;

    const orderProducts = await this.OrderProductRepo.findAllByOrderId(orderId);

    for (const pro of orderProducts) {
      let product = await this.ProductRepo.findOneById(pro.product);
      if (product) {
        product.frozen -= pro.count;
        product.total += pro.count;
        await product.save();
      }
    }

    await this.OrderRepo.deleteOneById(orderId);
    await this.OrderProductRepo.deleteManyByOrderId(orderId);

    return this.response({
      res,
      message: 'کل سبد خرید با موفقیت حذف شد'
    });
  }

  async deleteProduct(req: Request, res: Response) {
    const productOrderId = req.params.productOrderId as any;

    const findProductOrder = await this.OrderProductRepo.findOneById(productOrderId);

    if (!findProductOrder) {
      return this.response({
        res,
        code: 404,
        message: 'محصولی با این شناسه در سبد یافت نشد'
      });
    }

    const countProductsInOrder = await this.OrderProductRepo.countByOrderId(findProductOrder.order);
    if (countProductsInOrder === 1) {
      // There is only this product in the shopping cart so all shopping cart
      await this.OrderRepo.deleteOneById(findProductOrder.order);
      await this.OrderProductRepo.deleteOneByOrderId(findProductOrder.order);
    } else {
      // only this product remove from the shopping cart
      await this.OrderProductRepo.deleteOneByOrderId(findProductOrder.order);
    }
    // In any case, we have a product, so we need to edit it
    const updatedProduct = await this.ProductRepo.findOneById(findProductOrder.product);

    if (updatedProduct) {
      updatedProduct.frozen -= findProductOrder.count;
      updatedProduct.total += findProductOrder.count;
      await updatedProduct.save();
    }

    return this.response({
      res,
      message: 'محصول با موفقیت از سبد خرید حذف شد',
      data: productOrderId
    });
  }

  async getCart(req: Request, res: Response) {
    let data = {};
    let userId  = (req as AuthRequest).user!._id;

    const orderInfo = await this.OrderRepo.getCart(userId, false);

    if (orderInfo) {
      const orderProducts = await this.OrderProductRepo.findAllByOrderId(orderInfo._id);
     let products = await Promise.all(
      orderProducts.map(async (orderPro) => orderPro)
      );
      data = { orderInfo, products };
    }

    return this.response({ res, message: 'لیست سبد خرید', data });
  }

  async finishCart(req: Request, res: Response) {
    let user  = (req as AuthRequest).user!;
    let { orderId, name, family, address } = req.body;

    user.name = name;
    user.family = family;
    user.address = address;
    let changeUser = await user.save();

    let getAllPro = await this.OrderProductRepo.findAllByOrderId(orderId);

    for (let pro of getAllPro) {
      let product = await this.ProductRepo.findOneById(pro.product);
      let orderProduct = await this.OrderProductRepo.findOneById(pro._id);  
      if (product && orderProduct) {  
        orderProduct.off = product.off;
        orderProduct.finalPrice =
          product.off > 0 ? convertPriceWithOffs(product.price, product.off) : product.price;
        await orderProduct.save(); 
    
        product.frozen = product.frozen - orderProduct.count;  
        product.sold = product.sold + orderProduct.count;  
        await product.save();
      }
    }

    await this.OrderRepo.updateById(orderId, { finishCart: true });
    return this.response({
      res,
      message: 'سفارش نهایی شد',
      data: changeUser
    });
  }

  /////////// helper method

  addHours(date: Date, hours: number): Date {
    const newTime = date.getTime() + hours * 60 * 60 * 1000;
    return new Date(newTime);
  }
}

export default new CartController();
