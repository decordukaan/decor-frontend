import React from 'react';
import Image from 'next/image';
import EmblaCarousel from './EmblaCarousel';
import { Product } from '@/app/types/products';

interface ProductIdProps {
  product: Product | undefined;
}

const ProductBanner = ({ product }: ProductIdProps) => {
  const slides =
    product?.attributes?.images?.data?.map((item) => ({
      url: item.attributes.url,
    })) || [];

  const banner = product?.attributes?.banner?.data?.attributes?.url;

  // If there are no slides but there's a banner, use the banner
  if (slides.length === 0 && banner) {
    slides.push({ url: banner });
  }

  if (slides.length === 0) {
    return <div>No images available</div>;
  }

  if (slides.length === 1) {
    return (
      <div className='w-full text-center'>
        <Image
          src={slides[0].url}
          alt="Product image"
          className='h-[400px] w-auto object-cover object-center mx-auto'
          height={0}
          width={0}
          sizes='100vw'
        />
      </div>
    );
  }

  return (
    <div className='product-banner'>
      <EmblaCarousel slides={slides} />
    </div>
  );
};

export default ProductBanner;