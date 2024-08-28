import { Schema,Document } from 'mongoose';
import IOrderProducts from './IOrderProducts';

interface IOrder extends Document {
  orderID: string;
  user: Schema.Types.ObjectId;
  time_cancel: Date;
  finishCart: boolean;
  orderProducts?: IOrderProducts[];
  status_delivery: 'delivered' | 'not_delivered' | 'not_confirmed' | 'canceled';
}

export default IOrder;