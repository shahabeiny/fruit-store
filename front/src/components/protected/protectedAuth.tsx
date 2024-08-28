"use client";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/hooks/useReduxhook";
import { useEffect } from "react";
import { selectCurrentToken } from "@/redux/store/auth/authSlice";


const ProtectedAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, []);

  // if (!token) {
  //   return redirect("/auth/login");
  // }

  return null;
};

export default ProtectedAuth;
