'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Container, Title, Text, Stack, Skeleton } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { OrderDetails } from '../types/order';

const OrderConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isValidOrder, setIsValidOrder] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateOrder = async () => {
      try {
        setLoading(true);
        const orderId = searchParams.get('orderId');
        console.log('Order ID from search params:', orderId);

        if (!orderId) {
          throw new Error('Order ID is missing from the URL');
        }

        if (!user?.primaryEmailAddress?.emailAddress) {
          throw new Error('User email not available');
        }

        console.log('Validating order with ID:', orderId);
        const result = await GlobalApi.validateOrderById(orderId);
        console.log('Order validation result:', result);

        if (result.isValid && result.orderDetails) {
          if (
            result.orderDetails.email === user.primaryEmailAddress.emailAddress
          ) {
            setIsValidOrder(true);
            setOrderDetails(result.orderDetails);
          } else {
            throw new Error('Order does not belong to the current user');
          }
        } else {
          setIsValidOrder(false);
          setError('Invalid order');
        }
      } catch (err) {
        console.error('Error validating order:', err);
        setIsValidOrder(false);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (isUserLoaded && user) {
      validateOrder();
    } else if (isUserLoaded && !user) {
      router.push('/');
    }
  }, [isUserLoaded, user, searchParams, router]);

  if (loading) {
    return (
      <Container size='sm'>
        <Skeleton height={50} mt={30} width='70%' />
        <Skeleton height={20} mt={20} width='90%' />
        <Skeleton height={20} mt={10} width='80%' />
        <Skeleton height={40} mt={20} width='50%' />
      </Container>
    );
  }

  if (error || !isValidOrder) {
    router.push('/');
    return null;
  }

  return (
    <Container size='sm'>
      <Stack align='center' my={50}>
        <IconCheck size={50} color='green' />
        <Title order={2}>Order Confirmed!</Title>
        <Text>Thank you for your purchase.</Text>
        {orderDetails && (
          <>
            <Text>Order ID: {orderDetails.orderId}</Text>
            <Text>
              Total Amount: ₹
              {typeof orderDetails.totalPrice === 'number'
                ? orderDetails.totalPrice.toFixed(2)
                : orderDetails.totalPrice}
            </Text>
          </>
        )}
        <Button onClick={() => router.push('/')} mt={20}>
          Continue Shopping
        </Button>
      </Stack>
    </Container>
  );
};

export default OrderConfirmation;
