import { useState, useEffect, useContext } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { Product } from '../types/products';
import { CartContext } from '../_context/CartContext';

export const useLatestProducts = (limit: number = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const res = await GlobalApi.getLatestProducts();
        const fetchedProducts = res.data.data;

        // Sort products by createdAt date in descending order
        const sortedProducts = fetchedProducts.sort((a: Product, b: Product) =>
          (b.attributes?.createdAt ? new Date(b.attributes.createdAt).getTime() : 0) -
          (a.attributes?.createdAt ? new Date(a.attributes.createdAt).getTime() : 0)
        );


        // Take only the first 'limit' number of products
        const latestProducts = sortedProducts.slice(0, limit);

        setProducts(latestProducts);
      } catch (err) {
        setError('Failed to fetch latest products');
        console.error('Error fetching latest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, [limit]);

  return { products, loading, error };
};