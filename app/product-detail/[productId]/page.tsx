'use client';

import BreadCrumb from '@/app/_components/BreadCrumb';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useEffect, useState } from 'react';
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import { Product } from '@/app/types/products';
import ProductList from '@/app/_components/ProductList';
import { Skeleton } from '@mantine/core';
import ProductJsonLd from '@/app/_components/ProductJsonLd';

interface ProductDetailProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [productDetail, setProductDetail] = useState<Product | undefined>();
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // First useEffect - unwrap params
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.productId);
    };
    unwrapParams();
  }, [params]);

  // Second useEffect - fetch product data
  useEffect(() => {
    const getProductId = async () => {
      if (!productId) return;
      setIsLoading(true);
      try {
        const res = await GlobalApi.getProductById(productId);
        const products = res.data;
        console.log('Product Data:', products.data);
        setProductDetail(products.data);
        setIsOutOfStock(products.data.attributes.stock === 0);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProductId();
    }
  }, [productId]);

  if (isLoading || !productDetail) {
    return <Skeleton height={500} width='100%' radius='md' />;
  }

  return (
    <>
      {productDetail && <ProductJsonLd product={productDetail} />}
      <div className='sm:py-[72px] py-[52px] px-[20px] md:px-28'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0'>
          <ProductBanner product={productDetail} />
          <ProductInfo product={productDetail} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;