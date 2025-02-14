'use client';

import { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import GlobalApi from '../_utils/GlobalApi';
import ProductList from '../_components/ProductList';
import MainPagination from '../_components/MainPagination';
import { Product } from '@/app/types/products';

function ProductDetailPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: string]: Product[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 25;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await GlobalApi.getAllProducts(currentPage, pageSize);
        const products = res.data.data;
        setAllProducts(products);
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

        setProductsByCategory(groupedProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-500'>{error}</div>;

  return (
    <div className='container mx-auto my-[72px]'>
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
          <MainPagination
            total={Math.ceil(totalProducts / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
          />
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

export default ProductDetailPage;