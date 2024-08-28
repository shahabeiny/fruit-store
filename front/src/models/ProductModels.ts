import { CategoryModel } from "./CategoryModel";

export type ProductModel = {
  _id: string;
  name: string;
  nameEng: string;
  desc: string;
  scientificDesc: string;
  banner: string;
  slug: string;
  rates?: number;
  total: number;
  eachCart: number;
  frozen: number;
  sold: number;
  price: number;
  category: CategoryModel;
  off:number;
  createdAt?: string;
};

export type ProductWithoutInfoModel = Pick<
  ProductModel,
  "_id" | "name" | "banner" | "slug" | "rates" | "price"|"off"
>;

export type GetInfoProductModel = {
  product: ProductModel;
  myRate: number;
};

export type GetProductPanelModel = {
  products: ProductModel[];
  categories: CategoryModel[];
};

export type GetProductStoreModel = {
  products: ProductWithoutInfoModel[];
  category: CategoryModel;
};
