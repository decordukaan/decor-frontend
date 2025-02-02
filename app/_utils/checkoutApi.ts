import GlobalApi from './GlobalApi';

export const submitOrder = async (user: any, contactInfo: any, shippingDetails: any, paymentDetails: any, email: string) => {
  if (!user) {
    throw new Error('User is not signed in');
  }

  const contactResponse = await GlobalApi.addContactInformation(contactInfo);
  const shippingResponse = await GlobalApi.addShippingDetails({ ...shippingDetails, email });
  const paymentResponse = await GlobalApi.addPaymentDetails({ ...paymentDetails, email });

  return {
    contactData: contactResponse.data,
    shippingData: shippingResponse.data,
    paymentData: paymentResponse.data,
  };
};