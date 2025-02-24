import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import EmblaCarousel from './EmblaCarousel';
import { Product } from '@/app/types/products';
import { Skeleton } from '@mantine/core';

interface ProductIdProps {
  product: Product | undefined;
}

const ProductBanner = ({ product }: ProductIdProps) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const slides =
    product?.attributes?.images?.data?.map((item) => ({
      url: item.attributes.url,
    })) || [];

  const banner = product?.attributes?.banner?.data?.attributes?.url;

  useEffect(() => {
    const loadImage = (url: string) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        setImageLoaded(true);
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(true); // Keep skeleton visible if images fail
      };
    };

    if (slides.length > 0) {
      loadImage(slides[0].url);
    } else if (banner) {
      slides.push({ url: banner });
      loadImage(banner);
    } else {
      setLoading(true); // No images, keep skeleton visible
    }
  }, [product]);

  if (loading) {
    return (
      <div className='flex justify-center'>
        <Skeleton height={400} width='50%' />
      </div>
    );
  }

  if (slides.length === 1) {
    return (
      <div className='w-full text-center'>
        <Image
          src={slides[0].url}
          alt='Product image'
          className='h-[400px] w-auto object-cover object-center mx-auto'
          height={400}
          width={400}
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
