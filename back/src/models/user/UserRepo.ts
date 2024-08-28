import SecurityService from '../../services/securityService';
import RoleRepository from '../role/RoleRepo';
import User from './UserModel';
import IUser, { ICreateUser, IUserCriteria } from '../../interfaces/IUser';
import { FilterQuery, Schema } from 'mongoose';

class UserRepository {
  async countUser(filter: FilterQuery<typeof User> = {}) {
    return await User.countDocuments(filter);
  }

  async countUserByRole(roleId: Schema.Types.ObjectId) {
    return await this.countUser({ role: roleId });
  }

  async findAll(filter: FilterQuery<typeof User>) {
    return await User.find(filter).select('-__v -password -otp').sort({ createdAt: -1 });
  }

  async findAllByEmailMobileOrUsername(email: string, mobile: string, username: string) {
    return await this.findAll({ $or: [{ email }, { mobile }, { username }] });
  }

  async findOne(filter: FilterQuery<typeof User>) {
    return await User.findOne(filter);
  }

  async findOneById(_id: Schema.Types.ObjectId) {
    return await this.findOne({ _id });
  }

  async findOneByCriteria(input: Partial<IUserCriteria>) {
    return await this.findOne({ ...input });
  }

  async checkUserExists(input: Partial<IUserCriteria>, excludeUserId?: string): Promise<boolean> {
    const filter: FilterQuery<IUser> = {
      $or: [
        { username: input.username },
        { email: input.email },
        { mobile: input.mobile },
        { role: input.role }
      ]
    };

    if (excludeUserId) {
      filter._id = { $ne: excludeUserId };
    }

    const existingUser = await User.findOne(filter);
    return !!existingUser;
  }

  async updateById(_id: Schema.Types.ObjectId, editValues: Partial<IUser>) {
    return await User.findByIdAndUpdate(_id, editValues, {
      new: true
    })
      .select('-__v')
      .populate({
        path: 'role',
        select: '_id name nameEng permissions',
        populate: {
          path: 'permissions',
          select: 'name nameEng'
        }
      })
      .lean();
  }

  async create(input: ICreateUser) {
    let createRole = new RoleRepository();
    let user = await User.create({
      email: input.email,
      mobile: input.mobile,
      username: input.username,
      password: await SecurityService.hashPassword(input.password),
      role: await createRole.createAdminRole()
    });

    return await this.populateUserRole(user);
  }

  async populateUserRole(user: IUser) {
    return await user.populate({
      path: 'role',
      select: '_id name nameEng permissions',
      populate: {
        path: 'permissions',
        select: 'name nameEng'
      }
    });
  }

  async deleteOneById(_id: Schema.Types.ObjectId): Promise<Schema.Types.ObjectId> {
    User.deleteOne({ _id }).exec();
    return _id;
  }
}

export default UserRepository;
