'use client';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import Categories from './Categories';
import { useFeaturedProducts } from '../_hooks/useFeaturedProducts';
import { Skeleton, Paper, Text, Title, Button,  } from '@mantine/core';
import classes from './Hero.module.css';



const Hero = () => {

  const { products, loading, error } = useFeaturedProducts();

  return (
    <section className='mt-[20px]'>
      <div>
        {loading ? (
          <Skeleton height={'50vh'} radius="md" />
        ) : error ? (
          <div className="text-center text-red-500">Error loading featured products</div>
        ) : (
          <Carousel className='hero-carousel-container'  withControls={false} loop height={'50vh'} withIndicators={true}>
            {products.map((product) => (
              <Carousel.Slide key={product.id}>
                <Paper
                  shadow="md"
                  p="xl"
                  radius="md"
                  style={{ backgroundImage: `url(${product.attributes?.banner?.data?.attributes?.url || ''})` }}
                  className={classes.card}
                >
                  <div>
                    <Text className={classes.category} size="xs">
                      {product.attributes?.category || 'Category'}
                    </Text>
                    <Title order={3} className={classes.title}>
                      {product.attributes?.banner?.data?.attributes?.caption || 'Product Name'}
                    </Title>
                  </div>
                  <Button variant="white" color="dark">
                    View Product
                  </Button>
                </Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </div>
      <div className='mt-[140px]'>
        <h1 className='text-[46px] flex flex-col items-center leading-[46px] font-bold text-[#373737]'>
          Transform Your Home into a Heaven –{' '}
          <span className='text-yellow-500'>Welcome to Decor Dukaan</span>
        </h1>
        <p className='text-[20px] text-center mt-[24px] leading-[24px] text-[#373737]'>
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
      <Categories />
    </section>
  );
};

export default Hero;