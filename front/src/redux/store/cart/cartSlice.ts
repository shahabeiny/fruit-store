import {
  AddCart,
  OrderModel,
  OrderInfoProductModel,
  OrderProductsModel,
  FinishOrderModel,
} from "@/models/OrderModel";
import { ProductModel } from "@/models/ProductModels";
import UserModel from "@/models/UserModel";
import { apiSlice } from "@/services/ApiSlice";
import customHeaders from "@/utils/CustomeHeader";
import {
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateProductCount,
} from "@/utils/rtkHelpers";
import { showToast } from "@/utils/tostifyalert";


const CART_BASE_URL = `/api/cart-router/cart`;
const ADD_CART_URL = `${CART_BASE_URL}/add-cart`;
const MUINES_CART_URL = `${CART_BASE_URL}/muines-cart`;
const DELETE_CART_URL = `${CART_BASE_URL}/delete-cart`;
const FINISH_CART_URL = `${CART_BASE_URL}/finish-cart`;
const DELETE_PRODUCT_CART_URL = `${CART_BASE_URL}/delete-product`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<OrderModel, void>({
      query: () => ({ url: CART_BASE_URL }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, "alert");
        }
      },
      keepUnusedDataFor: 5,
    }),
    addToCart: builder.mutation<
      OrderInfoProductModel,
      { kindPage: "CART" | "DETAIL"; cartData: AddCart }
    >({
      query: (data) => ({
        url: ADD_CART_URL,
        method: "post",
        body: data.cartData,
        headers: customHeaders({ contentType: true }),
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
        try {
          const { data } = await queryFulfilled;

          if (arg.kindPage === "CART") {
            dispatch(
              extendedApiSlice.util.updateQueryData(
                "getCart",
                undefined,
                (draft) => updateProductCount(draft.products, data, true)
              )
            );
          }
          showToast(
            "محصول مورد نظر با موفقیت به سبد خرید افزوده شد",
            "success"
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    muinesFromCart: builder.mutation<
      OrderInfoProductModel,
      { productId: string; productOrderId: string }
    >({
      query: (data) => ({
        url: MUINES_CART_URL,
        method: "PATCH",
        body: data,
        headers: customHeaders({ contentType: true }),
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCart",
              undefined,
              (draft) => {
                updateProductCount(draft.products, data, false);
                showToast("تعداد محصول با موفقیت کسر شد", "success");
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    deleteCart: builder.mutation<void, string>({
      query: (OrderId) => ({
        url: `${DELETE_CART_URL}/${OrderId}`,
        method: "delete",
      }),
      transformResponse,
      onQueryStarted: async (arg, { dispatch }) => {
        try {
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCart",
              undefined,
              (draft) => {
                draft.products.length = 0;
                showToast("سبد خرید با موفقیت حذف شد", "success");
              }
            )
          );
        } catch (error: any) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    deleteProductCart: builder.mutation<string, string>({
      query: (productOrderId) => ({
        url: `${DELETE_PRODUCT_CART_URL}/${productOrderId}`,
        method: "delete",
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCart",
              undefined,
              (draft) => {
                removeItemFromCache(
                  draft.products,
                  data,
                  "محصول با موفقیت از سبد خرید حذف شد"
                );
                
                
              }
            )
          );
        } catch (error: any) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    finishCart: builder.mutation<UserModel, FinishOrderModel>({
      query: (data) => ({
        url: FINISH_CART_URL,
        method: "post",
        body: data,
      }),
      transformResponse,
      onQueryStarted: async (arg, { dispatch }) => {
        try {
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCart",
              undefined,
              (draft) => {
                draft.products.length = 0;
                showToast("سفارش شما با موفقیت نهایی شد", "success");
              }
            )
          );
        } catch (error: any) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useMuinesFromCartMutation,
  useDeleteProductCartMutation,
  useDeleteCartMutation,
  useFinishCartMutation,
} = extendedApiSlice;
