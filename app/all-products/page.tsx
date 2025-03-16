'use client';

import { useEffect, useState } from 'react';
import { Tabs, Skeleton } from '@mantine/core';
import GlobalApi from '../_utils/GlobalApi';
import ProductList from '../_components/ProductList';
import MainPagination from '../_components/MainPagination';
import { Product } from '@/app/types/products';

function AllProducts() {
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
  const [categories, setCategories] = useState<{ id: string; title: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({
    All: 1,
  });
  const [totalProducts, setTotalProducts] = useState<{ [key: string]: number }>(
    { All: 0 }
  );
  const [activeTab, setActiveTab] = useState('All');

  const pageSize = 25;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoryRes, allProductsRes] = await Promise.all([
          GlobalApi.getCategoryList(),
          GlobalApi.getAllProducts(1, pageSize),
        ]);

        const categoriesWithProducts = await Promise.all(
          categoryRes.data.data.map(async (cat: any) => {
            const productsRes = await GlobalApi.getProductsByCategory(cat.id);
            const productCount = productsRes.data.data.length;
            return {
              id: cat.id,
              title: cat.attributes.title,
              productCount,
            };
          })
        );

        const sortedCategories = categoriesWithProducts
          .filter((category) => category.productCount > 0)
          .sort((a, b) => b.productCount - a.productCount);

        setCategories(sortedCategories);

        const paginationInit = sortedCategories.reduce(
          (
            acc: { [key: string]: number },
            category: { title: string | number }
          ) => {
            acc[category.title] = 1;
            return acc;
          },
          {}
        );

        setCurrentPage((prev) => ({ ...prev, ...paginationInit }));

        const totalAllProducts =
          allProductsRes.data.meta?.pagination?.total || 0;
        setProducts((prev) => ({
          ...prev,
          All: allProductsRes.data.data || [],
        }));
        setTotalProducts((prev) => ({ ...prev, All: totalAllProducts }));
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab !== 'All') {
      const fetchProducts = async (category: string, page: number) => {
        try {
          setLoading(true);
          const categoryObj = categories.find((c) => c.title === category);
          if (!categoryObj)
            return console.error(`Category "${category}" not found`);

          const res = await GlobalApi.getProductsByCategory(
            categoryObj.id,
            page,
            pageSize
          );
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

      fetchProducts(activeTab, currentPage[activeTab] || 1);
    }
  }, [activeTab, currentPage, categories]);

  const handlePageChange = (page: number) => {
    setCurrentPage((prev) => ({ ...prev, [activeTab]: page }));
  };

  return (
    <div className='container mx-auto sm:my-[72px] my-[48px]'>
      <div className='mx-[20px] md:mx-[60px] xl:mx-0'>
        <Tabs value={activeTab} onChange={(tab) => setActiveTab(tab || 'All')}>
          <Tabs.List className='tabs-list sm:overflow-hidden overflow-x-auto flex'>
            <Tabs.Tab value='All'>All Products</Tabs.Tab>
            {categories.map((category) => (
              <Tabs.Tab key={category.id} value={category.title}>
                {category.title}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value='All'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} height={200} radius='md' />
                ))}
              </div>
            ) : (
              <ProductList products={products['All'] || []} />
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
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} height={200} radius='md' />
                  ))}
                </div>
              ) : (
                <ProductList products={products[category.title] || []} />
              )}
              <MainPagination
                total={Math.ceil(
                  (totalProducts[category.title] || 0) / pageSize
                )}
                page={currentPage[category.title] || 1}
                onChange={handlePageChange}
              />
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default AllProducts;
