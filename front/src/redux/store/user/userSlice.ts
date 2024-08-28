import UserModel, { GetUsersModel, UserHistoryModel } from "@/models/UserModel";
import { apiSlice } from "@/services/ApiSlice";
import customHeaders from "@/utils/CustomeHeader";
import {
  handleErrorRTK,
  transformResponse,
  updateItemInCache,
} from "@/utils/rtkHelpers";
import { showToast } from "@/utils/tostifyalert";
import { setCredentials } from "../auth/authSlice";
import { RootState } from "@/redux/store";
import { getTokenStorage } from "@/utils/getTokenStorage";

const USER_BASE_URL = `/api/user-router/user`;
const ME_URL = `${USER_BASE_URL}/me`;
const EDIT_PROFILE_URL = `${USER_BASE_URL}/edit-profile`;
const LOGIN_USER_URL = `${USER_BASE_URL}/login-info`;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserModel, void>({
      query: () => ({
        url: `${ME_URL}`,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    getUsersByParam: builder.query<GetUsersModel, void>({
      query: () => ({
        url: `${USER_BASE_URL}`,
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
    getLoginHistories: builder.query<UserHistoryModel[], void>({
      query: () => ({
        url: LOGIN_USER_URL,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    editUserByAdmin: builder.mutation<UserModel, FormData>({
      query: (data) => ({
        url: USER_BASE_URL,
        method: "put",
        body: data,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getUsersByParam",
              undefined,
              (draft) => {
                updateItemInCache(
                  draft.users,
                  data,
                  `کاربر ${arg.get("username")} با موفقیت ویرایش شد`
                );
              }
            )
          );
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
    editProfuleByUser: builder.mutation<UserModel, FormData>({
      query: (init) => ({
        url: EDIT_PROFILE_URL,
        method: "post",
        body: init,
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              isLoggedIn: "authenticated",
              token: getTokenStorage(),
              user: data,
            })
          );
          showToast(`اطلاعات شما با موفقیت ویرایش شد`, "success");
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUsersByParamQuery,
  useLazyGetLoginHistoriesQuery,
  useEditUserByAdminMutation,
  useEditProfuleByUserMutation,
  useGetLoginHistoriesQuery,
} = extendedApiSlice;
