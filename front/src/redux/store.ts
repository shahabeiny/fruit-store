import { apiSlice } from "@/services/ApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./store/auth/authSlice";

export const makeStore  = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
      devTools:true
  })
}


export type AppStore = ReturnType<typeof makeStore >
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


