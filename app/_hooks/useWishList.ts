import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { useState, useEffect, useCallback, useContext } from 'react';
import { WishListContext } from '../_context/WishListContext';

export const useWishList = () => {
  const { wishListItems, setWishListItems } = useContext(WishListContext);
  const { user, isLoaded } = useUser();
  const [isWishListLoaded, setIsWishListLoaded] = useState(false);

  const isInWishList = useCallback(
    (productId: number) => wishListItems.includes(productId),
    [wishListItems]
  );

  useEffect(() => {
    if (!isLoaded) return;

    const fetchWishList = async () => {
      setIsWishListLoaded(false); // Start loading
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const res = await GlobalApi.getWishListProductList(
            user.primaryEmailAddress.emailAddress
          );
          if (res.status === 200) {
            const usersWishListData = res.data.data;
            const wishListProductIds =
              usersWishListData[0]?.attributes.products.data.map(
                (product: any) => product.id
              ) || [];
            setWishListItems(wishListProductIds);
          }
        } catch (error) {
          console.error('Error fetching wishList:', error);
        } finally {
          setIsWishListLoaded(true); // Loading complete
        }
      } else {
        setWishListItems([]);
        setIsWishListLoaded(true); // Loading complete
      }
    };

    fetchWishList();
  }, [user, isLoaded, setWishListItems]);

  const toggleWishListItem = async (productId: number) => {
    if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) return;

    const isCurrentlyInWishList = isInWishList(productId);

    // Optimistically update the state
    setWishListItems((prevItems: any[]) =>
      isCurrentlyInWishList
        ? prevItems.filter((id) => id !== productId)
        : [...prevItems, productId]
    );

    try {
      if (isCurrentlyInWishList) {
        await GlobalApi.removeFromWishList(
          user.primaryEmailAddress.emailAddress,
          productId
        );
      } else {
        await GlobalApi.addToWishList(
          user.primaryEmailAddress.emailAddress,
          user.fullName ?? '',
          productId
        );
      }
    } catch (error) {
      console.error('Error updating wishList:', error);
      // Revert the optimistic update if the API call fails
      setWishListItems((prevItems: any[]) =>
        isCurrentlyInWishList
          ? [...prevItems, productId]
          : prevItems.filter((id) => id !== productId)
      );
    }
  };

  return { wishListItems, isInWishList, toggleWishListItem, isWishListLoaded };
};