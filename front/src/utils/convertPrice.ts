export const convertPrice = (price: number) => {
  let newPrice = Math.trunc(price);
  return newPrice.toLocaleString();
};

export const convertPriceWithOffs = (price: number, percent: number) =>
  convertPrice(price - (price * percent) / 100);

  export const totalConvertPrice = (price: number, percent: number,count:number) =>{
    const newPrice = percent>0 ? Math.trunc((price - (price * percent) / 100)*count):price*count
    return newPrice;
  }
