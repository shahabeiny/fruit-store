"use client"

import { HiChevronUp } from 'react-icons/hi2';
import CurveFooter from '../Icon/CurveFooter';
import Logo from '../Logo/Logo';
import LinkFooter from './LinkFooter';
import { LuMapPin } from 'react-icons/lu';
import { BsEnvelope } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { LiaInstagram, LiaTelegram } from 'react-icons/lia';
import Link from 'next/link';

const Footer = () => {

  const scrollToTop = ()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }

  return (
    <footer className="relative bg-white dark:bg-zinc-700 py-8 md:pb-11 md:pt-[62px] mt-10 md:mt-16">
      <CurveFooter className="hidden md:block absolute top-0 left-0 right-0 mx-auto text-gray-100 dark:text-zinc-800 w-[100px] h-[22px]" />
     
      <div className="hidden md:flex items-center justify-center absolute top-0 right-0 left-0 mx-auto size-[30px] -translate-y-2/4 border-2 border-orange-300 rounded-full cursor-pointer" onClick={scrollToTop}>
        <HiChevronUp className="size-5 text-zinc-700 dark:text-white" />
      </div>

      <div className=" sm:w-[94%] lg:w-[90%] px-4 md:px-0 mx-auto text-zinc-800 dark:text-gray-300">
        <div className="flex flex-wrap justify-between">
          <div>
            <Logo className="mb-6 md:mb-4.5" showTitle />
            <p className="text-lg md:text-xl/[48px] lg:max-w-[606px]">
              ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات و توزیع، الگویی
              برای تولیدکنندگان ایرانی باشیم و به مرجع فروش میوه سالم و ارگانیک در ایران تبدیل شویم. می‌پنداریم که
              نظر مردم ایران و منطقه باید نسبت به کالای ایرانی بهبود یابد و در این راستا با اشتیاق
              می‌کوشیم.
            </p>
          </div>
          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-DanaDemiBold text-2xl text-zinc-800 dark:text-white mb-6 md:mb-7">
              دسترسی سریع
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-10 md:gap-x-16 md:gap-y-5">
              <LinkFooter title="حریم خصوصی" />
              <LinkFooter title="عودت کالا" />
              <LinkFooter title="شرایط استفاده" />
              <LinkFooter title="ثبت سفارش" />
              <LinkFooter title="پرسش های متداول" />
              <LinkFooter title="فرصت های شغلی" />
              <LinkFooter title="فرصت های شغلی" />
              <LinkFooter title="ارتباط با ما" />
            </div>
          </div>
          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-DanaDemiBold text-2xl text-zinc-800 dark:text-white mb-6 md:mb-7">
              در تماس باشیم
            </h4>
            <div>
              <div className="md:text-xl mb-6 md:mb-10">
                <span className="flex items-center gap-x-2 md:gap-x-3 mb-4 md:mb-5">
                  <LuMapPin className="size-5 md:size-6 shrink-0" />
                  ایران، استان قم، قم
                </span>
                <div className="flex flex-wrap gap-x-5 gap-y-4 font-DanaMedium">
                  <Link
                    href="mailto:shahabeiny@gmail.com"
                    className="flex items-center gap-x-2 md:gap-x-3 text-orange-300">
                    <BsEnvelope className="size-5 md:size-6" />
                    shahabeiny@gmail.com
                  </Link>
                  <div className="flex items-center gap-x-2 md:gap-x-3">
                    <FiPhone className="size-5 md:size-6" />
                    <span>09226675453</span>-<span>0253666666</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-1.5 md:gap-x-6 text-ltr font-DanaMedium md:text-xl">
                <Link
                  href="#"
                  className="flex flex-center flex-grow gap-x-2 h-12 border border-orange-300 text-orange-300 rounded-xl">
                  @fruit_store
                  <LiaInstagram className="size-[26px] md:size-[38px]" />
                </Link>
                <Link
                  href="#"
                  style={{ backgroundImage: 'linear-gradient(to right, #fed7aa, #fdba74)' }}
                  className="flex flex-center flex-grow gap-x-2 h-12 text-zinc-700 rounded-xl">
                  @fruit_store
                  <LiaTelegram className="size-[26px] md:size-[38px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 font-DanaMedium text-xs/5 md:text-base border-t  border-t-black/20 dark:border-t-white/10 mt-10 md:mt-11 pt-10 md:pt-11">
          <div className="flex items-center gap-x-2.5">
            <div className="flex-center flex-shrink-0 size-[30px] border border-black/20 dark:border-white/10  rounded-full">
              <div className="flex-center size-5 border border-black/30 dark:border-white/20 rounded-full">
                <div
                  style={{ backgroundImage: 'linear-gradient(to top, #fed7aa, #fdba74)' }}
                  className="size-2.5 rounded-full"></div>
              </div>
            </div>
            <p>
              تمام حقوق این قالب متعلق به سایت <span className="text-orange-300">میوه فروش</span>{" "}
              می باشد
            </p>
          </div>
          <span className="text-ltr mr-auto">
            Copyright © 2024 Fruit Store. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
