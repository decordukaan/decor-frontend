import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface ContactInformationFormProps {
  contactInfo: {
    userName: string;
    email: string;
    phone: string;
  };
  onChange: (
    field: keyof ContactInformationFormProps['contactInfo'],
    value: string
  ) => void;
  onNext: (processedContactInfo: {
    userName: string;
    email: string;
    phone: string;
  }) => void;
}

const ContactInformationForm = ({
  contactInfo,
  onChange,
  onNext,
}: ContactInformationFormProps) => {
  const form = useForm({
    initialValues: contactInfo,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) =>
        /^(?:0*|\+91)?[6-9]\d{9}$/.test(value) ? null : 'Invalid phone number',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {
        // Process phone number to remove leading zeros and +91
        const processedPhone = form.values.phone.replace(/^0*|\+91/, '');
        const processedContactInfo = {
          ...form.values,
          phone: processedPhone,
        };
        onNext(processedContactInfo);
      })}
      className='space-y-4 mt-6'
    >
      <TextInput
        label='Full Name'
        placeholder='Enter your full name'
        required
        value={form.values.userName}
        onChange={(e) => {
          form.setFieldValue('userName', e.target.value);
          onChange('userName', e.target.value);
        }}
        error={form.errors.userName}
      />
      <TextInput
        label='Email'
        placeholder='Enter your email'
        required
        value={form.values.email}
        onChange={(e) => {
          form.setFieldValue('email', e.target.value);
          onChange('email', e.target.value);
        }}
        error={form.errors.email}
      />
      <TextInput
        label='Phone Number'
        placeholder='Enter your phone number'
        required
        value={form.values.phone}
        onChange={(e) => {
          form.setFieldValue('phone', e.target.value);
          onChange('phone', e.target.value);
        }}
        error={form.errors.phone}
      />
      <Button fullWidth type='submit' color='yellow' mt={38}>
        Next
      </Button>
    </form>
  );
};

export default ContactInformationForm;
