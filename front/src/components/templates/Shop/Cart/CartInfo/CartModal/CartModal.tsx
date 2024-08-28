import BaseModal from '@/components/modules/Modal/BaseModal';
import { FinishOrderModel } from '@/models/OrderModel';
import { FC } from 'react';
import CartForm from '../CartFinishForm/CartForm';

type CartModalProps = {
  onHide: () => void;
  init:  FinishOrderModel| null;
  onSubmit: (formData: FinishOrderModel) => Promise<any>;
};

const CartModal: FC<CartModalProps> = ({ onHide, init, onSubmit }) => {

  return (
    <BaseModal onHide={onHide} title="نهایی کردن سفارش">
      <CartForm init={init}  onSubmit={onSubmit} />
    </BaseModal>
  );
};

export default CartModal;
