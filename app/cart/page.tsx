"use client"

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../_context/CartContext';
import GlobalApi from '../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { Box, Button, Skeleton, Tooltip } from '@mantine/core';
import { IconTrash, IconMinus, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

const Cart = () => {
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const [loadingItems, setLoadingItems] = useState<number[]>([]);
  const [updatingItems, setUpdatingItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const getTotalAmount = () => {
    return cart.reduce((total: number, item: any) => {
      return total + Number(item.product.attributes.pricing) * item.quantity;
    }, 0);
  };

  const updateCartItem = (id: number, quantity: number) => {
    setUpdatingItems((prev) => [...prev, id]);
    const item = cart.find((cartItem: any) => cartItem.id === id);
    if (!item) return;

    const newPrice = Number(item.product.attributes.pricing) * quantity;

    GlobalApi.updateCartItem(id, { data: { quantity, price: newPrice } })
      .then(() => {
        setCart((prevCart: any[]) =>
          prevCart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity, price: newPrice }
              : cartItem
          )
        );
      })
      .finally(() =>
        setUpdatingItems((prev) => prev.filter((itemId) => itemId !== id))
      );
  };

  const deleteCartItem = (id: number) => {
    setLoadingItems((prev) => [...prev, id]);
    GlobalApi.deleteCartItem(id)
      .then(() => {
        setCart((prevCart: any[]) => prevCart.filter((item) => item.id !== id));
      })
      .finally(() =>
        setLoadingItems((prev) => prev.filter((itemId) => itemId !== id))
      );
  };

  const getCartItem = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GlobalApi.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
        (resp: { data: { data: any[] } }) => {
          const result = resp.data.data;
          const sortedCart = result
            .map((prd) => ({
              id: prd.id,
              product: prd.attributes.products.data[0],
              quantity: prd.attributes.quantity || 1,
              price:
                prd.attributes.price ||
                prd.attributes.products.data[0].attributes.pricing,
            }))
            .sort((a, b) => a.id - b.id); // Sort by id to maintain consistent order
          setCart(sortedCart);
          setIsLoading(false); // Set loading to false after fetching
        }
      );
    }
  };

  useEffect(() => {
    getCartItem();
  }, [user]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <Skeleton height={40} width="100%" mb="xl" />
        <Skeleton height={20} width="60%" mb="md" />
        <Skeleton height={20} width="80%" mb="md" />
        <Skeleton height={20} width="70%" mb="md" />
        <Skeleton height={20} width="90%" mb="md" />
        <Skeleton height={20} width="50%" />
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8'>
        <div className='mx-auto max-w-3xl'>
          <header className='text-center'>
            <h1 className='text-[38px] font-bold text-[#373737] sm:text-3xl'>
              Your Cart
            </h1>
          </header>
          <div className='mt-8'>
            <ul className='space-y-4'>
              {cart.map((item: any) => (
                <li key={item.id} className='flex items-center gap-4'>
                  {loadingItems.includes(item.id) ? (
                    <Skeleton height={64} width={64} radius='md' />
                  ) : (
                    <img
                      src={
                        item.product?.attributes?.banner?.data.attributes.url ||
                        ''
                      }
                      alt=''
                      className='size-16 rounded object-cover'
                    />
                  )}
                  <div className='flex-grow'>
                    <Skeleton visible={loadingItems.includes(item.id)}>
                      <h3 className='text-sm text-gray-900'>
                        {item.product?.attributes?.title} {item.id}
                      </h3>
                    </Skeleton>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      color='red'
                      size='xs'
                      onClick={() => deleteCartItem(item.id)}
                      disabled={
                        loadingItems.includes(item.id) ||
                        updatingItems.includes(item.id)
                      }
                    >
                      <IconTrash size={24} />
                    </Button>
                    <div className='flex items-center gap-1'>
                      <Button
                        size='xs'
                        onClick={() =>
                          updateCartItem(item.id, item.quantity - 1)
                        }
                        disabled={
                          item.quantity <= 1 || updatingItems.includes(item.id)
                        }
                      >
                        <IconMinus size={16} />
                      </Button>
                      <Box style={{ width: '30px', textAlign: 'center' }}>
                        <Skeleton visible={updatingItems.includes(item.id)}>
                          {item.quantity}
                        </Skeleton>
                      </Box>
                      {item.quantity >=
                      item.product.attributes.stock_quantity ? (
                        <Tooltip label='Out of stock' withArrow>
                          <Button size='xs' disabled>
                            <IconPlus size={16} />
                          </Button>
                        </Tooltip>
                      ) : (
                        <Button
                          size='xs'
                          onClick={() =>
                            updateCartItem(item.id, item.quantity + 1)
                          }
                          disabled={updatingItems.includes(item.id)}
                        >
                          <IconPlus size={16} />
                        </Button>
                      )}
                    </div>
                    <Box style={{ width: '80px', textAlign: 'right' }}>
                      <Skeleton visible={updatingItems.includes(item.id)}>
                        <dt className='inline'>₹ {item.price}</dt>
                      </Skeleton>
                    </Box>
                  </div>
                </li>
              ))}
            </ul>
            <div className='mt-8 flex justify-end border-t border-gray-100 pt-8'>
              <div className='w-screen max-w-lg space-y-4'>
                <dl className='space-y-0.5 text-sm text-gray-700'>
                  <div className='flex justify-between !text-base font-medium'>
                    <dt>Total</dt>
                    <dd>₹ {getTotalAmount()}</dd>
                  </div>
                </dl>
                <div className='flex justify-end mt-[24px]'>
                  <Link href='/checkout'>
                    <Button fullWidth color='yellow'>
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;