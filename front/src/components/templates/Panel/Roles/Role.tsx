import Icon from "@/components/modules/Icon/Icon";
import { useAppSelector } from "@/hooks/useReduxhook";
import { RoleModel } from "@/models/RoleModel";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import checkPermission from "@/utils/checkPermission";
import { FC } from "react";

type RoleProps = {
  role: RoleModel;
  className?: string;
  onEdit: () => void;
  onDelete: () => void;
};

const Role: FC<RoleProps> = ({ role, onDelete, onEdit }) => {
  const userInfo = useAppSelector(selectCurrentUser);
  return (
    <div
      className={`flex items-center justify-between gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0  p-2 bg-white dark:bg-zinc-800 rounded-3xl shadow-normal`}
    >
      <div className="flex-x-center gap-x-2.5 md:gap-x-4">
        <div className="flex-center size-12 md:size-[60px] bg-gray-100 dark:bg-white/20 rounded-3xl">
          <span className="font-DanaDemiBold text-xl md:text-2xl rounded-full text-zinc-700 dark:text-white">
            {role.nameEng.toUpperCase().slice(0, 1)}
          </span>
        </div>
        <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-zinc-700 dark:text-white ">
          <span className="font-DanaDemiBold text-sm md:text-xl">
            {role.name}
          </span>
          <span className="text-xs">{role.usersNum} کاربر</span>
        </div>
      </div>
      {checkPermission("EDIT_ROLES", userInfo?.role) && 
     userInfo?.role.nameEng !== "ADMIN" && (
        <div className="flex-x-center gap-x-2.5 md:gap-x-4">
          <Icon
            nameIcon="HiOutlinePencilSquare"
            className="text-sky-500 dark:text-secondary !size-4 xs:!size-5"
            onClick={onEdit}
          />
          <Icon
            nameIcon="HiOutlineTrash"
            className="text-pink-500 dark:text-rose-500 !size-4 xs:!size-5"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Role;
