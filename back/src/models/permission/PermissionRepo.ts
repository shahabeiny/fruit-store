import { Schema } from 'mongoose';
import IPermission from '../../interfaces/IPermission ';
import Permission from './PermissionModel';

class PermissionRepository {


  async getPermissionsList(): Promise<IPermission[]> {
   return await Permission.find({}).sort({ createdAt: -1 }).select('-__v');
  }

  async createPermissions(): Promise<Schema.Types.ObjectId[]> {
    const array = [
      { name: 'تغییرات کاربران', nameEng: 'EDIT_USERS' },
      { name: 'نمایش کاربران', nameEng: 'SHOW_USERS' },
      { name: 'افزودن نقش', nameEng: 'EDIT_ROLES' },
      { name: 'نمایش نقش', nameEng: 'SHOW_ROLES' },
      { name: 'تغییرات محصولات', nameEng: 'EDIT_PRODUCTS' },
      { name: 'نمایش محصولات', nameEng: 'SHOW_PRODUCTS' },
      { name: 'ویرایش سفارشات', nameEng: 'EDIT_ORDERS' },
      { name: 'نمایش همه سفارشات', nameEng: 'SHOW_ORDERS' },
      { name: 'نمایش همه کامنت ها', nameEng: 'SHOW_COMMENTS' },
      { name: 'ویرایش و تایید کامنت ', nameEng: 'EDIT_COMMENTS' }
    ];
    const docs = await Permission.insertMany(array);
    return docs.map((d) => d._id);
  }
}

export default PermissionRepository;