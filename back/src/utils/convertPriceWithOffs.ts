const convertPriceWithOffs = (price: number, percent: number): number =>
  Math.trunc(price - (price * percent) / 100);

export default convertPriceWithOffs;