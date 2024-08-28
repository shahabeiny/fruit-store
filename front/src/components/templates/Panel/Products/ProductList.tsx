import React, { FC } from "react";
import ProductBox from "./ProductBox";
import { ProductModel } from "@/models/ProductModels";
import EmptyList from "@/components/modules/EmptyList/EmptyList";

type ProductListProps = {
  onEdit?: (product: ProductModel) => void;
  onDelete?: (product: ProductModel) => void;
  products: ProductModel[];
};

const ProductList: FC<ProductListProps> = ({ onEdit, products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-3 md:gap-3.5  mt-6">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductBox
            key={product._id}
            product={product}
            onEdit={() => onEdit?.(product)}
          />
        ))
      ) : (
        <div className="flex-center">
          {" "}
          <div className="flex-center">
            <EmptyList
              icon="HiArrowPathRoundedSquare"
              title="محصولی یافت نشد"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
