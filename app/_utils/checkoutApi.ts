import GlobalApi from './GlobalApi';
import { PaymentDetails } from './../types/checkout'; // Adjust the import path as needed

export const submitOrder = async (
  email: string,
  paymentDetails: PaymentDetails,
  cartItems: any[]
) => {
  try {
    // Fetch contact information
    const contactInfoResponse = await GlobalApi.getContactInformationByEmail(email);
    const contactInformation = contactInfoResponse?.data?.[0]?.id || null;

    // Fetch shipping details
    const shippingDetailsResponse = await GlobalApi.getShippingDetailsByEmail(email);
    const shippingDetail = shippingDetailsResponse?.data?.[0]?.id || null;

    console.log('this is cart items ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',cartItems)

    // Create the order
    const orderData = {
      contact_information: contactInformation,
      shipping_detail: shippingDetail,
      orderItemList: cartItems.map(item => ({
        product: item.product.id, // Ensure this matches the Strapi component field
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      payment_step: {
        payment_method: paymentDetails.payment_method,
        transaction_id: paymentDetails.transaction_id,
        status: paymentDetails.status,
      },
      status: 'pending',
    };

    console.log('Order created::::::::', orderData);

    const orderResponse = await GlobalApi.createOrder(orderData);

    // Update payment details after creating the order
    try {
      await GlobalApi.createOrUpdatePaymentDetails(email, paymentDetails);
    } catch (paymentError) {
      console.error('Error updating payment details:', paymentError);
    }

    // Clear the user's cart after successful order creation
    await GlobalApi.clearUserCart(email);

    return orderResponse;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};