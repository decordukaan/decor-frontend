import Hero from './_components/Hero';
import ProductSection from './_components/ProductSection';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Latest Product sections */}
      <div className='mx-[20px] sm:mx-0'>
      <ProductSection />
      </div>
    </>
  );
}
