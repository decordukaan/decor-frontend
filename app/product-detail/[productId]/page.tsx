'use client';

import BreadCrumb from '@/app/_components/BreadCrumb';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useEffect, useState, use } from 'react';
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import { Product } from '@/app/types/products';
import ProductList from '@/app/_components/ProductList';

interface ProductDetailProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const { productId } = use(params);
  const [productDetail, setProductDetail] = useState<Product | undefined>();

  const getProductId = async () => {
    try {
      const res = await GlobalApi.getProductById(productId);
      const products = res.data;
      console.log(products.data);
      setProductDetail(products.data);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  useEffect(() => {
    console.log('Product Id', productId);
    if (productId) {
      getProductId();
    }
  }, [productId]);

  return (
    <div className='sm:py-[72px] py-[52px] px-[20px] md:px-28'>
      {/* <BreadCrumb /> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0'>
        <ProductBanner product={productDetail} />
        <ProductInfo product={productDetail} />
      </div>
    </div>
  );
};

export default ProductDetail;
