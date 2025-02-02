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
const addShippingDetails = async (data:ShippingDetails) => {
  try {
    const response = await axiosClient.post('/shipping-details', {
      data,
    });
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
};
