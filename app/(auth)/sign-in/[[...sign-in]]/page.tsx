import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className='bg-white'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        {/* Left section with background image */}
        <section className='relative flex h-[360px] lg:h-full items-end bg-gray-900 lg:col-span-5 xl:col-span-6'>
          <img
            alt=''
            src='/images/carousel-2.avif'
            className='absolute inset-0 h-full w-full object-cover'
          />
          {/* Black overlay */}
          <div className='absolute inset-0 bg-black opacity-50'></div>

          {/* Text for large screens */}
          <div className='hidden lg:relative lg:block lg:p-12'>
            <h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
              Welcome to Decor Dukaan
            </h2>

            <p className='mt-4 leading-relaxed text-white/90 text-[18px] max-w-[80%]'>
              Discover a world of elegant home decor at Decor Dukaan. Sign in to
              explore our latest collections, exclusive deals, and personalized
              recommendations to beautify your space effortlessly.
            </p>
          </div>

          {/* Text for mobile screens */}
          <div className='absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white lg:hidden'>
            <h1 className='text-2xl font-bold sm:text-3xl'>Welcome to Decor Dukaan</h1>
            <p className='mt-2 text-sm sm:text-base max-w-[90%]'>
              Discover a world of elegant home decor at Decor Dukaan. Sign in to explore our latest collections, exclusive deals, and personalized recommendations to beautify your space effortlessly.
            </p>
          </div>
        </section>

        {/* Right section with sign-in form */}
        <main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
          <div className='max-w-xl lg:max-w-3xl'>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
