export interface PermissionModel {
  _id: string;
  name: string;
  nameEng:string
};

export interface RoleModel {
  _id?: string;
  name: string;
  nameEng:string;
  usersNum:number;
  permissions:PermissionModel[]
};

export interface GetRolesModel{
  permissions: PermissionModel[],
  roles:RoleModel[]
}

export interface addRoleModel{
  _id?: string;
  name: string;
  nameEng:string;
  permissions:string[]
}



 
