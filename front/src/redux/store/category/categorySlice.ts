import { CategoryModel } from "@/models/CategoryModel";
import { apiSlice } from "@/services/ApiSlice";
import customHeaders from "@/utils/CustomeHeader";
import {
  addItemToCache,
  handleErrorRTK,
  removeItemFromCache,
  transformResponse,
  updateItemInCache,
} from "@/utils/rtkHelpers";

const CATEGORY_URL = `/api/category-router/category`;
const headers = customHeaders({ authorization: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryModel[], void>({
      query: () => ({
        url: CATEGORY_URL,
        headers,
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
    editCategory: builder.mutation<CategoryModel, FormData>({
      query: (init: FormData) => ({
        url: CATEGORY_URL,
        method: "put",
        body: init,
        headers,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                updateItemInCache(
                  draft,
                  data,
                  `دسته بندی ${arg.get("name")} با موفقیت ویرایش شد`
                );
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    addCategory: builder.mutation<CategoryModel, FormData>({
      query: (init: FormData) => ({
        url: CATEGORY_URL,
        method: "post",
        body: init,
        headers,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                addItemToCache(
                  draft,
                  data,
                  `دسته بندی ${arg.get("name")} با موفقیت افزوده شد`
                );
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    deleteCategory: builder.mutation<string, CategoryModel>({
      query: (init: CategoryModel) => ({
        url: `${CATEGORY_URL}/${init._id ?? ""}`,
        method: "delete",
        headers,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                removeItemFromCache(
                  draft,
                  data,
                  `دسته بندی ${arg.name} با موفقیت حذف شد`
                );
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
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = extendedApiSlice;
