"use client";
import Loading from "@/components/modules/Loadings/Loading/Loading";
import UserList from "@/components/templates/Panel/Users/UserList";
import UserModel from "@/models/UserModel";
import {
  useEditUserByAdminMutation,
  useGetUsersByParamQuery,
} from "@/redux/store/user/userSlice";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

const EditUserByAdminModal = dynamic(
  () => import("@/components/templates/Panel/Users/EditUserByAdminModal"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

type stateModel = {
  showModalEdit: boolean;
  currentUser: UserModel | null;
};

const UsersPanel = () => {
  const [user, setUser] = useState<stateModel>({
    showModalEdit: false,
    currentUser: null,
  });

  const { data: { users = [], roles = [] } = {} } = useGetUsersByParamQuery();
  const [editUser] = useEditUserByAdminMutation();

  const handleModal = useCallback(
    (showModalEdit: boolean = false, user: UserModel | null = null) => {
      setUser({
        showModalEdit,
        currentUser: user,
      });
    },
    []
  );

  const handleEdition = async (formData: FormData) => {
    try {
      const result = await editUser(formData).unwrap();
      handleModal();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <UserList users={users} onEdit={(user) => handleModal(true, user)} />

      {user.showModalEdit && (
        <EditUserByAdminModal
          roles={roles}
          init={user.currentUser}
          onSubmit={handleEdition}
          onHide={() => handleModal(false)}
        />
      )}
    </>
  );
};

export default UsersPanel;
