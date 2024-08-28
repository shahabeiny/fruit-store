"use client";
import { redirect } from "next/navigation";
import { selectCurrentToken } from "@/redux/store/auth/authSlice";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useReduxhook";

const ProtectedLogin = () => {
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    if (token) {
      return redirect("/");
    }
  }, []);

  // if (token) {
  //   return null;
  // }
  return null;
};

export default ProtectedLogin;
