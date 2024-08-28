import { FC } from "react";
import CategoryForm from "./CategoryForm";
import BaseModal from "@/components/modules/Modal/BaseModal";
import { CategoryModel } from "@/models/CategoryModel";

type CategoryModalProps = {
  onHide: () => void;
  init: CategoryModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const CategoryModal: FC<CategoryModalProps> = ({ onHide, init, onSubmit }) => {
  return (
    <BaseModal
      onHide={onHide}
      title={init ? `ویرایش دسته ${init.name}` : "افزودن دسته"}
    >
      <CategoryForm init={init} onSubmit={onSubmit} />
    </BaseModal>
  );
};

export default CategoryModal;
