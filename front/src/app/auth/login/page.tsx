"use client";
import FormLogin from "@/components/templates/Auth/Login/FormLogin";
import { useAppDispatch } from "@/hooks/useReduxhook";
import LoginModel from "@/models/LoginModel";
import { useLoginMutation } from "@/redux/store/auth/authApi";
import { setCredentials } from "@/redux/store/auth/authSlice";
import { showSuccessSwal } from "@/utils/sweetalert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "cookies-next";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleForm = async (formData: LoginModel) => {
    try {
      const res = await login(formData).unwrap();
      setCookie("userPermission", res.user.role.permissions, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      dispatch(setCredentials({ user: res.user, token: res.token }));
      showSuccessSwal("با موفقیت وارد شدید");

      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h4 className="font-DanaDemiBold text-xl mb-4 sm:mb-4.5">ورود</h4>
      <p className="mb-5">
        قبلا ثبت نام نکرده اید؟
        <Link
          href="/auth/register"
          className="font-DanaDemiBold text-green-500"
        >
          ثبت نام کنید
        </Link>
      </p>
      <FormLogin onSubmit={handleForm} />
    </>
  );
};

export default Login;
