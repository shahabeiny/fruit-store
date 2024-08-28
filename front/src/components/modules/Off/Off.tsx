import { FC } from "react";
import styles from "./Offer.module.css";

type OfferProps = {
  price: number;
};

const Off: FC<OfferProps> = ({ price }) => {
  return (
    <div className={`${styles.offer} text-sm md:text-base`}>
      <span>{price}</span>
      <span className="tracking-tighter"> تومان</span>
    </div>
  );
};

export default Off;
