'use client';

import { useWishList } from '../_hooks/useWishList';
import { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { ChevronRightSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProductList from './ProductList';

function WishList() {
  const { user, isLoaded } = useUser();
  const { wishListItems,isInWishList } = useWishList();
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
  }, [ user, isLoaded]);

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
      <h1 className='text-[38px] text-[#373737] font-bold '>WishList</h1>
      <h1>{wishListItems.length}</h1>
      {wishListProducts.length > 0 ? (
        <ProductList productList={wishListProducts} />
      ) : (
        <p>Your wishList is empty.</p>
      )}
    </div>
  );
}

export default WishList;
