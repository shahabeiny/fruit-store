"use client";
import { CategoryModel } from "@/models/CategoryModel";
import { FC } from "react";
import Category from "./Category";
import EmptyList from "@/components/modules/EmptyList/EmptyList";

type CategoryListProps = {
  onEdit: (item: CategoryModel) => void;
  onDelete: (item: CategoryModel) => void;
  categories: CategoryModel[];
};

const CategoryList: FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-4 mt-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category
              key={category._id}
              category={category}
              onEdit={() => onEdit(category)}
              onDelete={() => onDelete(category)}
            />
          ))
        ) : (
          <div className="flex-center">
            <EmptyList icon="HiOutlineListBullet" title="دسته بندی یافت نشد" />{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
