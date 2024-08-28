import { RoleModel } from "@/models/RoleModel";

const checkPermission = (permission: string, role: RoleModel | undefined) => {
  if (role) {
    return role.permissions?.some((per) => per.nameEng === permission);
  }
  return false;
};

export default checkPermission;