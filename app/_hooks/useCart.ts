import { useContext, useEffect, useCallback } from 'react';
import { CartContext } from '@/app/_context/CartContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

export const useCart = () => {
  const { cart, setCart, totalPrice, updateTotalPrice } = useContext(CartContext);
  const { user, isLoaded } = useUser();

  const calculateTotalPrice = useCallback((cartItems:any) => {
    return cartItems.reduce((total: number, item: { price: number; quantity: number; }) => {
      return total + (item.price * item.quantity);
    }, 0);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (isLoaded && user) {
        try {
          const response = await GlobalApi.getUserCartItems(user.primaryEmailAddress?.emailAddress || '');
          const cartItems = response.data.data.map((item: any) => ({
            id: item.id,
            product: item.attributes.products.data[0],
            quantity: item.attributes.quantity,
            price: parseFloat(item.attributes.price) || 0, // Ensure price is a number
          }));
          setCart(cartItems);
          updateTotalPrice(calculateTotalPrice(cartItems));
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [isLoaded, user, setCart, updateTotalPrice, calculateTotalPrice]);

  return { cart, setCart, totalPrice, updateTotalPrice };
};