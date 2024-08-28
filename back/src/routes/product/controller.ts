import { Request, Response } from 'express';
import Controller from './../controller';
import autoBind from 'auto-bind';
import ProductRepository from '../../models/product/ProductRepo';
import CategoryRepository from '../../models/category/CategoryRepo';
import RateRepository from '../../models/rate/RateRepo';
import { AuthRequest } from '../../interfaces/IRequest';
import IProduct from '../../interfaces/IProduct';
import Uploader from '../../services/uploadService';

class ProductController extends Controller {
  private RateRepo: RateRepository = new RateRepository();
  private ProductRepo: ProductRepository = new ProductRepository();
  private CategoryRepo: CategoryRepository = new CategoryRepository();
  private Uploader: Uploader = new Uploader();

  constructor() {
    super();
    autoBind(this);
  }

  async getInfoProduct(req: Request, res: Response): Promise<void> {
    const user = (req as AuthRequest).user! || null;

    const product = await this.ProductRepo.findOneWithCatAndRateByCriteria({ slug: req.params.slug });

    if (!product) {
      return this.response({
        res,
        message: 'محصولی با این مشخصات یافت نشد!',
        data: null,
        code: 404
      });
    }

    const myRate = user?._id ? (await this.RateRepo.findOne(product._id, user._id))?.rate : 0;

    return this.response({
      res,
      message: `جزییات محصول ${product.name}`,
      data: { product, myRate:0 }
    });
  }

  async getProductsStore(req: Request, res: Response): Promise<void> {
    let queryCat = req.params.slug !== 'all' ? req.params.slug : null;
    const category = queryCat ? await this.CategoryRepo.findOneByCriteria({ slug: queryCat }) : null;
    let products = await this.ProductRepo.findAllWithCatAndRateByCriteria(
      queryCat ? { category: category?._id } : {}
    );

    return this.response({
      res,
      message: 'Product list',
      data: { products, category }
    });
  }

  async saveProduct(req: Request, res: Response): Promise<void> {
    const { name, nameEng, desc, scientificDesc, categoryId, total, eachCart, off, frozen, sold, price } =
      req.body;

    const isExistValues = await this.checkExistValues(name, categoryId, res);
    if (isExistValues) return;

    const banner = await this.Uploader.uploadFile(req, 'banner');

    const newProduct = await this.ProductRepo.createProduct({
      banner,
      name,
      nameEng,
      category: categoryId,
      desc,
      scientificDesc,
      total,
      eachCart,
      frozen,
      sold,
      price,
      off
    });

    return this.response({
      res,
      code: 201,
      message: 'محصول جدید با موفقیت ذخیره شد',
      data: newProduct
    });
  }

  async editProduct(req: Request, res: Response): Promise<void> {
    const {
      name,
      nameEng,
      desc,
      scientificDesc,
      categoryId,
      off,
      total,
      eachCart,
      frozen,
      sold,
      price,
      _id
    } = req.body;

    const isExistProduct = await this.ProductRepo.findOneById(_id);
    if (!isExistProduct) {
      return this.response({
        res,
        code: 404,
        message: 'محصول یافت نشد'
      });
    }

    const isExistValues = await this.checkExistValues(name, categoryId, res, _id);
    if (isExistValues) return;

    const editValues: Partial<IProduct> = {
      name,
      nameEng,
      desc,
      scientificDesc,
      category: categoryId,
      off,
      total,
      eachCart,
      frozen,
      sold,
      price
    };

    if (req.files && req.files.banner) {
      editValues.banner = await this.Uploader.uploadFile(req, 'banner');
    }

    const productUpdated = await this.ProductRepo.updateById(_id, editValues);

    return this.response({ res, message: 'محصول با موفقیت ویرایش شد', data: productUpdated });
  }

  async getProductsPanel(req: Request, res: Response): Promise<void> {
    const data: any = {};
    const query = JSON.parse(JSON.stringify(req.query) as any);

    if (query.is_panel && query.is_panel === 'true') {
      data.categories = await this.CategoryRepo.findAll();
    }
    data.products = await this.getListProducts(query);

    return this.response({ res, message: 'Product list', data });
  }

  //////////////////////////////////// helper methods

  async getListProducts(query: any): Promise<any[]> {
    const findQuery: any = {};

    if (query.name) {
      findQuery['name'] = new RegExp('.*' + query.name + '.*', 'i');
    }

    if (query.category) {
      const category = await this.CategoryRepo.findOneByCriteria({ slug: query.category });
      if (!category) {
        return [];
      }
      findQuery['category'] = category._id;
    }
    const hasFilters = Object.keys(findQuery).length > 0 ? findQuery : {};
    return await this.ProductRepo.findAllWithCatAndRateByCriteria(hasFilters);
  }

  private async checkExistValues(name: string, categoryId: any, res: Response, _id?: any): Promise<boolean> {
    const isExistValueProduct = await this.ProductRepo.checkExistByCriteria(
      { name, category: categoryId },
      _id
    );
    if (isExistValueProduct) {
      this.response({
        res,
        code: 422,
        message: 'این نام برای محصول دیگری در این دسته بندی ثبت شده است'
      });
      return true;
    }
    return false;
  }
}

export default new ProductController();
