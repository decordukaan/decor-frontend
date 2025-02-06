'use client';

import { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import GlobalApi from '../_utils/GlobalApi';
import ProductList from '../_components/ProductList';
import { Product } from '@/app/types/products';

function ProductDetailPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: string]: Product[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await GlobalApi.getAllProducts();
        const products = res.data.data;
        setAllProducts(products);

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
  }, []);

  if (loading) return <div className='text-center'>Loading...</div>;
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
