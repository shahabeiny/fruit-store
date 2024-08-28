"use client";

import { useAppDispatch } from "@/hooks/useReduxhook";
import { setCredentials } from "@/redux/store/auth/authSlice";
import { useGetMeQuery } from "@/redux/store/user/userSlice";
import { getTokenStorage } from "@/utils/getTokenStorage";
import { useEffect } from "react";


const Me = () => {
  const { data, isLoading } = useGetMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setCredentials({
        isLoggedIn: "authenticated",
        token: getTokenStorage(),
        user: data,
      })
    );
  }, [isLoading]);


  return null;
};

export default Me;
