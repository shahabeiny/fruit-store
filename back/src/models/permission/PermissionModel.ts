import { model, Schema } from 'mongoose';
import IPermission from '../../interfaces/IPermission ';

const permissionSchema: Schema<IPermission> = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 60 },
    nameEng: { type: String, minLength: 2, maxLength: 60, required: true }
  },
  { timestamps: true }
);

export default model<IPermission>('Permission', permissionSchema);
