import GlobalApi from './GlobalApi';
import { PaymentDetails } from './../types/checkout'; // Adjust the import path as needed
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
 });

export const submitOrder = async (
  email: string,
  paymentDetails: PaymentDetails,
  cartItems: any[],
  totalPrice: number
) => {
  try {
    // Fetch contact information
    const contactInfoResponse = await GlobalApi.getContactInformationByEmail(email);
    const contactInformation = contactInfoResponse?.data?.[0]?.id || null;

    // Fetch shipping details
    const shippingDetailsResponse = await GlobalApi.getShippingDetailsByEmail(email);
    const shippingDetail = shippingDetailsResponse?.data?.[0]?.id || null;

    console.log('payment method:', paymentDetails.payment_method);

    // Update payment details before creating the order
    let paymentCreateResponse;
    try {
      paymentCreateResponse = await GlobalApi.createPaymentDetails(email, paymentDetails);
      console.log('this is payment update detail :)))))',paymentCreateResponse)
    } catch (paymentError) {
      console.error('Error updating payment details:', paymentError);
      throw paymentError; // Throw the error to stop the order process if payment details update fails
    }

    // Check if payment update was successful
    if (paymentCreateResponse.status === 200) {
      // Create the order asynchronously
      const createOrderAsync = async () => {
        const orderData = {
          contact_information: contactInformation,
          shipping_detail: shippingDetail,
          order_items_list: cartItems.map(item => ({
            product: item.product.id,
            quantity: item.quantity,
            price: item.price,
          })),
          total_price: totalPrice,
          payment_step: paymentCreateResponse.data.data.id,
          status: 'pending',
          email:email,
          order_status:"unfulfilled"
        };

        console.log('Order data:', orderData);

        const orderResponse = await GlobalApi.createOrder(orderData);
        console.log('Order created successfully:', orderResponse);

        // Check if the order creation was successful (status 200)
        if (orderResponse.status === 200) {
          // Clear the user's cart only if the order was created successfully
          await GlobalApi.clearUserCart(email);
          console.log('User cart cleared successfully');
        } else {
          console.warn('Order creation response was not 200. Cart not cleared.');
        }

        return orderResponse;
      };

      // Start the asynchronous order creation process
      createOrderAsync().catch(error => {
        console.error('Error in asynchronous order creation:', error);
        // Handle the error as needed (e.g., notify the user, retry, etc.)
      });

      // Return immediately after starting the asynchronous process
      return { message: 'Order processing started' };
    } else {
      console.error('Payment update failed. Order not created.');
      throw new Error('Payment update failed');
    }

  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

export const orderCreate = async (
  amount: string,
  currency: string,
) => {
  try {

    var options = {
      amount: amount,
      currency: currency,
      receipt: 'rcp1',
     };
     const order = await razorpay.orders.create(options);
     return order;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};


