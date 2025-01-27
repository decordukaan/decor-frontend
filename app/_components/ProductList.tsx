import { ProductListProps } from "../types/products";
import ProductItem from "./ProductItem";




const ProductList = ({ productList }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-4 lg:gap-y-8 mt-[24px]">
      {productList.map((item, index) => (
        <ProductItem key={index} product={item} />
      ))}
    </div>
  );
};
export default ProductList;

