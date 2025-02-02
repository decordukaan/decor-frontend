import { Button, Select, TextInput } from '@mantine/core';

interface PaymentFormProps {
  paymentDetails: {
    payment_method: string;
    transaction_id: string;
    status: string;
  };
  email: string; // Add email prop
  onChange: (
    field: keyof PaymentFormProps['paymentDetails'],
    value: string
  ) => void;
  onSubmit: (payload: { email: string; paymentDetails: PaymentFormProps['paymentDetails'] }) => void;
}

const PaymentForm = ({
  paymentDetails,
  email, // Destructure email prop
  onChange,
  onSubmit,
}: PaymentFormProps) => {
  return (
    <div>
      <Select
        label='Payment Method'
        placeholder='Select a payment method'
        value={paymentDetails.payment_method}
        onChange={(value) => onChange('payment_method', value || '')}
        data={[
          { value: 'Credit Card', label: 'Credit Card' },
          { value: 'Debit Card', label: 'Debit Card' },
          { value: 'UPI', label: 'UPI' },
        ]}
      />
      {/* Add other form fields for transaction_id and status if needed */}
      <Button
        fullWidth
        type='button'
        color='yellow'
        mt={38}
        onClick={() => onSubmit({ email, paymentDetails })}
      >
        Submit Payment
      </Button>
    </div>
  );
};

export default PaymentForm;