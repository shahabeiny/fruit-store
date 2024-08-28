"use client";
import ButtonAddCategory from "@/components/modules/Buttons/ButtonAddCategory/ButtonAddCategory";
import Loading from "@/components/modules/Loadings/Loading/Loading";
import CategoryList from "@/components/templates/Panel/Categories/CategoryList";
import { CategoryModel } from "@/models/CategoryModel";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/store/category/categorySlice";
import { handleWarningSwal } from "@/utils/sweetalert";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const CategoryModal = dynamic(
  () => import("@/components/templates/Panel/Categories/CategoryModal"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState<CategoryModel | null>(
    null
  );
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleForm = async (formData: FormData) => {
    try {
      const thunk = currentCategory ? editCategory : addCategory;
      const result = await thunk(formData).unwrap();
      handleModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleModal = useCallback(
    (showModal: boolean, category: CategoryModel | null = null) => {
      setCurrentCategory(category);
      setShowModal(showModal);
    },
    []
  );

  const handleDeletion = (category: CategoryModel) => {
    handleWarningSwal(
      () => deleteCategory(category),
      `آیا دسته بندی ${category.name} حذف شود؟`
    );
  };

  return (
    <>
      <ButtonAddCategory
        onClick={() => setShowModal(true)}
        nameIcon="HiOutlineListBullet"
        title="افزودن دسته"
        permission="EDIT_PRODUCTS"
      />

      <CategoryList
        categories={categories}
        onEdit={(category) => handleModal(true, category)}
        onDelete={(category) => handleDeletion(category)}
      />

      {ShowModal && (
        <CategoryModal
          init={currentCategory}
          onSubmit={handleForm}
          onHide={() => handleModal(false)}
        />
      )}
    </>
  );
};

export default Categories;
