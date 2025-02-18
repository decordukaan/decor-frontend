'use client';

import { useForm } from '@mantine/form';
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Grid,
  Paper,
  Title,
  Group,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';

function ContactUsCom() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validateInputOnChange: true, // Ensures validation runs on every input change
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Invalid email format',
      phone: (value) =>
        /^[6-9]\d{9}$/.test(value)
          ? null
          : 'Enter a valid 10-digit phone number',
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      await GlobalApi.addContactForm(values);
      alert('Message sent successfully!');
      form.reset();
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='bg-gray-50 text-gray-800 min-h-screen'>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/images/contact-us.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '100%',
        }}
        className='text-[#373737] flex flex-col justify-center items-center'
      >
        <h1 className='sm:text-[38px] text-[28px] text-center font-bold text-[#373737] sm:mx-0 mx-[20px]'>
          We'd Love to Hear from You!
        </h1>
        <p className='sm:text-[20px] text-[18px] leading-[24px] text-center font-medium mt-[24px] text-[#373737] sm:max-w-3xl sm:mx-auto mx-[20px]'>
          Reach out to us for any queries, feedback, or assistance. Our team is
          here to help you make your home truly special.
        </p>
      </section>

      {/* Contact Information */}
      <section className='sm:py-16 px-[20px] py-[52px] md:px-20 grid grid-cols-1 md:grid-cols-4 sm:gap-12 gap-[24px]'>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>
            Email Us
          </h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>
            info@decordukaan.com
          </p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>
            Call Us
          </h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>
            +91 9895560404
          </p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>
            Visit Us
          </h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>
            15/651 Moochikkal Tower, Moochikkal, Kerala - 676307
          </p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>
            Support Hours
          </h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>
            9:30 AM - 6:30 PM (Monday to Saturday)
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className='sm:pt-16 pt-[52px] sm:pb-20 bg-yellow-700 bg-opacity-20 '>
        <div className='container mx-auto '>
          <h2 className='sm:text-[38px] text-[28px] font-semibold text-center'>
            Send Us a Message
          </h2>
          <div className='sm:mt-[42px] mt-[38px] sm:mx-0 mx-[20px]'>
            <Grid gutter='xl'>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper shadow='sm' radius='md' p='lg'>
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                      label='Name'
                      placeholder='Enter your name'
                      {...form.getInputProps('name')}
                      required
                    />
                    <TextInput
                      mt='md'
                      label='Email'
                      placeholder='Enter your email'
                      {...form.getInputProps('email')}
                      required
                    />
                    <TextInput
                      mt='md'
                      label='Phone Number'
                      placeholder='Enter your phone number'
                      {...form.getInputProps('phone')}
                      required
                    />
                    <Textarea
                      mt='md'
                      label='Your Message'
                      placeholder='Write your message here'
                      {...form.getInputProps('message')}
                      required
                    />
                    <div className='flex justify-center  sm:mt-[24px] mt-[20px]'>
                      <Button type='submit' color='yellow'>
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Paper>
              </Grid.Col>

              {/* Map Section */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper shadow='sm' radius='md'>
                  <iframe
                    title='Decor Dukaan Location'
                    style={{
                      width: '100%',
                      minHeight: '420px',
                      border: 'none',
                    }}
                    src='https://www.google.com/maps/embed/v1/place?q=123+Decor+Street,+Home+City,+HC+56789&key=YOUR_GOOGLE_MAPS_API_KEY'
                    allowFullScreen
                  ></iframe>
                </Paper>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUsCom;
