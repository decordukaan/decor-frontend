'use client';

import React from 'react';
import { Tabs } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import ContactInformationForm from '../_ui/molecules/ContactInformationForm';
import ShippingDetailsForm from '../_ui/molecules/ShippingDetailsForm';


const Profile = () => {
  const handleContactInfoSubmit = (values: any) => {
    console.log('Contact info submitted:', values);
    notifications.show({
      title: 'Contact Information Updated',
      message: 'Your contact information has been successfully updated.',
      color: 'green',
    });
  };

  const handleShippingDetailsSubmit = (values: any) => {
    console.log('Shipping details submitted:', values);
    notifications.show({
      title: 'Shipping Details Updated',
      message: 'Your shipping details have been successfully updated.',
      color: 'green',
    });
  };

  return (
    <div className='sm:container sm:mx-auto mx-[20px] mt-12 mb-16'>
      <h1 className='sm:text-[38px] text-[28px] font-bold mb-6'>Profile</h1>
      <div >
        <Tabs defaultValue='contact'>
          <Tabs.List>
            <Tabs.Tab value='contact'>Contact Information</Tabs.Tab>
            <Tabs.Tab value='shipping'>Shipping Details</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='contact' pt='xs'>
            <div>
              <ContactInformationForm
                contactInfo={{
                  userName: '',
                  email: '',
                  phone: '',
                }}
                onChange={(info) => console.log('Contact info changed:', info)}
                onNext={handleContactInfoSubmit}
                profile={true}
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value='shipping' pt='xs'>
            <div>
              <ShippingDetailsForm
                shippingDetails={{
                  address_line1: '',
                  address_line2: '',
                  city: '',
                  state: '',
                  postal_code: '',
                  country: '',
                  email: '',
                }}
                onNext={handleShippingDetailsSubmit}
                profile={true}
                onChange={(info) => console.log('Contact info changed:', info)}
              />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
