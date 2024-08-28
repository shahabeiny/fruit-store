"use client"
import { OrderProductsModel } from '@/models/OrderModel';
import { totalConvertPrice } from '@/utils/convertPrice';
import { useMemo } from 'react';

interface UseCartTotalsProps {
  products: OrderProductsModel[];
}

export const useCartTotals = ({ products=[] }: UseCartTotalsProps) => {
  const totals = useMemo(() => {
    let totalPrice = 0;
    let totalCount = 0;

    for (const productCart of products) {
      const price = 'price' in productCart.product ? productCart.product.price : 0;
      
      totalCount += +productCart.count;
      totalPrice += totalConvertPrice(price,productCart.product.off,productCart.count)
    }

    return { totalPrice, totalCount };
  }, [products]);

  return totals;
};
