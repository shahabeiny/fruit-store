import {
  GetInfoProductModel,
  GetProductPanelModel,
  GetProductStoreModel,
  ProductModel,
} from "@/models/ProductModels";
import { apiSlice } from "@/services/ApiSlice";
import {
  addItemToCache,
  handleErrorRTK,
  transformResponse,
  updateItemInCache,
} from "@/utils/rtkHelpers";
import { showToast } from "@/utils/tostifyalert";

const RATE_URL = `/api/favorite-router/rate/add`;
const PRODUCT_URL = `/api/product-router/product`;
const PRODUCTS_CAT_URL = `/api/product-router/products-category`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfoProduct: builder.query<GetInfoProductModel, string>({
      query: (init) => ({
        url: `${PRODUCT_URL}/${init}`
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, "alert");
        }
      },
      keepUnusedDataFor: 0,
    }),
    getProductsByAdmin: builder.query<GetProductPanelModel, string>({
      query: (init) => ({
        url: `${PRODUCT_URL}?${init}`,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, "alert");
        }
      },
    }),
    getProductsCategory: builder.query<GetProductStoreModel, string>({
      query: (init) => ({
        url: `${PRODUCTS_CAT_URL}/${init}`,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, "alert");
        }
      },
    }),
    editProduct: builder.mutation<
      ProductModel,
      { slug: string; init: FormData }
    >({
      query: (data) => ({
        url: PRODUCT_URL,
        method: "put",
        body: data.init,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getProductsByAdmin",
              arg.slug,
              (draft) => {
                updateItemInCache(
                  draft.products,
                  data,
                  `محصول ${arg.init.get("name")} با موفقیت ویرایش شد`
                );
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    addProduct: builder.mutation<
      ProductModel,
      { slug: string; init: FormData }
    >({
      query: (data) => ({
        url: PRODUCT_URL,
        method: "post",
        body: data.init,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getProductsByAdmin",
              arg.slug,
              (draft) => {
                addItemToCache(
                  draft.products,
                  data,
                  `محصول ${arg.init.get("name")} با موفقیت افزوده شد`
                );
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    saveRate: builder.mutation<number, { productId: string; rate: number }>({
      query: (init) => ({
        url: `${RATE_URL}`,
        method: "post",
        body: init,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
     
      },
    }),
  }),
});

export const {
  useGetInfoProductQuery,
  useGetProductsCategoryQuery,
  useGetProductsByAdminQuery,
  useAddProductMutation,
  useEditProductMutation,
  useSaveRateMutation
} = extendedApiSlice;
