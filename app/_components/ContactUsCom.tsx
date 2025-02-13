'use client';

import { useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';

function ContactUsCom() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  // Regex Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number validation

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validation
    if (id === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? '' : 'Invalid email format',
      }));
    }
    if (id === 'phone') {
      setErrors((prev) => ({
        ...prev,
        phone: phoneRegex.test(value)
          ? ''
          : 'Enter a valid 10-digit phone number',
      }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert('All fields are required!');
      return;
    }

    if (errors.email || errors.phone) {
      alert('Please fix the errors before submitting!');
      return;
    }

    try {
      await GlobalApi.addContactForm(formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
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
      <section className='sm:py-16 px-[20px] py-[52px] md:px-20 grid grid-cols-1 md:grid-cols-3 sm:gap-12 gap-[24px]'>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>Email Us</h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>support@decordukaan.com</p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>Call Us</h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>+91 98765 43210</p>
        </div>
        <div className='bg-yellow-600 bg-opacity-10 shadow-lg rounded-lg sm:p-6 p-3 text-center'>
          <h2 className='sm:text-xl text-[18px] font-semibold sm:mb-4 mb-2'>Visit Us</h2>
          <p className='text-gray-600 sm:text-[18px] text-[16px]'>123 Decor Street, Home City, HC 56789</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className='sm:pt-16 pt-[52px] sm:pb-20 bg-yellow-700 bg-opacity-20 '>
        <div className='container mx-auto '>
          <h2 className='sm:text-[38px] text-[28px] font-semibold text-center'>
            Send Us a Message
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:mt-[42px] mt-[38px] sm:mx-0 mx-[20px]'>
            <div className='bg-white shadow-lg rounded-lg sm:p-8 p-6'>
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-3'>
                  <div>
                    <label className='block text-gray-700 mb-2' htmlFor='name'>
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='w-full border border-gray-300 rounded-lg sm:p-3 p-2'
                      placeholder='Enter your name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 mb-2' htmlFor='email'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='w-full border border-gray-300 rounded-lg sm:p-3 p-2'
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className='text-red-500 text-sm'>{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className='block text-gray-700 mb-2' htmlFor='phone'>
                    Phone Number
                  </label>
                  <input
                    type='text'
                    id='phone'
                    className='w-full border border-gray-300 rounded-lg sm:p-3 p-2'
                    placeholder='Enter your phone number'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && (
                    <p className='text-red-500 text-sm'>{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className='block text-gray-700 mb-2' htmlFor='message'>
                    Your Message
                  </label>
                  <textarea
                    id='message'
                    className='w-full border border-gray-300 rounded-lg sm:p-3 p-2'
                    rows={5}
                    placeholder='Write your message here'
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className='text-center'>
                  <button
                    type='submit'
                    className='sm:px-8 sm:py-3 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg'
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className='rounded-lg overflow-hidden shadow-lg'>
              <iframe
                title='Decor Dukaan Location'
                className='w-full h-full min-h-[400px]'
                src='https://www.google.com/maps/embed/v1/place?q=123+Decor+Street,+Home+City,+HC+56789&key=YOUR_GOOGLE_MAPS_API_KEY'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUsCom;
