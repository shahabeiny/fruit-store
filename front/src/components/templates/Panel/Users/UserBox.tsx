import Icon from "@/components/modules/Icon/Icon";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import { useAppSelector } from "@/hooks/useReduxhook";
import UserModel from "@/models/UserModel";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import checkPermission from "@/utils/checkPermission";
import getFullName from "@/utils/fullName";
import Image from "next/image";
import { FC } from "react";

type UserProps = {
  user: UserModel;
  className?: string;
  onEdit: (user: UserModel) => void;
  // onEditPass: (user: UserModel) => void;
  // onBann?: (user: UserModel) => void;
  // onDeleteInactive?: (user: UserModel) => void;
};

const UserBox: FC<UserProps> = ({ user, onEdit }) => {
  const userInfo = useAppSelector(selectCurrentUser);
  return (
    <div
      className={`relative flex flex-col items-center gap-y-4 bg-white dark:bg-zinc-800 p-3 md:p-4 lg:p-3 xl:p-4 rounded-3xl shadow-normal`}
    >
      {checkPermission("EDIT_USERS", userInfo?.role) &&
        user.role.nameEng !== "ADMIN" && (
          <Icon
            nameIcon="HiOutlinePencilSquare"
            className="absolute top-4 left-3 text-sky-500 dark:text-sky-400 !size-5"
            onClick={() => onEdit(user)}
          />
        )}
      {/* <Icon nameIcon="HiOutlineTrash" className="absolute top-14 left-3 text-pink-500 dark:text-rose-500 !size-5" /> */}
      {/* <Icon
        nameIcon="HiMiniNoSymbol"
        className="absolute top-14 left-3 text-pink-500 dark:text-rose-500 !size-5"
      /> */}
      {/* <Icon nameIcon="HiArrowPath" className="absolute top-14 left-3 text-amber-400 dark:text-yellow-400 !size-5" /> */}
      {/* <Icon
        nameIcon="HiOutlineKey"
        className="absolute top-4 right-3 text-teal-700 dark:text-emerald-500 !size-5"
      /> */}

      <div className="flex-center size-12 shrink-0 bg-gray-100 dark:bg-white/20 rounded-3xl">
        <Image
          alt={user.username}
          width={400}
          height={400}
          src={user?.avatar?`${process.env.API_URL}/${user.avatar}`:"/images/avatar.png"}
          className="size-8 md:size-9 rounded-full"
        />
      </div>
      <div className="flex items-start flex-col gap-y-2">
        <SectionTitle
          nameIcon="HiOutlineUser"
          title={user.username}
          iconClassName="!size-4"
          className="text-zinc-700 dark:text-white !gap-x-2"
        />
        <SectionTitle
          nameIcon="HiOutlineUser"
          title={getFullName(user.name ?? "", user.family ?? "")}
          iconClassName="!size-4"
          className="text-zinc-700 dark:text-white !gap-x-2"
        />
        <SectionTitle
          nameIcon="HiOutlinePhone"
          title={user.mobile}
          iconClassName="!size-4 rotate-[270deg]"
          className="text-zinc-700 dark:text-white !gap-x-2"
        />
        <SectionTitle
          nameIcon="HiOutlineEnvelope"
          title={user.email}
          iconClassName="!size-4"
          className="text-zinc-700 dark:text-white !gap-x-2"
        />
      </div>
    </div>
  );
};

export default UserBox;
