'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Container, Skeleton } from '@mantine/core';

// Dynamically import the OrderConfirmation component
const DynamicOrderConfirmation = dynamic(
  () => import('../_components/OrderConfirmation'),
  {
    ssr: false,
    loading: () => (
      <Container size='sm'>
        <Skeleton height={50} mt={30} width='70%' />
        <Skeleton height={20} mt={20} width='90%' />
        <Skeleton height={20} mt={10} width='80%' />
        <Skeleton height={40} mt={20} width='50%' />
      </Container>
    ),
  }
);

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicOrderConfirmation />
    </Suspense>
  );
}
