'use client';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import Categories from './Categories';
import { useFeaturedProducts } from '../_hooks/useFeaturedProducts';
import { Skeleton, Paper, Text, Title, Button } from '@mantine/core';
import classes from './Hero.module.css';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Transition } from '@mantine/core';
import { useRef, useEffect } from 'react';

const Hero = () => {
  const { products, loading, error } = useFeaturedProducts();
  const autoplay = useRef(null); // ✅ Fix: Initialize as null

  // useEffect(() => {
  //   autoplay.current = Autoplay({ delay: 4000 });
  // }, []);

  return (
    <section>
      <div>
        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className='text-center text-red-500'>
            Error loading featured products
          </div>
        ) : (
          <Carousel
            className='hero-carousel-container'
            withControls={false}
            loop
            withIndicators={false}
            plugins={autoplay.current ? [autoplay.current] : []}
          >
            {products.map((product) => (
              <Carousel.Slide key={product.id}>
                <Paper
                  shadow='md'
                  p='xl'
                  radius={0}
                  style={{
                    backgroundImage: `url(${
                      product.attributes?.cover?.data?.attributes?.url ||
                      '/images/default.png'
                    })`,
                  }}
                  className={`${classes.card}`}
                >
                  <div className='flex flex-col justify-center items-center md:mt-[200px] xl:mt-0'>
                    <Text className={classes.category} size='xs'>
                      {product?.attributes?.product_category?.data?.attributes
                        .title || ''}
                    </Text>
                    <h3 className='sm:text-[22px] font-bold text-[16px] text-white max-w-lg text-center sm:pt-[24px] pt-[18px]'>
                      {product.attributes?.title || 'Product Name'}
                    </h3>
                    <Link
                      className='mt-[24px]'
                      href={`/product-detail/${product.id}`}
                    >
                      <Button
                        className={classes.btn}
                        variant='white'
                        color='dark'
                      >
                        View Product
                      </Button>
                    </Link>
                  </div>
                </Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </div>
      <div className='mt-[64px] xl:mt-[140px] mx-[20px] sm:mx-0'>
        <h1 className='xl:text-[46px] md:text-[36px] text-[32px] leading-[32px] flex flex-col items-center text-center sm:leading-[46px] font-bold text-[#373737]'>
          Transform Your Home into a Heaven –{' '}
          <span className='text-yellow-500 text-center'>
            Welcome to Decor Dukaan
          </span>
        </h1>
        <p className='sm:text-[20px] text-[16px] leading-[18px] text-center mt-[24px] sm:leading-[24px] text-[#373737]'>
          "Curate a space that resonates with your soul –
          <br className='sm:block hidden' /> with our exclusive, handcrafted
          home decor that blends
          <br className='sm:block hidden' /> timeless elegance with natural
          charm.
          <br className='sm:block hidden' /> From serene accents to
          nature-inspired tableware,
          <br className='sm:block hidden' /> bring the outdoors in and create a
          haven that's
          <br className='sm:block hidden' /> uniquely yours."
        </p>
      </div>
      <div className='mx-[20px] md:mx-[60px] xl:mx-0'>
        <Categories />
      </div>
    </section>
  );
};

export default Hero;
