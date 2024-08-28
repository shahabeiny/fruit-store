import { CategoryModel } from "./CategoryModel";
import { OrderModel } from "./OrderModel";
import { ProductModel } from "./ProductModels";

export type GetHeaderModel = { categories: CategoryModel[] };

export type MenuModel = Pick<CategoryModel, "slug" | "name">;

export type GetMainInfoModel = {
  newest: ProductModel[];
  mainSlider: ProductModel[];
  categories:CategoryModel[]
  sellingProducts: ProductModel[];
};

export type DashboardModel = {
  totalPriceOrder:  number
  notConfirmedOrder: OrderModel[];
  notConfirmedOrderCount: number;
}
