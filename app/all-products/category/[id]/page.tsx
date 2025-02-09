'use client';

import { useEffect, useState, useRef } from 'react';
import { Tabs } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';


import { Product } from '@/app/types/products';
import GlobalApi from '@/app/_utils/GlobalApi';
import ProductList from '@/app/_components/ProductList';

function AllProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: string]: Product[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 25;

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: loadMoreRef.current,
    threshold: 1,
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await GlobalApi.getAllProducts(currentPage, pageSize);
        const products = res.data.data;
        setAllProducts((prevProducts) => [...prevProducts, ...products]);
        setTotalProducts(res.data.meta.pagination.total);

        const groupedProducts: { [key: string]: Product[] } = {};
        products.forEach((product: Product) => {
          const categoryName =
            product.attributes?.product_category?.data?.attributes?.title ||
            'Uncategorized';
          if (!groupedProducts[categoryName]) {
            groupedProducts[categoryName] = [];
          }
          groupedProducts[categoryName].push(product);
        });

        setProductsByCategory((prevCategories) => {
          const newCategories = { ...prevCategories };
          Object.keys(groupedProducts).forEach((categoryName) => {
            if (!newCategories[categoryName]) {
              newCategories[categoryName] = [];
            }
            newCategories[categoryName].push(...groupedProducts[categoryName]);
          });
          return newCategories;
        });
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [currentPage]);

  useEffect(() => {
    if (entry?.isIntersecting && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [entry, loading]);

  if (loading && currentPage === 1) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-500'>{error}</div>;

  return (
    <div className='container mx-auto my-[52px]'>
      <Tabs defaultValue='All Products'>
        <Tabs.List>
          <Tabs.Tab value='All Products'>All Products</Tabs.Tab>
          {Object.keys(productsByCategory).map((categoryName) => (
            <Tabs.Tab key={categoryName} value={categoryName}>
              {categoryName}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value='All Products'>
          <ProductList productList={allProducts} />
          {loading && <div className='text-center'>Loading more products...</div>}
          <div ref={ref} className='h-1'></div>
        </Tabs.Panel>
        {Object.keys(productsByCategory).map((categoryName) => (
          <Tabs.Panel key={categoryName} value={categoryName}>
            <ProductList productList={productsByCategory[categoryName]} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

export default AllProducts;