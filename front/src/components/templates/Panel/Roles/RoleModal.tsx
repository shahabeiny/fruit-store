import { FC } from "react";

import RoleForm from "./RoleForm";
import BaseModal from "@/components/modules/Modal/BaseModal";
import { PermissionModel, RoleModel, addRoleModel } from "@/models/RoleModel";

type RoleModalProps = {
  onHide: () => void;
  init: RoleModel | null;
  onSubmit: (formData: addRoleModel) => Promise<any>;
  permissions: PermissionModel[];
};

const RoleModal: FC<RoleModalProps> = ({
  onHide,
  init,
  onSubmit,
  permissions,
}) => {
  return (
    <BaseModal
      onHide={onHide}
      title={init ? `ویرایش نقش ${init.name}` : "افزودن نقس"}
    >
      <RoleForm init={init} onSubmit={onSubmit} permissions={permissions} />
    </BaseModal>
  );
};

export default RoleModal;
