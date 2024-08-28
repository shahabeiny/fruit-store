import { FilterQuery, Schema } from "mongoose";
import ICategory, { IEditCategory } from "./ICategory";

interface ICategoryRepository {
  findAll(): Promise<ICategory[]>;
  getCategories(): Promise<ICategory[]>;
  create(input: IEditCategory): Promise<ICategory>;
  updateById(_id: Schema.Types.ObjectId, input: IEditCategory): Promise<ICategory | null>;
  deleteOneById(_id: Schema.Types.ObjectId): Promise<Schema.Types.ObjectId>;
  findOne(filter: FilterQuery<ICategory>): Promise<ICategory | null>;
  findOneByCriteria(input: Partial<ICategory>, excludeId?: Schema.Types.ObjectId): Promise<ICategory | null>;
}

export default ICategoryRepository;