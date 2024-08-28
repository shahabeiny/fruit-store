import { Schema, model } from 'mongoose';
import IRole from '../../interfaces/IRole';

const roleSchema: Schema<IRole> = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 15 },
    nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
);

roleSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'role'
});

export default model<IRole>('Role', roleSchema);
