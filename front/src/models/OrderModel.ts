import { ProductModel } from "./ProductModels";
import UserModel from "./UserModel";

export interface OrderModel {
  orderInfo: OrderInfoModel;
  products: OrderProductsModel[];
}

export interface OrderInfoModel {
  _id: string;
  orderID: string;
  time_cancel: string;
  finishCart: boolean;
  status_delivery: "not_delivered" | "delivered" | "not_confirmed" | "canceled";
  createdAt: string;
  user?: UserModel; // for get all orders admin is force.
}

export type OrderInfoProductModel =  Omit<ProductModel, "desc" | "scientificDesc"|"category">

export interface OrderProductsModel {
  _id: string;
  product: OrderInfoProductModel
  finalPrice?: number;
  off:number;
  count: number ;
}

export interface AddCart {
  productId: string;
  finalPrice?: number;
}

export type FinishOrderModel = {
  name: string;
  family: string;
  address: string;
  orderId: string;
};
