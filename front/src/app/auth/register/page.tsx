"use client";

import FormRegister from "@/components/templates/Auth/Register/FormRegister/FormRegister";
import LoginModel from "@/models/LoginModel";
import { useRegisterMutation } from "@/redux/store/auth/authApi";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const handleForm = async (formData: LoginModel) => {
    try {
      await register(formData).unwrap();
      router.push("/auth/login");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h4 className="font-DanaDemiBold text-xl mb-4 sm:mb-4.5">عضویت</h4>
      <p className="mb-5">
        قبلا ثبت نام کرده اید؟
        <Link href="/auth/login" className="font-DanaDemiBold text-green-500">
          وارد شوید
        </Link>
      </p>
      <FormRegister onSubmit={handleForm} />
      {/* <FormOtp/> */}
    </>
  );
};

export default Register;
