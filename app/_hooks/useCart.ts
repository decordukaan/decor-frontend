import { useContext, useEffect } from 'react';
import { CartContext } from '../_context/CartContext';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const getCartItems = (userEmail: string, setCart: React.Dispatch<any>) => {
    GlobalApi.getUserCartItems(userEmail).then(
      (resp: { data: { data: any[] } }) => {
        const result = resp.data.data;
        result &&
          result.forEach((prd) => {
            setCart((prevCart: any[]) => [
              ...prevCart,
              {
                id: prd.id,
                product: prd.attributes.products.data[0],
              },
            ]);
          });
      }
    );
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getCartItems(user.primaryEmailAddress.emailAddress, setCart);
    }
  }, [user, setCart]);

  return { cart, setCart };
};
