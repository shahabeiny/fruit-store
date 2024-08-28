import React, { FC } from "react";
import Role from "./Role";
import { RoleModel } from "@/models/RoleModel";
import EmptyList from "@/components/modules/EmptyList/EmptyList";

type RoleListProps = {
  onEdit: (item: RoleModel) => void;
  onDelete: (item: RoleModel) => void;
  roles: RoleModel[];
};

const RoleList: FC<RoleListProps> = ({ roles, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-4 mt-6">
      {roles.length > 0 ? (
        roles.map((role) => (
          <Role
            key={role._id}
            role={role}
            onEdit={() => onEdit(role)}
            onDelete={() => onDelete(role)}
          />
        ))
      ) : (
        <div className="flex-center">
          <EmptyList icon="HiOutlineShieldCheck" title="نقشی یافت نشد" />
        </div>
      )}
    </div>
  );
};

export default RoleList;
