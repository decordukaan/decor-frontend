'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Container, Title, Text, Stack, Skeleton } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { OrderDetails } from '../types/order';

const OrderConfirmation = ({ params }:any) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isValidOrder, setIsValidOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const validateOrder = async () => {
      if (!isLoaded || !user) {
        router.push('/');
        return;
      }

      const orderId = params;
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        const result = await GlobalApi.validateOrderById(orderId);
        console.log('Order validation result:', result);

        if (result.isValid && result.orderDetails) {
          setIsValidOrder(true);
          setOrderDetails(result.orderDetails);
        } else {
          setTimeout(() => {
            router.push('/');
          }, 10000);
        }
      } catch (error) {
        console.error('Error validating order::', error);
        setTimeout(() => {
          router.push('/');
        }, 10000);
      } finally {
        setIsLoading(false);
      }
    };

    validateOrder();
  }, [isLoaded, user, router, params]);

  return (
    <Container size="sm">
      {isLoading ? (
        <Skeleton height={300} width="100%" radius="md" />
      ) : (
        <Stack align="center" my="xl">
          <IconCheck size={64} color="green" />
          <Title order={1}>Order Confirmed!</Title>
          <Text>
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </Text>
          {orderDetails && (
            <Text>
              Order Total: ₹{orderDetails.totalPrice}
            </Text>
          )}
          <Button onClick={() => router.push('/')} size="lg">
            Continue Shopping
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default OrderConfirmation;