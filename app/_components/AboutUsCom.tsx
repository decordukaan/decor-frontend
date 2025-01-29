'use client';

import { Timeline, Text } from '@mantine/core';

function AboutUsCom() {
  return (
    <div className='bg-gray-50 text-gray-800 min-h-screen'>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/images/About us.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '100%',
        }}
        className='flex flex-col justify-center items-center'
      >
        <h1 className='text-[38px] font-bold text-[#373737]'>
          About Decor Dukaan
        </h1>
        <p className='text-[20px] leading-[24px] text-center font-medium mt-[24px] text-[#373737] max-w-3xl mx-auto'>
          Crafting homes with one-of-a-kind, aesthetically designed, and
          handcrafted home decor pieces. Transform your space into a serene
          haven with timeless elegance and natural charm.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className='py-16 px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-[#373737]'>
        <div>
          <h2 className='text-[24px] font-semibold mb-4'>Our Mission</h2>
          <p className='leading-[24px] text-[18px]'>
            At Decor Dukaan, we aim to bring warmth and personality to your
            living spaces with unique decor items that combine style, comfort,
            and affordability. Every product is thoughtfully curated to ensure
            it adds value and charm to your home.
          </p>
        </div>
        <div>
          <h2 className='text-[24px] font-semibold mb-4'>Our Vision</h2>
          <p className='leading-[24px] text-[18px]'>
            We envision a world where every home tells its unique story through
            decor that reflects the beauty of nature and the creativity of
            handcrafted artistry. We are committed to making exceptional design
            accessible to everyone.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='bg-yellow-600 bg-opacity-15 py-16 px-8 md:px-20 text-[#373737]'>
        <h2 className='text-[38px]  font-semibold text-center '>
          Why Choose Decor Dukaan?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-[52px]'>
          <div className='p-10  bg-zinc-100 shadow rounded-lg'>
            <h3 className='text-[24px] font-bold '>Handcrafted Designs</h3>
            <p className='text-[18px] leading-[24px] mt-[20px]'>
              Each piece is crafted with care, ensuring it’s unique and adds
              character to your space.
            </p>
          </div>
          <div className='p-10  bg-zinc-100 shadow rounded-lg'>
            <h3 className='text-[24px] font-bold '>Natural Inspiration</h3>
            <p className='text-[18px] leading-[24px] mt-[20px]'>
              Drawing from the beauty of nature, our designs bring serenity and
              warmth into your home.
            </p>
          </div>
          <div className='p-10  bg-zinc-100 shadow rounded-lg'>
            <h3 className='text-[24px] font-bold '>Affordable Luxury</h3>
            <p className='text-[18px] leading-[24px] mt-[20px]'>
              Experience the perfect balance of elegance and affordability with
              every purchase.
            </p>
          </div>
        </div>
      </section>

      {/* How to Buy Products Section */}
      <section className='py-16 px-8 md:px-20 bg-white '>
        <h2 className='text-[38px] font-semibold text-center text-[#373737]'>
          How to Buy Our Products
        </h2>
        <div className='relative max-w-fit mx-auto mt-[52px]'>
          <Timeline color='yellow' active={2} bulletSize={24}>
            <Timeline.Item title='1'>
              <Text style={{ color: '#ebac24' }} size='20px' mt={10}>
                Browse
              </Text>
              <Text size='16px' mt={10}>
                Explore our collection and find the perfect decor items for your
                home.
              </Text>
            </Timeline.Item>

            <Timeline.Item title='2'>
              <Text style={{ color: '#ebac24' }} size='20px' mt={10}>
                Add to Cart
              </Text>
              <Text size='16px' mt={10}>
                Select your favorite products and add them to your cart for
                checkout.
              </Text>
            </Timeline.Item>

            <Timeline.Item title='3' lineVariant='dashed'>
              <Text style={{ color: '#ebac24' }} size='20px' mt={10}>
                Secure Payment
              </Text>
              <Text size='16px' mt={10}>
                Complete your purchase securely with multiple payment options
                available.
              </Text>
            </Timeline.Item>

            <Timeline.Item title='4'>
              <Text style={{ color: '#ebac24' }} size='20px' mt={10}>
                Fast Delivery
              </Text>
              <Text size='16px' mt={10}>
                Sit back and relax as we deliver your chosen items safely to
                your doorstep.
              </Text>
            </Timeline.Item>
          </Timeline>
        </div>
      </section>
    </div>
  );
}
export default AboutUsCom;
