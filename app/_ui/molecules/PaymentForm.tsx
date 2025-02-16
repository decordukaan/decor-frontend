import { Box, Button, Select, Skeleton, Text, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import { useState, useEffect } from 'react';

interface PaymentFormProps {
  paymentDetails: {
    payment_method: string;
    transaction_id: string;
    status: string;
  };
  email: string; // Email prop
  onChange: (
    field: keyof PaymentFormProps['paymentDetails'],
    value: string
  ) => void;
  onSubmit: (payload: {
    email: string;
    paymentDetails: PaymentFormProps['paymentDetails'];
  }) => Promise<void>; // onSubmit returns a Promise
  loading?: boolean; // Loading state
  setLoading: (value: boolean) => void; // Function to update loading state
  baseAmount: number; // Base amount prop
}

const PaymentForm = ({
  paymentDetails,
  email,
  onChange,
  onSubmit,
  loading,
  setLoading,
  baseAmount,
}: PaymentFormProps) => {
  // Ensure payment method has a default value
  const [paymentMethod, setPaymentMethod] = useState(
    paymentDetails.payment_method || 'razor_pay'
  );
  const [totalAmount, setTotalAmount] = useState(baseAmount);

  // Effect to set default payment method if none exists
  useEffect(() => {
    if (!paymentDetails.payment_method) {
      onChange('payment_method', 'razor_pay');
    }
  }, []);

  // Update total amount based on selected payment method
  useEffect(() => {
    if (paymentDetails.payment_method === 'cod') {
      setTotalAmount(baseAmount + 100);
    } else {
      setTotalAmount(baseAmount);
    }
  }, [paymentDetails.payment_method, baseAmount]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log('Processing payment:', paymentDetails.payment_method);

      await onSubmit({ email, paymentDetails });

      console.log('Payment successful');
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Skeleton height={500} width='100%' radius='md' />
      ) : (
        <>
          <Text>Payement Details: {paymentDetails.payment_method}</Text>
          {/* Payment Method Selection */}
          <Select
            label='Payment Method'
            defaultValue={'razor_pay'} // Directly use state value
            onChange={(value) => {
              console.log('Updated Payment Method:', value);
              if (value) {
                onChange('payment_method', value);
              }
            }}
            allowDeselect={false} // Prevents clearing selection
            clearable={false} // Hides clear button
            data={[
              { value: 'razor_pay', label: 'UPI/Card/Net Banking' },
              { value: 'cod', label: 'Pay on Delivery' },
            ]}
            defaultChecked
          />
          {/* Display extra charge for COD */}
          {paymentDetails.payment_method === 'cod' ? (
            <Box
              mt='sm'
              p='md'
              style={{
                borderRadius: '8px',
                backgroundColor: '#fff5f5',
              }}
            >
              <Text>Payment method:{paymentDetails.payment_method}</Text>
              <Text color='yellow' fw={600} display='flex' >
                Cash On Delivery Charge: ₹100
                <Tooltip
                  label='₹100 extra will be charged for Cash on Delivery.'
                  withArrow
                >
                  <IconInfoCircle
                    size={16}
                    style={{ marginLeft: 6, cursor: 'pointer' }}
                  />
                </Tooltip>
              </Text>
              <Text>Subtotal: ₹{totalAmount - 100}</Text>
              <Text fw={700}>Total Payable: ₹{totalAmount}</Text>
            </Box>
          ) : (
            <Text mt='sm' fw={600}>
              Total Amount: ₹{totalAmount}
            </Text>
          )}

          {/* Submit Button */}
          <Button
            fullWidth
            type='button'
            color='yellow'
            mt={38}
            onClick={handleSubmit}
            loading={loading} // Add loading state
            disabled={!paymentDetails.payment_method} // Disable button if no payment method selected
          >
            {paymentDetails.payment_method == 'cod'
              ? 'Confirm Order'
              : 'Pay Now'}
          </Button>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
