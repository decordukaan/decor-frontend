'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Product } from '@/app/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/app/types/categoryList';
import ProductItem from '@/app/_components/ProductItem';

const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const response = await GlobalApi.getProductsByCategory(params.id as string);
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
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto mt-12 mb-16'>
      <h1 className='text-[38px] font-bold mb-6'>
        Category: {category?.attributes.title}
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products?.map((product,index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;