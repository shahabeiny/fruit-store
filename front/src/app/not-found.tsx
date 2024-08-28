import Button from "@/components/modules/Buttons/Button/Button";

const page = () => {
  return (
    <div
      className="relative min-h-[calc(100vh-theme(spacing.16))]"
      style={{
        background: `url(/images/notFound.png) center  no-repeat`,
      }}
    >
      <div className="absolute -bottom-[4%] left-0 right-0 mx-auto flex-center">
        <Button
          link="/"
          className="h-12 w-[160px]"
          title="بازگشت به صفحه اصلی"
        />
      </div>
    </div>
  );
};

export default page;
