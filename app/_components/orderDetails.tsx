'use client';

import { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import CartTable from './CartTable';
import { Accordion, Paper, Stepper, Skeleton, Button } from '@mantine/core';
import MainPagination from './MainPagination';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';

const orderStatusSteps = [
  {
    statuses: ['cancelled', 'refunded', 'abandoned'],
    label: 'Order Cancelled',
  },
  {
    statuses: ['unfulfilled', 'pending', 'authorized'],
    label: 'Order in Progress',
  },
  { statuses: ['partially_fulfilled'], label: 'Order Processed' },
  { statuses: ['fulfilled'], label: 'Order Delivered' },
];

const getStatusStep = (status: string) => {
  const stepIndex = orderStatusSteps.findIndex((step) =>
    step.statuses.includes(status)
  );
  return stepIndex;
};

const isCancelled = (status: string) =>
  orderStatusSteps[0].statuses.includes(status);

const OrderDetails = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)'); // Adjust breakpoint for tablets

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const fetchOrders = async (page: number) => {
      setLoading(true);

      try {
        const response = await GlobalApi.getUserOrderItems(
          user?.primaryEmailAddress?.emailAddress || '',
          page
        );

        console.log(response.data.data, 'Fetched Orders');
        setOrders(response.data.data);
        setTotalPages(response.data.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(currentPage);
  }, [user, currentPage]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <section>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl'>
          {loading ? (
            <Skeleton height={200} radius='md' animate />
          ) : orders.length > 0 ? (
            <>
              <h1 className='text-[28px] sm:mb-[38px] mb-[24px] font-bold text-[#373737] sm:text-[38px]'>
                Your Order Details
              </h1>

              <Accordion
                styles={{ item: { border: 'none' } }}
                defaultValue={`order-${orders[0].id}`}
                variant='contained'
              >
                {orders.map((order) => {
                  const currentStatus = order.attributes.order_status;
                  const currentStep = getStatusStep(currentStatus);
                  const cancelled = isCancelled(currentStatus);

                  return (
                    <Paper
                      key={order.id}
                      shadow='xs'
                      radius='md'
                      p='md'
                      mt='md'
                    >
                      <Accordion.Item value={`order-${order.id}`}>
                        <Accordion.Control>
                          <h3>
                            Order ID: {order.id} | Total Price: ₹
                            {order.attributes.total_price}
                          </h3>
                        </Accordion.Control>
                        <Accordion.Panel>
                          {/* Responsive Mantine Stepper */}
                          <Stepper
                            title='Order Status'
                            orientation={
                              isMobileOrTablet ? 'horizontal' : 'vertical'
                            }
                            active={cancelled ? 0 : currentStep}
                            size='sm'
                            mt='md'
                          >
                            {cancelled ? (
                              <Stepper.Step
                                label='Order Cancelled'
                                completedIcon='❌'
                              />
                            ) : (
                              orderStatusSteps
                                .slice(1)
                                .map((step, index) => (
                                  <Stepper.Step
                                    key={index}
                                    label={step.label}
                                    completedIcon='✔'
                                  />
                                ))
                            )}
                          </Stepper>

                          {/* Order Items */}
                          <CartTable
                            cart={order.attributes.order_items_list.map(
                              (item: any) => ({
                                product: {
                                  attributes: {
                                    title: item.product.data.attributes.title,
                                    pricing:
                                      item.product.data.attributes.pricing,
                                    banner: {
                                      data: {
                                        attributes: {
                                          url:
                                            item.product.data.attributes.banner
                                              ?.data?.attributes?.url || '',
                                        },
                                      },
                                    },
                                  },
                                },
                                quantity: item.quantity,
                              })
                            )}
                            paymentMethod={
                              order.attributes.payment_step.data.attributes
                                .payment_method
                            }
                            orderPrice={order.attributes.total_price}
                          />
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Paper>
                  );
                })}
              </Accordion>
              <div className='mt-[38px] flex justify-center'>
                <MainPagination
                  total={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-[70vh]'>
              <p className='font-bold text-[#373737] sm:text-[38px] text-[32px]'>
                No orders found
              </p>
              <Link className='mt-[24px]' href='/'>
                <Button size='lg'>Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
