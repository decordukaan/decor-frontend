import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import Image from 'next/image';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';
import { useEffect, useState } from 'react';
import { CategoryList } from '../types/categoryList';

const Categories = () => {
  const [categoryList, setCategoryList] = useState<CategoryList>([]);

  useEffect(() => {
    const getCategoryItem = () => {
      GlobalApi.getCategoryList()
        .then((resp: any) => {
          const category = resp.data;
          console.log(resp.data.data);
          setCategoryList(category.data);
        })
        .catch((error: Error) => {
          console.error('Error fetching categories:', error);
        });
    };

    getCategoryItem();
  }, []);

  return (
    <div className='container mx-auto  mt-[52px] sm:mt-[72px]'>
      <h2 className='text-[#373737] font-semibold text-[38px]'>Categories</h2>
      <div className='mt-[24px]'>
        <Carousel
          withIndicators={false}
          slideSize={{ base: '100%', sm: '50%', md: '33.3333%' }} // Mobile: 100%, Small Screens: 100%, Medium & Above: 3 Slides
          slideGap={{ base: 0, sm: 'md' }}
          loop
          align='start'
        >
          {categoryList.map((item) => (
            <Carousel.Slide key={item.id}>
              <Link href={`products/category/${item.id}`} className='block'>
                <div className='group relative min-h-[250px] md:h-[450px] rounded-lg block bg-black cursor-pointer'>
                <img
                    alt={item.attributes?.title}
                    src={item.attributes.image.data?.attributes.url || '/images/default.png'}
                    className='absolute inset-0 sm:h-[450px] h-[250px] rounded-lg w-full object-cover opacity-75 transition-opacity group-hover:opacity-50'
                  />
                  <div className='h-full p-4 sm:p-6 lg:p-8'>
                    <p className='text-[16px] font-bold text-white sm:text-2xl'>
                      {item.attributes?.title}
                    </p>
                    <div className='mt-32 sm:mt-48 lg:mt-64'>
                      <div className='translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
                        <p className='sm:text-sm text-[12px] text-white'>
                          {item.attributes?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
