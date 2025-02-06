import { useContext, useEffect, useCallback } from 'react';
import { CartContext } from '@/app/_context/CartContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user, isLoaded } = useUser();

  const calculateTotalPrice = useCallback((cartItems: any) => {
    return cartItems.reduce((total: number, item: any) => {
      return total + (item.product?.attributes?.pricing || 0) * item.quantity;
    }, 0);
  }, []);

  const updateTotalPrice = useCallback(() => {
    const total = calculateTotalPrice(cart);
    return total;
  }, [cart, calculateTotalPrice]);

  const clearCart = useCallback(async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        await GlobalApi.clearUserCart(user.primaryEmailAddress.emailAddress);
        setCart([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  }, [user, setCart]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (isLoaded && user) {
        try {
          const response = await GlobalApi.getUserCartItems(user.primaryEmailAddress?.emailAddress || '');
          const cartItems = response.data.data.map((item: any) => ({
            id: item.id,
            product: item.attributes.products.data[0],
            quantity: item.attributes.quantity,
            price: parseFloat(item.attributes.price) || 0,
          }));
          setCart(cartItems);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [isLoaded, user, setCart]);

  return { cart, setCart, totalPrice: updateTotalPrice(), clearCart };
};