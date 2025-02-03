import { ContactInformation, PaymentDetails, ShippingDetails } from "../types/checkout";

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

const getAllProducts = () => axiosClient.get('/products?populate=*');

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

const addToWishlist = async (
  email: string,
  user: string,
  productId: number
) => {
  try {
    const response = await getWishlistProductList(email);
    let wishlist = response.data.data[0];

    if (!wishlist) {
      // Create wishlist if it doesn't exist
      const newWishlist = await axiosClient.post('/wishlists', {
        data: {
          userName: user,
          email: email,
          products: [productId],
        },
      });
      return newWishlist.data;
    } else {
      // Update existing wishlist
      const updatedProducts = [
        ...wishlist.attributes.products.data.map((p: any) => p.id),
        productId,
      ];
      const updatedWishlist = await axiosClient.put(
        `/wishlists/${wishlist.id}`,
        {
          data: { products: updatedProducts },
        }
      );
      return updatedWishlist.data;
    }
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

const removeFromWishlist = async (email: string, productId: number) => {
  try {
    const response = await getWishlistProductList(email);
    let wishlist = response.data.data[0];

    if (wishlist) {
      const updatedProducts = wishlist.attributes.products.data
        .filter((p: any) => p.id !== productId)
        .map((p: any) => p.id);

      const updatedWishlist = await axiosClient.put(
        `/wishlists/${wishlist.id}`,
        {
          data: { products: updatedProducts },
        }
      );
      return updatedWishlist.data;
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// get wishlist ProductList
const getWishlistProductList = (email: string) =>
  axiosClient.get(`/wishlists?filters[email][$eq]=${email}&populate=products`);

// To get products by category

const getProductsByCategory = (categoryId: string) =>
  axiosClient.get(
    `/products?filters[product_category][id][$eq]=${categoryId}&populate[banner]=*&populate[images]=*&populate[description]=*&populate[other_relations]=*`
  );

const addContactInformation = async (data:ContactInformation) => {
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
const addShippingDetails = async (data: ShippingDetails & { email: string }) => {
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

const addPaymentDetails = async (data:PaymentDetails) => {
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
  console.log('passed email to getContact information by email:',email)
  try {
    console.log("Fetching:", `/contact-informations?filters[email][$eq]=${encodeURIComponent(email)}`);
    const response = await axiosClient.get(
      `/contact-informations?filters[email][$eq]=${encodeURIComponent(email)}`
    );
    console.log("API Response getContactInformationByEmail:", response.data);
    return response.data;
  } catch (error:any) {
    console.error("API Error getContactInformationByEmail:", error.response?.data || error.message);
  }
};



// Get shipping details by email
const getShippingDetailsByEmail = async (email: string) => {
  try {
    console.log(`Fetching shipping details for email: ${email}`);
    const response = await axiosClient.get(`/shipping-details?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`);
    console.log('Shipping details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping details:', error);
    throw error;
  }
};

// Get payment details by email
const getPaymentDetailsByEmail = (email: string) =>
  axiosClient.get(`/payment-steps?filters[email][$eq]=${email}`);

// Update contact information by email
// Update or create contact information by email
const updateContactInformationByEmail = async (email: string, data: ContactInformation) => {
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
    const response = await axiosClient.put(`/contact-informations/${contactInfo.id}`, {
      data: {
        ...data,
        email // Ensure email is included in the update
      }
    });
    console.log('Update response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating/creating contact information:', error);
    throw error;
  }
};

// Update shipping details by email
// Update shipping details by email
const updateOrCreateShippingDetailsByEmail = async (email: string, data: ShippingDetails) => {
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
    const response = await axiosClient.put(`/shipping-details/${shippingDetails.id}`, {
      data: {
        ...data,
        email // Ensure email is included in the update
      }
    });
    console.log('Update response:', response.data);
    return response;
  } catch (error) {
    console.error('Error updating/creating shipping details:', error);
    throw error;
  }
};

// Update payment details by email
const updatePaymentDetailsByEmail = async (email: string, data: PaymentDetails) => {
  try {
    const existingDetails = await getPaymentDetailsByEmail(email);
    if (!existingDetails.data || existingDetails.data.length === 0) {
      throw new Error('No existing payment details found');
    }
    const id = existingDetails.data[0].id;
    const response = await axiosClient.put(`/payment-steps/${id}`, {
      data,
    });
    return response;
  } catch (error) {
    console.error('Error updating payment details:', error);
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
  getCategoryList,
  updateCartItem,
  addUserDeliveryDetails,
  getUserDeliveryDetails,
  updateUserDeliveryDetails,
  addToWishlist,
  removeFromWishlist,
  getWishlistProductList,
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
  updatePaymentDetailsByEmail,
};
