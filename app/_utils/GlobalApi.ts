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
  axiosClient.get(`/products?sort=createdAt:desc&pagination[limit]=${limit}&populate=*`);

// Add to cart collection
const addToCart = (data: {
  data: {
    userName: string | null;
    email: string | undefined;
    products: number | undefined;
  };
}) => axiosClient.post('/carts', data);

// get user cart items
const getUserCartItems = (email: string) =>
  axiosClient.get(
    '/carts?populate[products][populate][0]=banner&filters[email][$eq]=' + email
  );

// delete item from cart
const deleteCartItem = (id: number) => axiosClient.delete('/carts/' + id);

export default {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getLatestProducts,
  addToCart,
  getUserCartItems,
  deleteCartItem,
};