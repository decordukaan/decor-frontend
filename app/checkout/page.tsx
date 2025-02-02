'use client';

import { Button, Select, Stepper } from '@mantine/core';
import { useUser } from '@clerk/nextjs';
import ConfirmCart from '../_components/ConfirmCart';
import { useFormState } from '../_hooks/useFormState';

import { useState } from 'react';
import { submitOrder } from '../_utils/checkoutApi';
import ContactInformationForm from '../_ui/molecules/ContactInformationForm';
import ShippingDetailsForm from '../_ui/molecules/ShippingDetailsForm';
import PaymentForm from '../_ui/molecules/PaymentForm';

const Checkout = () => {
  const { user, isSignedIn } = useUser();
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
  };
  const initialPaymentDetails = {
    payment_method: '',
    transaction_id: '',
    status: 'Pending',
  };

  const [contactInfo, handleContactChange] = useFormState(initialContactInfo);
  const [shippingDetails, handleShippingChange] = useFormState(initialShippingDetails);
  const [paymentDetails, handlePaymentChange] = useFormState(initialPaymentDetails);
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


  return (
    <>
      {user && isSignedIn && (
        <div className='max-w-3xl mx-auto pt-8 pb-16'>
          <h1 className='text-[38px] font-bold text-center'>Checkout</h1>

          <Stepper mt={48} active={activeStep} onStepClick={setActiveStep}>
            <Stepper.Step color='yellow' label='Contact Information'>
              <ContactInformationForm
                contactInfo={contactInfo}
                onChange={handleContactChange}
                onNext={() => setActiveStep(1)}
              />
            </Stepper.Step>

            <Stepper.Step color='yellow' label='Shipping Details'>
              <ShippingDetailsForm
                shippingDetails={shippingDetails}
                onChange={handleShippingChange}
                onNext={() => setActiveStep(2)}
              />
            </Stepper.Step>

            <Stepper.Step color='yellow' label='Payment'>
              <PaymentForm
                paymentDetails={paymentDetails}
                email={user.emailAddresses[0].emailAddress} // Pass the email here
                onChange={handlePaymentChange}
                onSubmit={handleSubmit}
              />
            </Stepper.Step>

            <Stepper.Completed>
              Order has been placed successfully! Thank you for shopping with us.
            </Stepper.Completed>
          </Stepper>
        </div>
      )}
    </>
  );
};

export default Checkout;