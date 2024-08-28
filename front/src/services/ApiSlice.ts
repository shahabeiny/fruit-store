import { RootState } from "@/redux/store";
import { logout, setCredentials } from "@/redux/store/auth/authSlice";
import { getTokenStorage } from "@/utils/getTokenStorage";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const baseApi = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getTokenStorage();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: MaybePromise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
  > = await baseApi(args, api, extraOptions);

  if ((result?.error as any)?.status === 403) {
    const refreshResult = await baseApi(
      {
        url: "/api/auth-router/refresh-token",
        method: "POST",
      },
      { ...api },
      extraOptions
    );
    const refreshData = refreshResult.data as { data: any };

    if (refreshResult.data) {
      api.dispatch(
        setCredentials({
          isLoggedIn:'authenticated',
          token: refreshData.data,
          user: (api.getState() as RootState).auth.user
        })
      );

      result = await baseApi(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
