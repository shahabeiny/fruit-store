import OrderList from '../Orders/OrderList';
import BoxInfo from './BoxInfo';

const MainInfo = () => {
  return (
    <>
      
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-7 items-start">
        <div>
          <div className="flex justify-between items-center bg-white dark:bg-zinc-800 px-3.5 py-2.5 md:p-4.5 mb-4 md:mb-5 rounded-2xl">
            <span className="font-DanaDemiBold md:text-xl text-zinc-700 dark:text-white">
              آخرین سفارشات
            </span>
           
          </div>
          {/* <OrderList orders={orders} isAdmin/> */}
        </div>
        {/* <div>
          <div className="bg-white dark:bg-zinc-800 p-3.5 md:p-4.5 rounded-2xl mt-7">
            <div className="flex justify-between items-center pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
              <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
                کامنت های اخیر
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/45-28493/#q-9221"
                  className="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate">
                  آموزش Next.js بصورت پروژه محور - معرفی پکیج Next-Auth
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">1402/12/15</span>
                  <span className="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">
                    بسته شده
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/45-27935/#q-8791"
                  className="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate">
                  آموزش Next.js بصورت پروژه محور - استفاده از getStaticPaths
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">1402/12/07</span>
                  <span className="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">
                    بسته شده
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/45-25267/#q-8622"
                  className="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate">
                  آموزش Next.js بصورت پروژه محور - ساخت اولین Route در Nextjs
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">1402/12/04</span>
                  <span className="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">
                    بسته شده
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-y-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <a
                  href="https://sabzlearn.ir/lesson/4-25580/#q-2357"
                  className="text-zinc-700 dark:text-white w-full sm:max-w-sm sm:truncate">
                  آموزش جاوا اسکریپت رایگان مقدماتی تا پیشرفته + مینی پروژه - نحوه کار با عملگر
                  Nullish در جاوا اسکریپت (Es11)
                </a>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">1402/07/29</span>
                  <span className="text-xs py-1 px-1.5 text-slate-500 dark:text-yellow-400 bg-slate-500/10 dark:bg-yellow-400/10 rounded">
                    بسته شده
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MainInfo;
