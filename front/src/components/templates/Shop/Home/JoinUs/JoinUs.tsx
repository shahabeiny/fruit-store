const JoinUs = () => {
  return (
    <section className="mb-10 md:mb-20">
      <div className="container relative">
        <div
          className={`relative flex flex-col items-center justify-between px-2 py-8 rounded-2xl overflow-hidden w-full h-64 z-5 backdrop-blur-[8px]}`}
          style={{
            background: `linear-gradient(270deg,
          rgba(0, 0, 0, 0.3) 33.85%,
          rgba(243, 244, 246, 0.1)
        )
        100%
        ,url(${`/images/join-bg.webp`}) center/cover no-repeat`,
          }}
        >
          <div className="z-5 text-white text-center">
            <h2 className="font-MorabbaMedium text-2xl md:text-5xl mb-0.5 md:mb-1.5">
              تازه ترین میوه ها
            </h2>
            <p className="font-MorabbaLight text-lg md:text-3xl/[48px]">
              با واردکردن ایمیل خود از تازه ترین میوه ها و اخبار مطلع شوید.
            </p>
          </div>
          <form className=" flex items-center flex-col sm:flex-row-reverse gap-y-4  w-[80%] p-2 rounded-8xl bg-transparent sm:bg-white  dark:sm:bg-zinc-700 text-zinc-700 dark:text-white">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="h-12 w-full rounded-8xl px-4 sm:px-2 dark:bg-zinc-700 text-zinc-700 dark:text-white dark:placeholder:text-gray-100"
            />
            <button className="flex-center flex-shrink-0  rounded-8xl h-12   w-full sm:w-[144px]  text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 hover:bg-teal-700 transition-colors">
              مشترک شوید
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
