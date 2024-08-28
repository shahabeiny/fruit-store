import autoBind from 'auto-bind';
import Controller from './../controller';
import CategoryRepository from '../../models/category/CategoryRepo';
import ProductRepository from '../../models/product/ProductRepo';
import { Request, Response } from 'express';
import { IEditCategory } from '../../interfaces/category/ICategory';
import Uploader from '../../services/uploadService';

class CategoryController extends Controller {
  private CategoryRepo: CategoryRepository = new CategoryRepository();
  private ProductRepo: ProductRepository = new ProductRepository();
  private Uploader: Uploader = new Uploader();

  constructor() {
    super();
    autoBind(this);
  }

  async getCategories(req: Request, res: Response): Promise<void> {
    const categories = await this.CategoryRepo.getCategories();
    this.response({
      res,
      code: 200,
      message: 'لیست دسته بندی ها',
      data: categories
    });
  }

  async saveCategory(req: Request, res: Response): Promise<void> {
    const { name, nameEng, subName } = req.body;

    const isExistValueCategory = await this.CategoryRepo.findOneByCriteria({ name });
    if (isExistValueCategory) {
      return this.response({ res, code: 422, message: 'این نام برای دسته بندی دیگری ثبت شده است' });
    }

    const banner = await this.Uploader.uploadFile(req, 'banner');

    const newCategory = await this.CategoryRepo.create({ name, nameEng, subName, banner });

    this.response({
      res,
      code: 201,
      message: 'دسته بندی جدید با موفقیت ذخیره شد',
      data: newCategory
    });
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    const { name, nameEng, subName, _id } = req.body;

    const isExistCategory = await this.CategoryRepo.findOneById(_id);
    if (!isExistCategory) {
      return this.response({
        res,
        code: 404,
        message: 'دسته بندی یافت نشد'
      });
    }

    const isExistValueCategory = await this.CategoryRepo.findOneByCriteria({ name }, _id);
    if (isExistValueCategory) {
      return this.response({ res, code: 422, message: 'این نام برای دسته بندی دیگری ثبت شده است' });
    }

    const editValues: IEditCategory = { name, nameEng, subName };

    if (req.files && req.files.banner) {
      editValues.banner = await this.Uploader.uploadFile(req, 'banner');
    }

    const updatedCategory = await this.CategoryRepo.updateById(_id, editValues);

    this.response({
      res,
      code: 200,
      message: 'دسته بندی با موفقیت ویرایش شد',
      data: updatedCategory
    });
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const _id = req.params.id as any;

    const isExistCategory = await this.CategoryRepo.findOneById(_id);
    if (!isExistCategory) {
      return this.response({
        res,
        code: 404,
        message: 'دسته بندی یافت نشد'
      });
    }

    const isExistProduct = await this.ProductRepo.findOneByCriteria({ category: _id });
    if (isExistProduct) {
      return this.response({
        res,
        code: 409,
        message: 'این دسته بندی استفاده شده و امکان حذف آن وجود ندارد!'
      });
    }

    const deletedCategory = await this.CategoryRepo.deleteOneById(_id);

    return this.response({
      res,
      code: 200,
      message: 'دسته بندی با موفقیت حذف شد',
      data: deletedCategory
    });
  }
}

export default new CategoryController();
