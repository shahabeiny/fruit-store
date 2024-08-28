import EmptyList from "@/components/modules/EmptyList/EmptyList";
import Product from "@/components/modules/Product/Product";
import { ProductWithoutInfoModel } from "@/models/ProductModels";
import { FC } from "react";

type ProductListProps = {
  products: ProductWithoutInfoModel[];
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className="container">
      <div
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3.5"
        data-aos="fade-up"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))
        ) : (
          <EmptyList icon="HiArrowPathRoundedSquare" title="محصولی یافت نشد" />
        )}
      </div>
    </div>
  );
};

export default ProductList;
