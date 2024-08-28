import Icon from "@/components/modules/Icon/Icon";
import { useAppSelector } from "@/hooks/useReduxhook";
import { CategoryModel } from "@/models/CategoryModel";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import checkPermission from "@/utils/checkPermission";
import Image from "next/image";
import { FC } from "react";

type CategoryProps = {
  category: CategoryModel;
  className?: string;
  onEdit: () => void;
  onDelete: () => void;
};

const Category: FC<CategoryProps> = ({ category, onDelete, onEdit }) => {
  const userInfo = useAppSelector(selectCurrentUser);
  return (
    <div
      className={`flex items-center justify-between gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0  p-2 bg-white dark:bg-zinc-800 rounded-3xl shadow-normal`}
    >
      <div className="flex-x-center gap-x-2.5 md:gap-x-4">
        <div className="flex-center size-12 md:size-[60px] overflow-hidden rounded-2xl">
          <Image
            alt={category.name}
            width={400}
            height={400}
            src={`${process.env.API_URL}/${category.banner}`}
            className="size-full"
          />
        </div>

        <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-zinc-700 dark:text-white ">
          <span className="font-DanaDemiBold text-sm md:text-xl">
            {category.name}
          </span>
          <span className="text-xs">{category.productsNum} محصول</span>
        </div>
      </div>
      {checkPermission("EDIT_PRODUCTS", userInfo?.role) && (
        <div className="flex-x-center gap-x-2.5 md:gap-x-4">
          <Icon
            nameIcon="HiOutlinePencilSquare"
            className="text-sky-500 dark:text-sky-400 !size-4 xs:!size-5"
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

export default Category;
