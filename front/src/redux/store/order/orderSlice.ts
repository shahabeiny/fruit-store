import { OrderInfoModel, OrderModel } from "@/models/OrderModel";
import { apiSlice } from "@/services/ApiSlice";
import { handleErrorRTK, transformResponse } from "@/utils/rtkHelpers";
import { showToast } from "@/utils/tostifyalert";

const ORDER_BASE_URL = `/api/order-router/order`;
const ORDERS_BY_USER_URL = `${ORDER_BASE_URL}/all-orders`;
const ORDERS_BY_ADMIN_URL = `${ORDER_BASE_URL}/all-orders-admin`;
const CONFIRM_ORDER_URL = `${ORDER_BASE_URL}/confirm-order`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query<OrderModel[], string>({
      query: (init) => ({
        url: `${ORDERS_BY_USER_URL}?${init}`,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data: colors } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, "alert");
        }
      },
    }),
    getOrdersByAdmin: builder.query<OrderModel[], string>({
      query: (init) => ({
        url: `${ORDERS_BY_ADMIN_URL}?${init}`,
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
    confirmOrder: builder.mutation<
      OrderInfoModel,
      {
        orderSlug: string;
        orderData: { orderId: string; operate: boolean;};
      }
    >({
      query: ({ orderData }) => ({
        url: CONFIRM_ORDER_URL,
        method: "post",
        body: orderData,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getOrdersByAdmin",
              arg.orderSlug,
              (draft) => {
                const index = draft.findIndex(
                  (order) => order.orderInfo._id === data._id
                );
                if (index !== -1) {
                  draft.splice(index, 1);
                  showToast(
                    `سفارش با موفقیت ${
                      arg.orderData.operate ? "تایید" : "کنسل"
                    } شد`,
                    "success"
                  );
                }
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
  useGetOrdersByUserQuery,
  useGetOrdersByAdminQuery,
  useConfirmOrderMutation,
} = extendedApiSlice;
