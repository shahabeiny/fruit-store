import Link from "next/link";
import { memo } from "react";
import { HiOutlineShoppingCart, HiMiniChevronLeft } from "react-icons/hi2";



const CartHeader = () => {
  return (
    <div className="relative group">
      <div className="py-3 cursor-pointer ">
        <HiOutlineShoppingCart className="size-8" />
      </div>

      <div className="w-[400px] p-5 absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white tracking-normal shadow-normal rounded-2xl border-t-[3px] border-t-orange-300 transition-all delay-75">
        <div className="flex justify-between items-center font-DanaMedium text-sm">
          <span className="text-orange-300 dark:text-white/50">1 مورد</span>
          <Link href="/" className="flex items-center text-orange-300">
            مشاهده سبد
            <HiMiniChevronLeft className="size-4" />
          </Link>
        </div>

        <div className="pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark: divide-white/10 child:py-5">
          <div className="flex gap-x-2.5 ">
            <img src="/images/products/p1.png" alt="p1" className="size-30" />
            <div className="flex flex-col justify-between">
              <h4 className="font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2">
                قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی
              </h4>
              <div>
                <span className="text-teal-600 dark:text-emerald-500 text-xs tracking-tighter">
                  14،500 تومان تخفیف
                </span>
                <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
                  175،500
                  <span className="font-Dana text-sm">تومان </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-x-2.5 ">
            <img src="/images/products/p2.png" alt="p2" className="w-30 h-30" />
            <div className="flex flex-col justify-between">
              <h4 className="font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2">
                قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی
              </h4>
              <div>
                <span className="text-teal-600 dark:text-emerald-500 text-xs tracking-tighter">
                  14،500 تومان تخفیف
                </span>
                <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
                  175،500
                  <span className="font-Dana text-sm">تومان </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5">
          <div>
            <span className="text-gray-300  text-xs tracking-tighter font-DanaMedium">
              مبلغ قابل پرداخت
            </span>
            <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
              350،000
              <span className="font-Dana text-sm">تومان </span>
            </div>
          </div>
          <Link
            href="/"
            className="flex justify-center items-center h-12 w-[144px] text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 hover:bg-teal-700 transition-colors rounded-xl tracking-tightest"
          >
            ثبت سفارش
          </Link>
        </div>
      </div>
    </div>


  );
};

export default memo(CartHeader);
