"use client";
import ButtonAddCategory from "@/components/modules/Buttons/ButtonAddCategory/ButtonAddCategory";
import Loading from "@/components/modules/Loadings/Loading/Loading";
import ProductList from "@/components/templates/Panel/Products/ProductList";
import { ProductModel } from "@/models/ProductModels";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductsByAdminQuery,
} from "@/redux/store/product/productSlice";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

const ProductModal = dynamic(
  () => import("@/components/templates/Panel/Products/ProductModal"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const Products = () => {
  const slug = "is_panel=true";
  const { data: { products = [], categories = [] } = {} } =
    useGetProductsByAdminQuery(slug);
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();

  const [currentProduct, setCurrentProduct] = useState<ProductModel | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleForm = async (formData: FormData) => {
    try {
      const thunk = currentProduct ? editProduct : addProduct;
      const result = await thunk({ slug, init: formData }).unwrap();
      handleModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleModal = useCallback(
    (showModal: boolean, role: ProductModel | null = null) => {
      setCurrentProduct(role);
      setShowModal(showModal);
    },
    []
  );

  return (
    <>
      <ButtonAddCategory
        onClick={() => setShowModal(true)}
        nameIcon="HiArrowPathRoundedSquare"
        title="افزودن محصول"
        permission="EDIT_PRODUCTS"
      />

      <ProductList
        products={products}
        onEdit={(category) => handleModal(true, category)}
      />

      {showModal && (
        <ProductModal
          init={currentProduct}
          onSubmit={handleForm}
          onHide={() => handleModal(false)}
          categories={categories}
        />
      )}
    </>
  );
};

export default Products;
