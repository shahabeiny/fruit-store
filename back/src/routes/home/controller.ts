import autoBind from 'auto-bind';
import Controller from '../controller';
import { Request, Response } from 'express';
import CategoryRepository from '../../models/category/CategoryRepo';
import ProductRepository from '../../models/product/ProductRepo';
import OrderProductsRepository from '../../models/orderProducts/OrderProductsRepo';

class MainController extends Controller {
  private categoryRepo: CategoryRepository;

  constructor() {
    super();
    autoBind(this);
    this.categoryRepo = new CategoryRepository();
  }

  async main(req: Request, res: Response) {
    const productRepo = new ProductRepository();
    const orderProductsRepo = new OrderProductsRepository();
   
    this.response({
      res,
      message: ' لیست محصولات ',
      data: {
        newest: await productRepo.findAllWithCatAndRateByCriteria(),
        categories: await this.categoryRepo.findAll(),
        sellingProducts: await orderProductsRepo.findBestSellingProducts()
      }
    });
  }

  async header(req: Request, res: Response) {
    this.response({ res, message: ' لیست دسته بندی های هدر ', data: await this.categoryRepo.findAll() });
  }
}

export default new MainController();
