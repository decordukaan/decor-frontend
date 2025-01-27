import { useState, useEffect } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { Product } from '../types/products';

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Assuming your API has a way to filter featured products
        // If not, we'll filter them client-side
        const res = await GlobalApi.getFeaturedProducts();
        const fetchedProducts = res.data.data;

        // Filter products where featured is true
        const featuredProducts = fetchedProducts;

        setProducts(featuredProducts);
      } catch (err) {
        setError('Failed to fetch featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { products, loading, error };
};
