'use client';

import { useEffect, useState } from 'react';
import { Tabs, Skeleton } from '@mantine/core';
import GlobalApi from '../_utils/GlobalApi';
import ProductList from '../_components/ProductList';
import MainPagination from '../_components/MainPagination';
import { Product } from '@/app/types/products';

function AllProducts() {
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({ All: 1 });
  const [totalProducts, setTotalProducts] = useState<{ [key: string]: number }>({ All: 0 });
  const [activeTab, setActiveTab] = useState('All');

  const pageSize = 25;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GlobalApi.getCategoryList();
        const categoryList = res.data.data.map((cat: any) => ({
          id: cat.id, // Store category ID
          title: cat.attributes.title,
        }));
        setCategories(categoryList);

        // Initialize pagination for each category
        const paginationInit = categoryList.reduce((acc: { [key: string]: number }, category: { title: string | number; }) => {
          acc[category.title] = 1;
          return acc;
        }, {});

        setCurrentPage((prev) => ({ ...prev, ...paginationInit }));
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);


  // Fetch products when the tab changes or pagination changes
  useEffect(() => {
    fetchProducts(activeTab, currentPage[activeTab] || 1);
  }, [activeTab, currentPage]);

  // Fetch products (All or by category)
  const fetchProducts = async (category: string, page: number) => {
    try {
      setLoading(true);
      let res;

      if (category === 'All') {
        res = await GlobalApi.getAllProducts(page, pageSize);
      } else {
        // Get category ID from the state
        const categoryObj = categories.find((c) => c.title === category);
        if (!categoryObj) return console.error(`Category "${category}" not found`);

        res = await GlobalApi.getProductsByCategory(categoryObj.id, page, pageSize);
      }

      console.log(`Fetched products for ${category}:`, res.data);

      const total = res.data.meta?.pagination?.total || 0;

      setProducts((prev) => ({ ...prev, [category]: res.data.data || [] }));
      setTotalProducts((prev) => ({ ...prev, [category]: total }));
    } catch (err) {
      setError(`Failed to fetch products for ${category}`);
      console.error(`Error fetching category ${category}:`, err);
    } finally {
      setLoading(false);
    }
  };


  // Handle pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage((prev) => ({ ...prev, [activeTab]: page }));
  };

  return (
    <div className='container mx-auto my-[52px]'>
      <Tabs value={activeTab} onChange={(tab) => setActiveTab(tab || 'All')}>
        <Tabs.List>
          <Tabs.Tab value='All'>All Products</Tabs.Tab>
          {categories.map((category) => (
            <Tabs.Tab key={category.id} value={category.title}>
              {category.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value="All">
          {loading ? (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
              {Array.from({ length: 8}).map((_, index) => (
                <Skeleton key={index} height={200} radius="md" />
              ))}
            </div>
          ) : (
            <ProductList productList={products['All'] || []} />
          )}
          <MainPagination
            total={Math.ceil((totalProducts['All'] || 0) / pageSize)}
            page={currentPage['All']}
            onChange={handlePageChange}
          />
        </Tabs.Panel>

        {categories.map((category) => (
          <Tabs.Panel key={category.id} value={category.title}>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {Array.from({ length: 8}).map((_, index) => (
                  <Skeleton key={index} height={200} radius="md" />
                ))}
              </div>
            ) : (
              <ProductList productList={products[category.title] || []} />
            )}
            <MainPagination
              total={Math.ceil((totalProducts[category.title] || 0) / pageSize)}
              page={currentPage[category.title] || 1}
              onChange={handlePageChange}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

export default AllProducts;