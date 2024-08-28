import Role from './RoleModel';
import UserRepository from '../user/UserRepo';
import PermissionRepository from '../permission/PermissionRepo';
import { FilterQuery, Schema } from 'mongoose';
import IRole, { IEditRole } from '../../interfaces/IRole';

class RoleRepository {
  private UserRepo: UserRepository;
  private PermissionRepo: PermissionRepository;

  constructor() {
    this.UserRepo = new UserRepository();
    this.PermissionRepo = new PermissionRepository();
  }

  async findAll() {
    return await Role.find({})
      .select('_id name nameEng permissions')
      .populate({ path: 'permissions', select: '-__v' })
      .sort({ createdAt: -1 })
      .lean();
  }

  async getRoles() {
    const roles = await this.findAll();
    const rolesWithUserCount = await Promise.all(
      roles.map(async (role) => {
        const usersNum = await this.UserRepo.countUser({ role: role._id });
        return { ...role,usersNum};
      })
    );

    return rolesWithUserCount;
  }

  async findOne(filter: FilterQuery<typeof Role>): Promise<IRole | null> {
    return await Role.findOne(filter).exec();
  }

  async findOneById(_id: Schema.Types.ObjectId): Promise<IRole | null> {
    return await this.findOne({ _id });
  }

  async findOneByCriteria(input: Partial<IRole>, excludeId?: Schema.Types.ObjectId) {
    const filter: FilterQuery<IRole> = {
      $or: [{ name: input.name }, { nameEng: input.nameEng }]
    };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return await this.findOne(filter);
  }

  async createRole(input: IEditRole) {
    let newRole = await Role.create({
      name: input.name,
      nameEng: input.nameEng,
      permissions: input.permissions
    });
    const roleWithPerm = await newRole.populate({ path: 'permissions', select: '-__v' });
    return { ...roleWithPerm.toObject(), usersNum: 0 };
  }

  async createAdminRole() {
    const countUser = await this.UserRepo.countUser({});

    let newRole: IRole;
    if (countUser > 0) {
      let checkRoleUser = await this.findOneByCriteria({ nameEng: 'USER' });
      if (checkRoleUser) {
        newRole = checkRoleUser;
      } else {
        newRole = await this.createRole({ name: 'کاربر', nameEng: 'USER', permissions: [] });
      }
    } else {
      let checkRoleAdmin = await this.findOneByCriteria({ nameEng: 'ADMIN' });
      if (checkRoleAdmin) {
        newRole = checkRoleAdmin;
      } else {
        newRole = await this.createRole({
          name: 'ادمین',
          nameEng: 'ADMIN',
          permissions: await this.PermissionRepo.createPermissions()
        });
      }
    }

    return newRole;
  }

  async updateById(_id: Schema.Types.ObjectId, input: IEditRole): Promise<IRole | null> {
    const updatedRole = await Role.findByIdAndUpdate(_id, input, { new: true })
    .select('_id name nameEng permissions')
    .populate({ path: 'permissions', select: '-__v' }).lean();

    if (updatedRole) {
      const usersNum = await this.UserRepo.countUser({ role: updatedRole._id });
      return { ...updatedRole, usersNum };
    }

    return null;
  }

  async deleteOneById(_id: Schema.Types.ObjectId): Promise<Schema.Types.ObjectId> {
    await Role.deleteOne({ _id }).select('-__v');
    return _id;
  }
}

export default RoleRepository;
