import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
