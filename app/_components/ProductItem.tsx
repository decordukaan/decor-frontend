import Image from 'next/image';
import { Product } from '../types/products';
import { ChevronRightSquare } from 'lucide-react';
import Link from 'next/link';


interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product-detail/${product.id}`}>
      <div className='hover:border p-1 rounded-lg border-yellow-500'>
        <Image
          src={product.attributes?.banner?.data?.attributes?.url || ''}
          alt={product.attributes?.title || 'Product image'}
          width={500}
          height={350}
          className='rounded-t-lg object-cover h-[280px]'
        />
        <div className='flex justify-between items-center bg-gray-50 p-3 rounded-b-lg'>
          <div className='p-2'>
            <h2 className='text-[12px] font-medium '>
              {product.attributes?.title}
            </h2>
            <h2 className='text-[10px] text-gray-400 flex gap-2'>
              <ChevronRightSquare className='h-4 w-4' />
              {product.attributes?.category}
            </h2>
          </div>
          <h2 className='font-medium'>₹{product.attributes?.pricing}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
