import {
  ContactInformation,
  PaymentDetails,
  ShippingDetails,
} from '../types/checkout';
import { OrderValidationResult } from '../types/order';

// import { ProductList } from '@/app/_components/ProductList';
const { default: axios } = require('axios');

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = 'http://localhost:1337/api';

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getAllProducts = (currentPage: number = 1, pageSize: number = 25) => {
  return axiosClient.get(
    `/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort=createdAt:desc&sort=updatedAt:desc`
  );
};


// get product by id
const getProductById = (id: number | string) =>
  axiosClient.get('/products/' + id + '?populate=*');

// get featured products
const getFeaturedProducts = () =>
  axiosClient.get('/products?filters[featured][$eq]=true&populate=*');

// get latest products
const getLatestProducts = (limit: number = 10) =>
  axiosClient.get(
    `/products?sort=createdAt:desc&pagination[limit]=${limit}&populate=*`
  );

// Add to cart collection
const addToCart = (data: {
  data: {
    userName: string | null;
    email: string | undefined;
    products: number | undefined;
    quantity: number | undefined;
    price: number | undefined;
  };
}) => axiosClient.post('/carts', data);

// Update cart item
const updateCartItem = (
  id: number,
  data: {
    data: {
      quantity?: number;
      price?: number;
    };
  }
) => axiosClient.put(`/carts/${id}`, data);

// get user cart items
const getUserCartItems = (email: string) =>
  axiosClient.get(
    '/carts?populate[products][populate][0]=banner&populate[products][populate][1]=id&filters[email][$eq]=' +
      email
  );

// delete item from cart
const deleteCartItem = (id: number) => axiosClient.delete('/carts/' + id);

