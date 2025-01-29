'use client';
import ProductList from './ProductList';
import GlobalApi from '../_utils/GlobalApi';
import { useEffect, useState } from 'react';
import { useLatestProducts } from '../_hooks/useLatestProducts';
import { Skeleton } from '@mantine/core';

const ProductSection = () => {
  const {
    products: latestProducts,
    loading: latestLoading,
    error: latestError,
  } = useLatestProducts(8);

  if (latestLoading) {
    return (
      <div className='container mx-auto mt-[72px]'>
        <h2 className='text-[#3a3a3a] font-semibold text-[38px]'>
          Latest collections
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={200} radius="md" />
          ))}
        </div>
      </div>
    );
  }

  if (latestError) {
    return <div>Error: {latestError}</div>;
  }

  return (
    <div className='container mx-auto my-[72px] '>
      <h2 className='text-[#3a3a3a] font-semibold text-[38px]'>
        Latest collections
      </h2>
      <ProductList productList={latestProducts} />
    </div>
  );
};

export default ProductSection;
