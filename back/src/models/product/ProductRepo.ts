import { FilterQuery, Schema, UpdateQuery } from 'mongoose';
import Product from './ProductModel';
import IProduct, { IEditProduct, IProductCriteria } from '../../interfaces/IProduct';
import CommonService from '../../services/commonService';
import RateRepository from '../rate/RateRepo';

class ProductRepository {
  private RateRepo: RateRepository;

  constructor() {
    this.RateRepo = new RateRepository();
  }

  async createProduct(input: IEditProduct): Promise<IProduct> {
    const slug = CommonService.slug(input.name);
    let newProduct = await Product.create({ ...input, slug });
    newProduct = await newProduct.populate('category');
    return newProduct;
  }

  async updateById(_id: Schema.Types.ObjectId, input: UpdateQuery<IEditProduct>): Promise<IProduct | null> {
    const slug = CommonService.slug(input.name);
    const updatedCategory = await Product.findByIdAndUpdate(_id, { ...input, slug }, { new: true })
      .populate('category')
      .select('-__v')
      .lean();

    return updatedCategory ? updatedCategory : null;
  }

  async updateCountById(_id: Schema.Types.ObjectId, input: UpdateQuery<any>) {
    const updatedCategory = await Product.findByIdAndUpdate(_id, input, { new: true })
      .populate('category')
      .select('-__v')
      .lean();

    return updatedCategory;
  }

  async countProduct(filter: FilterQuery<typeof Product>) {
    return await Product.countDocuments(filter);
  }

  async findOne(filter: FilterQuery<typeof Product>): Promise<IProduct | null> {
    return await Product.findOne(filter).exec();
  }

  async findOneById(_id: Schema.Types.ObjectId): Promise<IProduct | null> {
    return await this.findOne({ _id });
  }

  async findOneByCriteria(input: Partial<IProductCriteria>, excludeId?: Schema.Types.ObjectId) {
    const filter: FilterQuery<IProduct> = { ...input };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return await Product.findOne(filter);
  }

  async checkExistByCriteria(input: Partial<IProductCriteria>, excludeId?: Schema.Types.ObjectId) {
    const filter: FilterQuery<IProduct> = { ...input };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    const product = await Product.findOne(filter);
    return !!product;
  }

  async findOneWithCatAndRateByCriteria(input: Partial<IProductCriteria>) {
  
    let product = await Product.findOne(input)
      .populate([
        { path: 'category', select: '-__v' },
        { path: 'rates', select: '-__v' }
      ]).lean();

    if (!product) {
      return null; 
    }

    return { ...product, rates: this.RateRepo.calculateRate(product.rates ?? []) };
  }

  async populateProduct(product: IProduct) {
    return product.populate([
      { path: 'category', select: '-__v' },
      { path: 'rates', select: '-__v' }
    ]);
  }

  async findAllWithCatAndRateByCriteria(filter: Partial<IProductCriteria> = {}, limit = 14) {
    const productList = await Product.find(filter)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate([
        { path: 'category', select: '-__v' },
        { path: 'rates', select: '-__v' }
      ])
      .lean();

    return await Promise.all(
      productList.map(async (product) => ({
        ...product,
        rates: this.RateRepo.calculateRate(product.rates ?? [])
      }))
    );
  }

  async findAllByIds(ids: Schema.Types.ObjectId[]) {
    return await Product.find({ _id: { $in: ids } }).lean();
  }
}

export default ProductRepository;
