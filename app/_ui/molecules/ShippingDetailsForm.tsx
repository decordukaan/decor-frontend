import { TextInput, Button } from '@mantine/core';

interface ShippingDetailsFormProps {
  shippingDetails: {
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  onChange: (field: keyof ShippingDetailsFormProps['shippingDetails'], value: string) => void;
  onNext: () => void; // Ensure this matches the expected function signature
}

const ShippingDetailsForm = ({ shippingDetails, onChange, onNext }: ShippingDetailsFormProps) => {
  return (
    <div className='space-y-4 mt-6'>
      <TextInput
        label='Address Line 1'
        placeholder='Enter your address'
        required
        value={shippingDetails.address_line1}
        onChange={(e) => onChange('address_line1', e.target.value)}
      />
      <TextInput
        label='Address Line 2'
        placeholder='Enter your address'
        value={shippingDetails.address_line2}
        onChange={(e) => onChange('address_line2', e.target.value)}
      />
      <TextInput
        label='City'
        placeholder='Enter your city'
        required
        value={shippingDetails.city}
        onChange={(e) => onChange('city', e.target.value)}
      />
      <TextInput
        label='State'
        placeholder='Enter your state'
        required
        value={shippingDetails.state}
        onChange={(e) => onChange('state', e.target.value)}
      />
      <TextInput
        label='Postal Code'
        placeholder='Enter your postal code'
        required
        value={shippingDetails.postal_code}
        onChange={(e) => onChange('postal_code', e.target.value)}
      />
      <TextInput
        label='Country'
        placeholder='Enter your country'
        required
        value={shippingDetails.country}
        onChange={(e) => onChange('country', e.target.value)}
      />
      <Button
        fullWidth
        type='button'
        color='yellow'
        mt={38}
        onClick={onNext} // Call onNext directly if it doesn't require arguments
      >
        Next
      </Button>
    </div>
  );
};

export default ShippingDetailsForm;