import Service from './Service';
import styles from "./Services.module.css";

const Services = () => {
  return (
    <section className="mb-10 md:mb-20">
      <div className="container">
        <div className={`${styles.services} flex items-center justify-between gap-y-11 flex-wrap  text-center lg:text-right text-zinc-700 dark:text-white `}>
          <Service
            imgName="support"
            imgDarkName="support-dark"
            title="پشتیبانی شبانه روزی"
            subTitle="7 روز هفته ، 24 ساعته"
          />
          <Service
            imgName="express-delivery"
            imgDarkName="express-delivery-dark"
            title="امکان تحویل اکسپرس"
            subTitle="ارسال بسته با سرعت باد"
          />
          <Service
            imgName="fresh"
            imgDarkName="fresh"
            title="تازه و ارگانیک"
            subTitle="محصولات تازه و ارگانیک"
          />

          <Service
            imgName="quality"
            imgDarkName="quality"
            title="کیفیت تضمین شده"
            subTitle="محصولات با کیفیت"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
