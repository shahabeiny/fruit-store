import { CategoryModel } from "@/models/CategoryModel";
import { DashboardModel, GetMainInfoModel } from "@/models/HomeModel";
import { apiSlice } from "@/services/ApiSlice";
import { handleErrorRTK, transformResponse } from "@/utils/rtkHelpers";

const HOME_URL_BASE = `/api/home-router`;
const MAIN_URL = `${HOME_URL_BASE}/main`;
const HEADER_URL = `${HOME_URL_BASE}/header`;
const DASHBOARD_URL_BASE = `/api/dashboard-router/dashboard`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeader: builder.query<CategoryModel[], void>({
      query: () => ({
        url: HEADER_URL,
      }),
      transformResponse,
    }),
    getMainInfo: builder.query<GetMainInfoModel, void>({
      query: () => ({
        url: MAIN_URL,
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
    getDashboard: builder.query<DashboardModel, void>({
      query: () => ({
        url: DASHBOARD_URL_BASE,
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
  }),
});

export const { useGetHeaderQuery, useGetMainInfoQuery,useGetDashboardQuery } = extendedApiSlice;
