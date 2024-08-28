import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';

const ProductComments = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-start gap-y-8 p-5 rounded-2xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-normal">
        <h2 className="flex-x-center gap-x-2 md:gap-x-3 font-DanaDemiBold text-orange-300 text-lg md:text-xl">
          <HiOutlineChatBubbleOvalLeft className="size-6" />
          <span>نظرات</span>
        </h2>

        <div className="space-y-8">
          <div className="flex items-start gap-x-2 md:gap-x-3">
            <img src="/images/apple.png" alt="apple" className="size-10 rounded-xl" />
            <div className="flex flex-col items-start gap-y-2">
              <div className="flex-x-center gap-x-0.5 xs:gap-x-2 md:gap-x-3 font-DanaDemiBold text-sm sx:text-base line-clamp-1 ">
                <span className=''>شهاب عینی</span> _<span className="tracking-tightest text-slate-500 dark:text-slate-400">24 آبان 1402</span>
              </div>
              <p className="text-base/[28px] sx:text-lg/[32px] md:text-lg/[34px]">
                ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات و توزیع، الگویی
                برای تولیدکنندگان ایرانی باشیم و به مرجع فروش میوه سالم و ارگانیک در ایران
              </p>
            </div>
          </div>

          <div className="flex items-start gap-x-2 md:gap-x-3">
            <img src="/images/apple.png" alt="apple" className="size-10 rounded-xl" />
            <div className="flex flex-col items-start gap-y-2">
              <div className="flex-x-center gap-x-0.5 xs:gap-x-2 md:gap-x-3 font-DanaDemiBold text-sm sx:text-base line-clamp-1">
                <span>شهاب عینی</span> _<span className="tracking-tightest">24 آبان 1402</span>
              </div>
              <p className="text-base/[28px] sx:text-lg/[32px] md:text-lg/[34px]">
                ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات و توزیع، الگویی
                برای تولیدکنندگان ایرانی باشیم و به مرجع فروش میوه سالم و ارگانیک در ایران
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
