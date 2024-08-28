import { OrderInfoProductModel, OrderProductsModel } from "@/models/OrderModel";
import { showErrorSwal } from "./sweetalert";
import { showToast } from "./tostifyalert";
import { current } from "@reduxjs/toolkit";

type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

export function updateItemInCache<T extends { _id?: string }>(
  cache: T[],
  updatedItem: T,
  msg: string
): void {
  const index = cache.findIndex(({ _id }) => _id === updatedItem._id);
  if (index !== -1) {
    cache[index] = updatedItem;
    showToast(msg, "success");
  }
}

export function addItemToCache<T>(cache: T[], newItem: T, msg: string): void {
  cache.unshift(newItem);
  showToast(msg, "success");
}

export function removeItemFromCache<T extends { _id?: string }>(
  cache: T[],
  itemRemovedId: string,
  msg: string
): void {
  const index = cache.findIndex(({ _id }) => _id === itemRemovedId);

  if (index !== -1) {
    cache.splice(index, 1);
    showToast(msg, "success");
  }
}

export const updateProductCount = (
  draft: OrderProductsModel[],
  data: OrderInfoProductModel,
  increment = true
) => {
  draft.forEach((pro) => {
    if (pro.product._id === data._id) {
      pro.product = data;
      pro.count = increment ? pro.count + 1 : pro.count - 1;
    }
  });
};

export function transformResponse<T>(response: { data: T }) {
  return response.data;
}

export const handleErrorRTK = (
  error: any,
  kindShowError: "toast" | "alert"
) => {
  const msg = error.error.data
    ? error.error.data.message
    : "خطا در انجام درخواست";
  kindShowError ? showToast(msg, "error") : showErrorSwal(msg);
};