// Clear user Cart
const clearUserCart = async (email: string) => {
  try {
    // First, get all cart items for the user
    const cartResponse = await getUserCartItems(email);
    const cartItems = cartResponse.data.data;

    // Delete each cart item
    const deletePromises = cartItems.map((item: any) =>
      deleteCartItem(item.id)
    );
    await Promise.all(deletePromises);

    return { success: true, message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error clearing user cart:', error);
    throw error;
  }
};

// getting category list
const getCategoryList = () => axiosClient.get('/product-categories?populate=*');

const getCategoryById = (categoryId: string) =>
  axiosClient.get(`/product-categories/${categoryId}?populate=*`);

// posting user delivery details
const addUserDeliveryDetails = (data: {
  userId: string | undefined;
  data: {
    firstName: string | null;
    lastName: string | null;
    state: string | undefined;
    district: string | undefined;
    pincode: string | undefined;
    address: string | undefined;
    phone: string | undefined;
  };
}) => axiosClient.post('/user-delivery-details', data);

// get user delivery details
const getUserDeliveryDetails = (userId: string) =>
  axiosClient.get(`/user-delivery-details?userId=${userId}`);

const updateUserDeliveryDetails = (
  userId: string | undefined,
  data: {
    data: {
      firstName: string | null;
      lastName: string | null;
      state: string | undefined;
      district: string | undefined;
      pincode: string | undefined;
      address: string | undefined;
      phone: string | undefined;
    };
  }
) => axiosClient.put(`/user-delivery-details/${userId}`, data);

const addToWishList = async (
  email: string,
  user: string,
  productId: number
) => {
  try {
    const response = await getWishListProductList(email);
    let wishList = response.data.data[0];

    if (!wishList) {
      // Create wishList if it doesn't exist
      const newWishList = await axiosClient.post('/wishlists', {
        data: {
          userName: user,
          email: email,
          products: [productId],
        },
      });
      return newWishList.data;
    } else {
      // Update existing wishList
      const updatedProducts = [
        ...wishList.attributes.products.data.map((p: any) => p.id),
        productId,
      ];
      const updatedWishList = await axiosClient.put(
        `/wishlists/${wishList.id}`,
        {
          data: { products: updatedProducts },
        }
      );
      return updatedWishList.data;
    }
  } catch (error) {
    console.error('Error adding to wishList:', error);
    throw error;
  }
};

const removeFromWishList = async (email: string, productId: number) => {
  try {
    const response = await getWishListProductList(email);
    let wishList = response.data.data[0];

    if (wishList) {
      const updatedProducts = wishList.attributes.products.data
        .filter((p: any) => p.id !== productId)
        .map((p: any) => p.id);

      const updatedWishList = await axiosClient.put(
        `/wishlists/${wishList.id}`,
        {
          data: { products: updatedProducts },
        }
      );
      return updatedWishList.data;
    }
  } catch (error) {
    console.error('Error removing from wishList:', error);
    throw error;
  }
};

// get wishList ProductList
const getWishListProductList = (email: string) =>
  axiosClient.get(
    `/wishlists?filters[email][$eq]=${email}&populate=products.banner`
  );

// To get products by category

const getProductsByCategory = async (categoryId: string, page = 1, pageSize = 25) => {
  try {
    const categoryRes = await getCategoryById(categoryId);
    if (!categoryRes.data || !categoryRes.data.data) {
      console.error(`Category with ID ${categoryId} not found`);
      return { data: [] };
    }

    return axiosClient.get(
      `/products?filters[product_category][id][$eq]=${categoryId}&populate=*` +
      `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` +
      `&sort=createdAt:desc,updatedAt:desc`
    );
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return { data: [] };
  }
};

const addContactInformation = async (data: ContactInformation) => {
  try {
    const response = await axiosClient.post('/contact-informations', {
      data,
    });
    return response;
  } catch (error) {
    console.error('Error adding contact information:', error);
    throw error;
  }
};

const addShippingDetails = async (
  data: ShippingDetails & { email: string }
) => {
  try {
    console.log('Adding new shipping details:', data);
    const response = await axiosClient.post('/shipping-details', { data });
    console.log('Add shipping details response:', response.data);
    return response;
  } catch (error) {
    console.error('Error adding shipping details:', error);
    throw error;
  }
};

const addPaymentDetails = async (data: PaymentDetails) => {
  try {
    const response = await axiosClient.post('/payment-steps', {
      data,
    });
    return response;
  } catch (error) {
    console.error('Error adding payment details:', error);
    throw error;
  }
};

// Get contact information by email
const getContactInformationByEmail = async (email: string) => {
  console.log('passed email to getContact information by email:', email);
  try {
    console.log(
      'Fetching:',
      `/contact-informations?filters[email][$eq]=${encodeURIComponent(email)}`
    );
    const response = await axiosClient.get(
      `/contact-informations?filters[email][$eq]=${encodeURIComponent(email)}`
    );
    console.log('API Response getContactInformationByEmail:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'API Error getContactInformationByEmail:',
      error.response?.data || error.message
    );
  }
};

// Get shipping details by email
const getShippingDetailsByEmail = async (email: string) => {
  try {
    console.log(`Fetching shipping details for email: ${email}`);
    const response = await axiosClient.get(
      `/shipping-details?filters[email][$eq]=${encodeURIComponent(
        email
      )}&populate=*`
    );
    console.log('Shipping details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping details:', error);
    throw error;
  }
};

// Get payment details by email
const getPaymentDetailsByEmail = async (email: string) => {
  try {
    const response = await axiosClient.get('/payment-steps', {
      params: {
        filters: {
          email: {
            $eq: email,
          },
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};

// Update contact information by email
// Update or create contact information by email
const updateContactInformationByEmail = async (
  email: string,
  data: ContactInformation
) => {
  try {
    console.log('Updating/Creating contact information for email:', email);
    console.log('New contact data:', data);

    const existingInfo = await getContactInformationByEmail(email);
    console.log('Existing contact information:', existingInfo);

    if (!existingInfo || !existingInfo.data || existingInfo.data.length === 0) {
      console.log('No existing contact information found, creating new entry');
      return await addContactInformation(data);
    }

    const contactInfo = existingInfo.data[0];
    if (!contactInfo || !contactInfo.id) {
      console.error('Invalid contact information structure:', contactInfo);
      throw new Error('Invalid contact information structure');
    }

    console.log('Updating contact information with ID:', contactInfo.id);
    const response = await axiosClient.put(
      `/contact-informations/${contactInfo.id}`,
      {
        data: {
          ...data,
          email, // Ensure email is included in the update
        },
      }
    );
    console.log('Update response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating/creating contact information:', error);
    throw error;
  }
};

// Update shipping details by email
// Update shipping details by email
const updateOrCreateShippingDetailsByEmail = async (
  email: string,
  data: ShippingDetails
) => {
  try {
    console.log('Updating/Creating shipping details for email:', email);
    console.log('New shipping data:', data);

    const existingDetails = await getShippingDetailsByEmail(email);
    console.log('Existing shipping details:', existingDetails);

    if (!existingDetails.data || existingDetails.data.length === 0) {
      console.log('No existing shipping details found, creating new entry');
      return await addShippingDetails({ ...data, email });
    }

    const shippingDetails = existingDetails.data[0];
    if (!shippingDetails || !shippingDetails.id) {
      console.error('Invalid shipping details structure:', shippingDetails);
      throw new Error('Invalid shipping details structure');
    }

    console.log('Updating shipping details with ID:', shippingDetails.id);
    const response = await axiosClient.put(
      `/shipping-details/${shippingDetails.id}`,
      {
        data: {
          ...data,
          email, // Ensure email is included in the update
        },
      }
    );
    console.log('Update response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating/creating shipping details:', error);
    throw error;
  }
};

// Create new payment details
const createPaymentDetails = async (email: string, data: PaymentDetails) => {
  try {
    console.log('Creating new payment details for email:', email);
    console.log('Payment data:', data);

    const response = await axiosClient.post('/payment-steps', {
      data: {
        ...data,
        email,
      },
    });

    console.log('Created new payment details');
    console.log('Payment details response:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating payment details:', error);
    throw error;
  }
};

// Update existing payment details
const updatePaymentDetails = async (email: string, data: PaymentDetails) => {
  try {
    console.log('Updating payment details for email:', email);
    console.log('Payment data:', data);

    const existingDetails = await getPaymentDetailsByEmail(email);

    if (
      !existingDetails ||
      !existingDetails.data ||
      existingDetails.data.length === 0
    ) {
      throw new Error('No existing payment details found for update');
    }

    const id = existingDetails.data[0]?.id;
    if (!id) {
      throw new Error('Existing payment details found but no id available');
    }

    const response = await axiosClient.put(`/payment/${id}`, {
      data: {
        ...data,
        email,
      },
    });

    console.log('Updated existing payment details');
    console.log('Payment details response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating payment details:', error);
    throw error;
  }
};

// Function to determine whether to create or update payment details
const handlePaymentDetails = async (email: string, data: PaymentDetails) => {
  try {
    const existingDetails = await getPaymentDetailsByEmail(email);

    if (
      !existingDetails ||
      !existingDetails.data ||
      existingDetails.data.length === 0
    ) {
      return await createPaymentDetails(email, data);
    } else {
      return await updatePaymentDetails(email, data);
    }
  } catch (error) {
    console.error('Error handling payment details:', error);
    throw error;
  }
};

const createOrder = async (orderData: any) => {
  try {
    const response = await axiosClient.post('/orders', { data: orderData });
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const validateLastOrder = async (
  email: string
): Promise<OrderValidationResult> => {
  try {
    // Fetch the most recent order for the given email
    const response = await axiosClient.get('/orders', {
      params: {
        'filters[contact_information][email][$eq]': email,
        'sort[0]': 'createdAt:desc',
        populate: '*',
        'pagination[limit]': 1,
      },
    });

    if (response.data.data.length === 0) {
      return { isValid: false };
    }

    const order = response.data.data[0];

    // Check if the order was created within the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (new Date(order.attributes.createdAt) < oneHourAgo) {
      return { isValid: false };
    }

    // Check if the payment status is completed
    if (
      order.attributes.payment_step?.data?.attributes?.status !== 'completed'
    ) {
      return { isValid: false };
    }

    return {
      isValid: true,
      orderDetails: {
        totalPrice: order.attributes.totalPrice,
        orderId: order.id,
        createdAt: order.attributes.createdAt,
        status: order.attributes.status,
        items: order.attributes.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    };
  } catch (error) {
    console.error('Error validating last order:', error);
    throw error;
  }
};

const getUserOrderItems = (email: string, page: number = 1) =>
  axiosClient.get('/orders', {
    params: {
      populate: {
        order_items_list: {
          populate: {
            product: {
              populate: ['banner'], // Ensures product images are included
            },
          },
        },
        shipping_detail: '*',
        contact_information: '*',
        payment_step: '*',
      },
      'filters[email][$eq]': email,
      pagination: {
        page,
        pageSize: 10, // Change this to the required page size
      },
    },
  });

// Function to Submit Contact Form
const addContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await axiosClient.post('/contact-forms', { data });
    return response;
  } catch (error) {
    console.error('Error adding contact information:', error);
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getLatestProducts,
  addToCart,
  getUserCartItems,
  deleteCartItem,
  clearUserCart,
  getCategoryList,
  updateCartItem,
  addUserDeliveryDetails,
  getUserDeliveryDetails,
  updateUserDeliveryDetails,
  addToWishList,
  removeFromWishList,
  getWishListProductList,
  getProductsByCategory,
  getCategoryById,
  addContactInformation,
  addShippingDetails,
  addPaymentDetails,
  getContactInformationByEmail,
  getShippingDetailsByEmail,
  getPaymentDetailsByEmail,
  updateContactInformationByEmail,
  updateOrCreateShippingDetailsByEmail,
  createPaymentDetails,
  updatePaymentDetails,
  createOrder,
  validateLastOrder,
  getUserOrderItems,
  addContactForm,
};
