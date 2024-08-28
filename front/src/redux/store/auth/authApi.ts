import LoginModel from "@/models/LoginModel";
import UserModel from "@/models/UserModel";
import { apiSlice } from "@/services/ApiSlice";
import customHeaders from "@/utils/CustomeHeader";
import { handleErrorRTK, transformResponse } from "@/utils/rtkHelpers";
import { logout } from "./authSlice";
import { showToast } from "@/utils/tostifyalert";

const AUTH_BASE_URL = "/api/auth-router";
const LOGIN_URL = `${AUTH_BASE_URL}/login`;
const REGISTER_URL = `${AUTH_BASE_URL}/register`;
const LOGOUT_URL = `${AUTH_BASE_URL}/logout`;
const headers = customHeaders({ contentType: true });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserModel, LoginModel>({
      query: (init) => ({
        url: REGISTER_URL,
        method: "post",
        body: init,
        headers,
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
    login: builder.mutation<{ user: UserModel; token: string }, LoginModel>({
      query: (init) => ({
        url: LOGIN_URL,
        method: "post",
        body: init,
        headers,
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
    setLogot: builder.mutation<void, void>({
      query: (init) => ({
        url: LOGOUT_URL,
        method: "post",
      }),
      transformResponse,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          dispatch(logout());
          showToast("با موفقیت خازج شدید", "success");
        } catch (error) {
          handleErrorRTK(error, "toast");
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation,useSetLogotMutation } = extendedApiSlice;
