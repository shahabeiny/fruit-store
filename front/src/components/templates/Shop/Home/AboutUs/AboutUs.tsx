import Image from 'next/image';
import React from 'react';


const AboutUs = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-8 lg:gap-x-5 text-zinc-700 dark:text-white">
          <Image 
           width={900}
           height={450}
          src="/images/contact.png" alt="contact" className="max-w-[296px]  shrink-0" />
          <div>
            <h3 className="font-MorabbaMedium text-2xl md:text-5xl mb-0.5 md:mb-1.5">
              یکی از بهترین میوه فروشی ها!
            </h3>
            <span className="font-MorabbaLight text-lg md:text-3xl/[48px]">
              تازه ترین میوه را از ما بخواهید ...
            </span>
            <div className="flex gap-2.5 my-5 md:my-6 child:inline-block child:size-1 child:bg-zinc-700 child:dark:bg-gray-400 child:rounded-full">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="text-lg md:text-2xl">
              ما در فروشگاه میوه و سبزیجات خود تلاش می‌کنیم تا بهترین انواع محصولات تازه و با کیفیت
              را به مشتریان ارائه دهیم.با افتخار می‌گوییم که به عنوان یک پل ارتباطی بین مزارع محلی و
              مصرف‌کنندگان شهری عمل می‌کنیم و به حفظ سلامتی و رضایت هر دو طرف متعهد هستیم.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
