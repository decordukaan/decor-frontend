import { useContext, useEffect } from 'react';
import { CartContext } from '@/app/_context/CartContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user, isLoaded } = useUser();

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
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [isLoaded, user, setCart]);

  return { cart, setCart };
};