import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';

export const useWishlist = () => {
  const { user, isLoaded } = useUser();
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
        try {
          const res = await GlobalApi.getWishlistProductList(user.primaryEmailAddress.emailAddress);
          if (res.status === 200) {
            const usersWishlistData = res.data.data;
            const wishlistProductIds = usersWishlistData[0]?.attributes.products.data.map((product: any) => product.id) || [];
            setWishlistItems(wishlistProductIds);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      } else if (isLoaded && !user) {
        setWishlistItems([]);
      }
    };

    fetchWishlist();
  }, [user, isLoaded]);

  const isInWishlist = (productId: number) => wishlistItems.includes(productId);

  const toggleWishlistItem = async (productId: number) => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      if (isInWishlist(productId)) {
        await GlobalApi.removeFromWishlist(user.primaryEmailAddress.emailAddress, productId);
        setWishlistItems(wishlistItems.filter(id => id !== productId));
      } else {
        await GlobalApi.addToWishlist(
          user.primaryEmailAddress.emailAddress,
          user.fullName ?? '',
          productId
        );
        setWishlistItems([...wishlistItems, productId]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };


  return { wishlistItems, isInWishlist, toggleWishlistItem };
};