import FavoriteRepository from '../../models/favorite/FavoriteRepo';
import RateRepository from '../../models/rate/RateRepo';
import Controller from './../controller';
import { Request,Response } from 'express';
import autoBind from 'auto-bind';
import ProductRepository from '../../models/product/ProductRepo';
import { Schema } from 'mongoose';
import { AuthRequest } from '../../interfaces/IRequest';


class FavoriteController extends Controller {
  private RateRepo: RateRepository;
  private FavoriteRepo: FavoriteRepository;

  constructor() {
    super();
    autoBind(this);
    this.RateRepo = new RateRepository();
    this.FavoriteRepo = new FavoriteRepository();
  }

  async saveFavorite(req: Request, res: Response) {
    const userId  = (req as AuthRequest).user!._id;
    let { productId } = req.body;
    
    if (await this.FavoriteRepo.findOne(productId, userId )) {
      return this.response({ res, code: 422, message: 'این محصول در علاقه مندی ها قبلا ثبت شده است' });
    }

    let saveNewFavorite = await this.FavoriteRepo.createFavorite(productId, userId);

    return this.response({
      res,
      code: 201,
      message: 'محصول به لیست علاقه مندی ها افزوده شد',
      data: saveNewFavorite
    });
  }

  async getFavorites(req: Request, res: Response) {
    const userId  = (req as AuthRequest).user!._id;
    const favoriteProducts = await this.FavoriteRepo.findAllByUser(userId );

    if (favoriteProducts.length === 0) {
      return this.response({
        res,
        message: 'محصولی یافت نشد!',
        data: null,
        code: 404
      });
    }

    const productsArray = favoriteProducts.map((favorite) => favorite.product);
    let ProductRepo = new ProductRepository();
    let listProduct = await ProductRepo.findAllByIds(productsArray);

    return this.response({
      res,
      message: `لیست علاقه مندی ها `,
      data: await Promise.all(
        listProduct.map(async (product) => {
          product = await ProductRepo.populateProduct(product);
          return {
            ...product,
            rates: this.RateRepo.calculateRate(product.rates ?? [])
          };
        })
      )
    });
  }

  async deleteFavorite(req: Request, res: Response) {
    const userId  = (req as AuthRequest).user!._id;
    const productId = new Schema.Types.ObjectId(req.params.id);

    return this.response({
      res,
      message: 'با موفقیت حذف شد',
      data: await this.FavoriteRepo.deleteOneById(productId, userId)
    });
  }

  async saveRate(req: Request, res: Response) {
    const userId  = (req as AuthRequest).user!._id;
    let { productId, rate } = req.body;

    const isExistValues = await this.RateRepo.findOne(productId, userId );
    
    if (isExistValues) {
      return this.response({ res, code: 422, message: 'شما قبلا به این محصول امتیاز داده اید' });
    }

    let saveRate = await this.RateRepo.create(rate, userId, productId);

     this.response({
      res,
      code: 201,
      message: 'امتیاز شما با موفقیت ثبت شد',
      data: saveRate.rate
    });
  }
}

export default new FavoriteController();
