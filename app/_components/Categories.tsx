import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import Image from 'next/image';

const Categories = () => {
  const carouselData = [
    {
      id: 1,
      name: 'Wall Art',
      imageUrl: '/images/wall-art.jpg',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?',
    },
    {
      id: 2,
      name: 'Lighting',
      imageUrl: '/images/light.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      name: 'Cushions & Throws',
      imageUrl: '/images/cushions.jpg',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 4,
      name: 'Vases & Planters',
      imageUrl: '/images/vases.jpg',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 5,
      name: 'Clocks',
      imageUrl: '/images/clock.jpg',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  return (
    <div className='container mx-auto mt-[72px]'>
      <h2 className='text-[#373737] font-semibold text-[38px]'>Categories</h2>
      <div className='mt-[24px]'>
        <Carousel
          withIndicators={false}
          slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
          slideGap={{ base: 0, sm: 'md' }}
          loop
          align='start'
        >
          {carouselData.map((item) => (
            <Carousel.Slide key={item.id}>
              <a href='#' className='group relative h-[450px] rounded-lg block bg-black'>
                <img
                  alt={item.name}
                  src={item.imageUrl}
                  className='absolute inset-0 h-[450px] rounded-lg w-full object-cover opacity-75 transition-opacity group-hover:opacity-50'
                />

                <div className='relative p-4 sm:p-6 lg:p-8'>
                  <p className='text-xl font-bold text-white sm:text-2xl'>
                    {item.name}
                  </p>

                  <div className='mt-32 sm:mt-48 lg:mt-64'>
                    <div className='translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
                      <p className='text-sm text-white'>{item.description}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Categories;
