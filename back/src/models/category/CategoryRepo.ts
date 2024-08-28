import { FilterQuery, Schema } from 'mongoose';
import ICategory, { IEditCategory } from '../../interfaces/category/ICategory';
import ProductRepository from '../product/ProductRepo';
import Category from './CategoryModel';
import CommonService from '../../services/commonService';
import ICategoryRepository from '../../interfaces/category/ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private ProductRepo: ProductRepository = new ProductRepository();

  async findAll(): Promise<ICategory[]> {
    return Category.find({}).sort({ createdAt: -1 }).select('-__v').lean();
  }

  async getCategories(): Promise<ICategory[]> {
    const categories = await this.findAll();
    const categoriesWithProductCount: ICategory[] = await Promise.all(
      categories.map(async (category) => {
        const productsNum = await this.ProductRepo.countProduct({ category: category._id });
        return { ...category, productsNum };
      })
    );

    return categoriesWithProductCount;
  }

  async create(input: IEditCategory): Promise<ICategory> {
    const slug = CommonService.slug(input.name);
    const newCategory = await Category.create({ ...input, slug });

    return { ...newCategory.toObject(), productsNum: 0 };
  }

  async updateById(_id: Schema.Types.ObjectId, input: IEditCategory): Promise<ICategory | null> {
    const slug = CommonService.slug(input.name);
    const updatedCategory = await Category.findOneAndUpdate({ _id }, { ...input, slug }, { new: true })
      .select('-__v')
      .lean()
      .exec();

    if (updatedCategory) {
      const productsNum = await this.ProductRepo.countProduct({ category: updatedCategory._id });
      return { ...updatedCategory, productsNum };
    }

    return null;
  }

  async deleteOneById(_id: Schema.Types.ObjectId): Promise<Schema.Types.ObjectId> {
    await Category.deleteOne({ _id }).exec();
    return _id;
  }

  async findOne(filter: FilterQuery<typeof Category>): Promise<ICategory | null> {
    return Category.findOne(filter).exec();
  }

  async findOneById(_id: Schema.Types.ObjectId): Promise<ICategory | null> {
    return await this.findOne({ _id });
  }

  async findOneByCriteria(input: Partial<ICategory>, excludeId?: Schema.Types.ObjectId) {
    const filter: FilterQuery<ICategory> = {
      $or: [{ name: input.name }, { nameEng: input.nameEng }, { slug: input.slug }]
    };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return await this.findOne(filter);
  }
}

export default CategoryRepository;
