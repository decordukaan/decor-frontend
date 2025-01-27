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
        height={300}
        width={350}
        className='rounded-lg object-cover text-center'
      />
    </>
  );
};
export default ProductBanner;
