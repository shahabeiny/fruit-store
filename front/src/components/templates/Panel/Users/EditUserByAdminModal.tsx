import BaseModal from '@/components/modules/Modal/BaseModal';
import { RoleModel } from '@/models/RoleModel';
import UserModel from '@/models/UserModel';
import { FC } from 'react';
import UserFormEdit from './UserFormEdit';


type EditUserByAdminModalProps = {
  onHide: () => void;
  roles:RoleModel[];
  init: UserModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const EditUserByAdminModal: FC<EditUserByAdminModalProps> = ({ onHide, init,roles, onSubmit }) => {
  return (
    <BaseModal onHide={onHide} title={`ویرایش نقش ${init?.username}`}>
      <UserFormEdit init={init} roles={roles} onSubmit={onSubmit} />
    </BaseModal>
  );
};

export default EditUserByAdminModal;
