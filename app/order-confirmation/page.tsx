'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Title, Text, Stack, Loader } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { OrderDetails, OrderValidationResult } from '../types/order';

const OrderConfirmation = () => {
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

      try {
        const email = user.emailAddresses[0].emailAddress;
        const result: OrderValidationResult = await GlobalApi.validateLastOrder(email);

        if (result.isValid && result.orderDetails) {
          setIsValidOrder(true);
          setOrderDetails(result.orderDetails);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error validating order:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    validateOrder();
  }, [isLoaded, user, router]);

  return (
    <Container size="sm">
      <Stack align="center"  my="xl">
        <IconCheck size={64} color="green" />
        <Title order={1}>Order Confirmed!</Title>
        <Text>
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </Text>
        <Text>
          You will receive an email confirmation shortly with your order details.
        </Text>
        {orderDetails && (
          <Text>
            Order Total: ${(orderDetails.totalPrice / 100).toFixed(2)}
          </Text>
        )}
        <Button onClick={() => router.push('/')} size="lg">
          Continue Shopping
        </Button>
      </Stack>
    </Container>
  );
};

export default OrderConfirmation;