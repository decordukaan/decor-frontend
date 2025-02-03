'use client';

import { Accordion, Button, Select, Stepper } from '@mantine/core';
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

const Checkout = () => {
  const { user, isSignedIn } = useUser();
  const { cart } = useCart(); // Add this line to use the useCart hook
  const router = useRouter(); // Initialize router

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
    email:'string'
  };
  const initialPaymentDetails = {
    payment_method: '',
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
      const email = user?.emailAddresses[0].emailAddress || ''; // Ensure email is a string
      const { contactData, shippingData, paymentData } = await submitOrder(
        user,
        contactInfo,
        shippingDetails,
        paymentDetails,
        email
      );
      console.log('API Responses:', contactData, shippingData, paymentData);
      alert('Order Placed Successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce(
    (
      total: number,
      item: { product: { attributes: { pricing: any } }; quantity: number }
    ) => {
      return total + (item.product?.attributes?.pricing || 0) * item.quantity;
    },
    0
  );

  // Redirect user to home if cart is empty or user not signed in
  useEffect(() => {
    if (!isSignedIn || cart.length === 0 || totalPrice === 0) {
      router.push('/'); // Redirect to home page
    }
  }, [isSignedIn, cart, totalPrice, router]);

  return (
    <>
      {isSignedIn && cart.length > 0 && totalPrice > 0 && (
        <div className='max-w-3xl mx-auto pt-8 pb-16'>
          <h1 className='text-[38px] font-bold text-center'>
            Checkout Total: ₹{totalPrice.toFixed(2)}{' '}
          </h1>
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
                    handleContactChange(key as keyof typeof contactInfo, value);
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
                  Object.entries(newShippinDetailInfo).forEach(([key, value]) => {
                    handleShippingChange(key as keyof typeof shippingDetails, value as string)
                  });
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
              />
            </Stepper.Step>

            {/* Step Completed */}
            <Stepper.Completed>
              Order has been placed successfully! Thank you for shopping with
              us.
            </Stepper.Completed>
          </Stepper>
        </div>
      )}
    </>
  );
};

export default Checkout;
