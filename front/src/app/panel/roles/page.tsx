"use client";
import ButtonAddCategory from "@/components/modules/Buttons/ButtonAddCategory/ButtonAddCategory";
import Loading from "@/components/modules/Loadings/Loading/Loading";
import RoleList from "@/components/templates/Panel/Roles/RoleList";
import { addRoleModel, RoleModel } from "@/models/RoleModel";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useEditRoleMutation,
  useGetRolesQuery,
} from "@/redux/store/role/roleSlice";
import { handleWarningSwal } from "@/utils/sweetalert";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

const RoleModal = dynamic(
  () => import("@/components/templates/Panel/Roles/RoleModal"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const Roles = () => {
  const [currentRole, setCurrentRole] = useState<RoleModel | null>(null);
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const { data: { roles = [], permissions = [] } = {} } = useGetRolesQuery();
  const [addRole] = useAddRoleMutation();
  const [editRole] = useEditRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const handleForm = async (formData: addRoleModel) => {
    try {
      const thunk = currentRole ? editRole : addRole;
      const result = await thunk(formData).unwrap();
      handleModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleModal = useCallback(
    (showModal: boolean, category: RoleModel | null = null) => {
      setCurrentRole(category);
      setShowModal(showModal);
    },
    []
  );

  const handleDeletion = (role: RoleModel) => {
    handleWarningSwal(() => deleteRole(role), `آیا نقش ${role.name} حذف شود؟`);
  };

  return (
    <>
      <ButtonAddCategory
        onClick={() => setShowModal(true)}
        nameIcon="HiOutlineShieldCheck"
        title="افزودن نقش"
        permission="EDIT_ROLES"
      />

      <RoleList
        roles={roles}
        onEdit={(role) => handleModal(true, role)}
        onDelete={(role) => handleDeletion(role)}
      />

      {ShowModal && (
        <RoleModal
          permissions={permissions}
          init={currentRole}
          onSubmit={handleForm}
          onHide={() => handleModal(false)}
        />
      )}
    </>
  );
};

export default Roles;
