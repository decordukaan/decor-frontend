'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Product } from '@/app/types/products';
import { Category } from '@/app/types/categoryList';
import ProductList from '@/app/_components/ProductList';
import { Skeleton } from '@mantine/core';

const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const response = await GlobalApi.getProductsByCategory(
        params.id as string
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryById = async () => {
    try {
      const response = await GlobalApi.getCategoryById(params.id as string);
      console.log('Fetched category details:::::::', response.data.data);
      setCategory(response.data.data);
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchCategoryProducts();
      fetchCategoryById();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className='container mx-auto my-[52px] sm:my-[72px]'>
        <h2 className='text-[#3a3a3a] font-semibold text-[28px] sm:text-[38px]'>
          Latest collections
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-2 sm:my-6 my-3'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={200} radius='md' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mx-[20px] sm:mx-0'>
      <div className='container mx-auto mt-12 mb-16'>
        <h1 className='text-[38px] font-bold mb-6 text-[#373737]'>
          {category?.attributes.title}
        </h1>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className='text-[#373737]'>
            No products are currently available in this category. Please check
            back later.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
