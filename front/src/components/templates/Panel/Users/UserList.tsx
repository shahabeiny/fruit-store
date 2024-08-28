import { FC } from "react";
import UserBox from "./UserBox";
import UserModel from "@/models/UserModel";
import EmptyList from "@/components/modules/EmptyList/EmptyList";

type UserListProps = {
  users: UserModel[];
  className?: string;
  onEdit: (user: UserModel) => void;
  // onBann?: (user: UserModel) => void;
  // onEditPass: (user: UserModel) => void;
  // onDeleteInactive?: (user: UserModel) => void;
};

const UserList: FC<UserListProps> = ({ users, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-4">
      {users.length > 0 ? (
        users.map((user) => (
          <UserBox
            key={user._id}
            user={user}
            onEdit={() => onEdit(user)}
            // onBann={() => onBann?.(user)}
            // onEditPass={() => onEditPass(user)}
            // onDeleteInactive={() => onDeleteInactive?.(user)}
          />
        ))
      ) : (
        <div className="flex-center">
          <EmptyList icon="HiOutlineUserGroup" title="کاربری یافت نشد" />
        </div>
      )}
    </div>
  );
};

export default UserList;
