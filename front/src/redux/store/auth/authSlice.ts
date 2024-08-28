import { IsLoggin } from "@/models/IsLoggin";
import UserModel from "@/models/UserModel";
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";


type AuthState = {
  isLoggedIn: IsLoggin;
  token: string | null;
  user: UserModel | null;
};

const initialState: AuthState = {
  isLoggedIn: "unauthenticated",
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, isLoggedIn } = action.payload;
      localStorage.setItem("user", JSON.stringify({ token }));
      state.isLoggedIn = isLoggedIn;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = "unauthenticated";
      localStorage.removeItem('user');



    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
