import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../types/products';
import { ChevronRightSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishList } from '../_hooks/useWishList';
import { useUser } from '@clerk/nextjs';
import { showNotification } from '@mantine/notifications';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  console.log('Product Item rendered', product);
  const { isInWishList, toggleWishListItem } = useWishList();
  const { user, isLoaded } = useUser();

  const handleToggleFavorite = async () => {
    if (!isLoaded) return;

    if (!user) {
      showNotification({
        title: 'Sign in required',
        message: (
          <div>
            Please{' '}
            <Link href='/sign-in' className='text-blue-500 underline'>
              sign in
            </Link>{' '}
            to add items to your wishList.
          </div>
        ),
        color: 'yellow',
      });
      return;
    }

    const wasInWishList = isInWishList(product.id!);
    await toggleWishListItem(product.id!);

    // Show notification based on the action
    showNotification({
      title: wasInWishList ? 'Removed from WishList' : 'Added to WishList',
      message: wasInWishList
        ? 'This product has been removed from your wishList.'
        : 'This product has been added to your wishList.',
      color: wasInWishList ? 'red' : 'green',
    });
  };

  return (
    <div className='hover:border p-1 rounded-lg border-yellow-500 relative'>
      {/* WishList Toggle Button */}
      <div
        className={`absolute top-2 right-2 cursor-pointer p-1 ${
          isLoaded && user && isInWishList(product.id!)
            ? 'text-red-500'
            : 'text-gray-500'
        }`}
        onClick={handleToggleFavorite}
      >
        <Heart className='h-5 w-5' />
      </div>

      {/* Product Link */}
      <Link href={`/product-detail/${product.id}`}>
        <Image
          src={product.attributes?.banner?.data?.attributes?.url || ''}
          alt={product.attributes?.title || 'Product image'}
          width={500}
          height={350}
          className='rounded-t-lg object-cover h-[280px]'
        />
        <div className='flex justify-between items-center bg-gray-50 p-3 rounded-b-lg'>
          <div className='p-2'>
            <h2 className='text-[12px] font-medium'>
              {product.attributes?.title}
            </h2>
            <h2 className='text-[10px] text-gray-400 flex gap-2'>
              <ChevronRightSquare className='h-4 w-4' />
              {product.attributes?.product_category?.data?.attributes.title}
            </h2>
          </div>
          <h2 className='font-medium'>₹{product.attributes?.pricing}</h2>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
