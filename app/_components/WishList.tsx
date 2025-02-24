'use client';

import { useWishList } from '../_hooks/useWishList';
import { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { ChevronRightSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProductList from './ProductList';
import { Button } from '@mantine/core';

function WishList() {
  const { user, isLoaded } = useUser();
  const { wishListItems, isInWishList } = useWishList();
  const [wishListProducts, setWishListProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchWishListProducts = async () => {
      try {
        if (user && user.primaryEmailAddress) {
          const res = await GlobalApi.getWishListProductList(
            user.primaryEmailAddress.emailAddress
          );
          if (res.status === 200) {
            const products = res.data.data[0]?.attributes.products.data || [];
            console.log(products, 'ith aanu produts in wishList');
            setWishListProducts(products);
          }
        }
      } catch (error) {
        console.error('Error fetching wishList products:', error);
      }
    };

    if (isLoaded && user) {
      fetchWishListProducts();
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (isLoaded && user) {
      console.log('wishListItems', wishListItems);
      console.log('isInWishList', isInWishList);

      // Filter the wishListProducts state to remove any product
      // whose id is not included in wishListItems.
      setWishListProducts((prevProducts) =>
        prevProducts.filter((product) => wishListItems.includes(product.id))
      );
    }
  }, [wishListItems.length, isLoaded, user]);

  return (
    <div className='container mx-auto my-[52px]'>
      {wishListProducts.length > 0 ? (
        <>
          <h1 className='text-[38px] text-[#373737] font-bold '>
            Your WishList
          </h1>

          <ProductList products={wishListProducts} />
        </>
      ) : (
        <div className='flex flex-col items-center justify-center h-[80vh]'>
          <p className='font-bold text-[#373737] sm:text-[38px] text-[32px]'>
            Your Wishlist is Empty
          </p>
          <Link className='mt-[24px]' href='/'>
            <Button size='lg'>Continue Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default WishList;
