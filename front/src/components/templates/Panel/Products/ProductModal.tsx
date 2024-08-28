import { FC } from "react";
import BaseModal from "@/components/modules/Modal/BaseModal";
import ProductForm from "./ProductForm";
import { CategoryModel } from "@/models/CategoryModel";
import { ProductModel } from "@/models/ProductModels";

type ProductModalProps = {
  onHide: () => void;
  categories: CategoryModel[];
  init: ProductModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const ProductModal: FC<ProductModalProps> = ({
  onHide,
  init,
  onSubmit,
  categories,
}) => {
  return (
    <BaseModal
      onHide={onHide}
      title={init ? `ویرایش محصول ${init.name}` : "افزودن محصول"}
    >
      <ProductForm init={init} onSubmit={onSubmit} categories={categories} />
    </BaseModal>
  );
};

export default ProductModal;
