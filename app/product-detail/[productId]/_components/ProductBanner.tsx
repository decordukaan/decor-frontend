import Image from 'next/image';
import { Product } from '@/app/types/products';

interface ProductIdProps {
  product: Product | undefined;
}

const ProductBanner = ({ product }: ProductIdProps) => {
  return (
    <>
      <Image
        src={product?.attributes?.banner?.data.attributes.url as string}
        alt='banner'
        height={0}
        width={0}
        sizes='100vw'
        className='rounded-lg w-[450px] h-[300px] object-cover text-center'
      />
    </>
  );
};
export default ProductBanner;
