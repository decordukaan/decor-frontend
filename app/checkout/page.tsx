'use client';

import { Accordion, Button, Select, Skeleton, Stepper } from '@mantine/core';
import { useUser } from '@clerk/nextjs';
import ConfirmCart from '../_components/ConfirmCart';
import { useFormState } from '../_hooks/useFormState';

import { useEffect, useState } from 'react';
import { submitOrder } from '../_utils/checkoutApi';
import ContactInformationForm from '../_ui/molecules/ContactInformationForm';
import ShippingDetailsForm from '../_ui/molecules/ShippingDetailsForm';
import PaymentForm from '../_ui/molecules/PaymentForm';
import { useCart } from '../_hooks/useCart';
import CartTable from '../_components/CartTable';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import OrderDetails from '../_components/orderDetails';

const Checkout = () => {
  const { user, isSignedIn } = useUser();
  const { cart, clearCart, setCart } = useCart(); // Add this line to use the useCart hook
  const router = useRouter(); // Initialize router
  const { totalPrice,codCharge } = useCart();

  const initialContactInfo = {
    userName: '',
    email: '',
    phone: '',
  };
  const initialShippingDetails = {
    address_line1: '',
    address_line2: '',
    city: '',
    state: 'Kerala',
    postal_code: '',
    country: 'India',
    email: 'string',
  };
  const initialPaymentDetails = {
    payment_method: 'razor_pay',
    transaction_id: '',
    status: 'Pending',
  };

  const [contactInfo, handleContactChange] = useFormState(initialContactInfo);
  const [shippingDetails, handleShippingChange] = useFormState(
    initialShippingDetails
  );
  const [paymentDetails, handlePaymentChange] = useFormState(
    initialPaymentDetails
  );
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const email = user?.emailAddresses[0].emailAddress || '';

      if (paymentDetails.payment_method === 'cod') {
        // Handle Cash on Delivery logic here
        console.log('Processing Cash on Delivery');

        const orderData = await submitOrder(
          email,
          paymentDetails,
          cart,
          totalPrice+codCharge
        );

        console.log('Order submitted successfully:', orderData);

        notifications.show({
          title: 'Order Placed Successfully',
          message: 'Thank you for your purchase!',
          color: 'green',
          icon: <IconCheck size='1.1rem' />,
          autoClose: 5000,
        });

        // Clear the cart and redirect to a confirmation page
        setCart([]);
        router.push('/order-confirmation');
        return;
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
      if (!razorpayKey) {
        throw new Error('Razorpay key is not defined');
      }

      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice * 100, // Amount in paise
          currency: 'INR',
          phone: contactInfo.phone, // Include the phone number
          userName: contactInfo.userName, // Include the user name
        }),
      });

      const orderData = await response.json();
      console.log(orderData, 'orderData');

      const options = {
        key: process.env.key_id,
        amount: parseFloat(totalPrice) * 100,
        currency: 'INR',
        name: 'Reforms Marketing Solutions',
        description: 'description',
        order_id: orderData.id,
        handler: async function (response: any) {
          console.log(response, 'response');
          const data = {
            orderCreationId: orderData.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          paymentDetails.transaction_id = response.razorpay_payment_id;
          setLoading(true);
          const result = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          });
          const res = await result.json();
          if (res.isOk) {
            paymentDetails.status = 'Completed';
            const orderData = await submitOrder(
              email,
              paymentDetails,
              cart,
              totalPrice
            );

            console.log('Order submitted successfully:', orderData);

            notifications.show({
              title: 'Order Placed Successfully',
              message: 'Thank you for your purchase!',
              color: 'green',
              icon: <IconCheck size='1.1rem' />,
              autoClose: 10000,
            });

            // Clear the cart and redirect to a confirmation page
            setCart([]);
            router.push('/order-confirmation');
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: contactInfo.userName,
          email: contactInfo.email,
        },
        theme: {
          color: '#3399cc',
        },
      };
      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.on('payment.failed', function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error submitting order:', error);
      notifications.show({
        title: 'Order Placement Failed',
        message: 'There was an error placing your order. Please try again.',
        color: 'red',
        icon: <IconX size='1.1rem' />,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Redirect user to home if cart is empty or user not signed in
  useEffect(() => {
    if (!isSignedIn || cart.length === 0 || totalPrice === 0) {
      // router.push('/'); // Redirect to home page
    }
  }, [isSignedIn, cart, totalPrice, router]);

  return (
    <>
      {loading ? (
        <Skeleton height={500} width='100%' radius='md' />
      ) : (
        isSignedIn &&
        cart.length > 0 &&
        totalPrice > 0 && (
          <div className='max-w-3xl mx-auto py-[72px]'>
            <Accordion
              styles={{
                control: {
                  background: '#f1f3f5',
                  borderRadius: '4px',
                  cursor: 'pointer',
                },
              }}
              defaultValue='checkout'
            >
              {/* Order Summary Section */}
              <Accordion.Item value='order-summary'>
                <Accordion.Control>Order Summary</Accordion.Control>
                <Accordion.Panel>
                  <CartTable cart={cart} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <Stepper
              mt={48}
              active={activeStep}
              onStepClick={setActiveStep}
              allowNextStepsSelect={false}
            >
              {/* Step 1: Contact Information */}
              <Stepper.Step color='yellow' label='Contact Information'>
                <ContactInformationForm
                  contactInfo={contactInfo}
                  onChange={(newContactInfo) => {
                    Object.entries(newContactInfo).forEach(([key, value]) => {
                      handleContactChange(
                        key as keyof typeof contactInfo,
                        value
                      );
                    });
                  }}
                  onNext={() => setActiveStep(1)}
                />
              </Stepper.Step>

              {/* Step 2: Shipping Details */}
              <Stepper.Step color='yellow' label='Shipping Details'>
                <ShippingDetailsForm
                  shippingDetails={shippingDetails}
                  onChange={(newShippinDetailInfo) => {
                    Object.entries(newShippinDetailInfo).forEach(
                      ([key, value]) => {
                        handleShippingChange(
                          key as keyof typeof shippingDetails,
                          value as string
                        );
                      }
                    );
                  }}
                  onNext={() => setActiveStep(2)}
                />
              </Stepper.Step>

              {/* Step 3: Payment */}
              <Stepper.Step color='yellow' label='Payment'>
                <PaymentForm
                  paymentDetails={paymentDetails}
                  email={user.emailAddresses[0].emailAddress}
                  onChange={handlePaymentChange}
                  onSubmit={handleSubmit}
                  loading={loading}
                  setLoading={setLoading}
                  baseAmount={totalPrice}
                />
              </Stepper.Step>

              {/* Step Completed */}
              <Stepper.Completed>
                Order has been placed successfully! Thank you for shopping with
                us.
              </Stepper.Completed>
            </Stepper>
          </div>
        )
      )}
    </>
  );
};

export default Checkout;
