import { useState } from 'react';
import { ProductListProps } from '../types/products';
import ProductItem from './ProductItem';

const ProductList = ({ productList }: ProductListProps) => {

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 sm:gap-4 gap-2 lg:gap-x-6 lg:gap-y-8 mt-[24px]">
      {productList.map((item, index) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;