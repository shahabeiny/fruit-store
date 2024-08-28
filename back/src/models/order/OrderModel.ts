import { Schema, model } from 'mongoose';
import IOrder from '../../interfaces/IOrder';

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderID: {
      type: String,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    time_cancel: Date,
    finishCart: { type: Boolean, default: false },
    status_delivery: {
      type: String,
      enum: ['delivered', 'not_delivered', 'not_confirmed', 'canceled'],
      default: 'not_confirmed'
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
);

OrderSchema.virtual('orderProducts', {
  ref: 'OrderProducts',
  localField: '_id',
  foreignField: 'order'
});

// Middleware to generate 8-digit unique order ID before saving
OrderSchema.pre<IOrder>('save', async function (next: () => void) {
  let randomOrderID = this.orderID || generateUniqueOrderID();

  const checkUniqueOrderID = async () => {
    const existingOrder = await model<IOrder>('Order').findOne({ orderID: randomOrderID });
    if (existingOrder) {
      randomOrderID = generateUniqueOrderID();
      await checkUniqueOrderID();
    }
  };

  await checkUniqueOrderID();
  this.orderID = randomOrderID;
  next();
});

function generateUniqueOrderID(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export default model<IOrder>('Order', OrderSchema);
