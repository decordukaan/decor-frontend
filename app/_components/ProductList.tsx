import { useEffect, useState } from 'react';
import { Product } from '../types/products';
import { useWishList } from '../_hooks/useWishList';
import { useUser } from '@clerk/nextjs';
import { notifications } from '@mantine/notifications';
import GlobalApi from '../_utils/GlobalApi';
import { useCart } from '../_hooks/useCart';
import ProductItem from './ProductItem';

const ProductList = ({ products }: { products: Product[] }) => {
  const { isInWishList, toggleWishListItem, isWishListLoaded } = useWishList();
  const { user, isLoaded } = useUser();
  const { setCart, isCartLoaded, cart } = useCart();
  const [stockQuantities, setStockQuantities] = useState<
    Record<number, number>
  >({});
  const [stockQuantityLoaded, setStockQuantityLoaded] = useState(false);

  useEffect(() => {
    const fetchStockQuantities = async () => {
      const quantities: Record<number, number> = {};
      for (const product of products) {
        try {
          const stock = await GlobalApi.getStockByProductId(product.id);
          const cartItem = cart.find(
            (item: any) => item.product.id === product.id
          );
          let adjustedStock = stock;

          if (cartItem) {
            adjustedStock -= cartItem.quantity;
          }

          if (stock === null) {
            adjustedStock = -1; // Use -1 to represent unknown stock
          }

          quantities[product.id] = adjustedStock;
        } catch (error) {
          console.error('Error fetching stock quantity:', error);
        }
      }
      setStockQuantities(quantities);
      setStockQuantityLoaded(true);
    };

    fetchStockQuantities();
  }, [products, cart]);

  const handleToggleFavorite = async (productId: number) => {
    if (!isLoaded || !user || !isWishListLoaded) {
      notifications.show({
        title: 'Sign in required',
        message: 'Please sign in to add items to your wishlist.',
        color: 'yellow',
      });
      return;
    }

    try {
      await toggleWishListItem(productId);
      notifications.show({
        title: isInWishList(productId)
          ? 'Removed from Wishlist'
          : 'Added to Wishlist',
        message: isInWishList(productId)
          ? 'This product has been removed from your wishlist.'
          : 'This product has been added to your wishlist.',
        color: isInWishList(productId) ? 'red' : 'green',
      });
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleAddToCart = async (product: Product) => {
    const quantityToAdd = 1;
    const stockQuantity = stockQuantities[product.id];

    console.log('User:', user);
    console.log('Product:', product);
    console.log('Stock Quantity:', stockQuantity);

    if (!user) {
      notifications.show({
        title: 'Sign in required',
        message: 'Please sign in to add items to your cart.',
        color: 'yellow',
      });
      return;
    }

    // Check if the product is out of stock
    if (stockQuantity !== null && stockQuantity <= 0) {
      notifications.show({
        title: 'Out of Stock',
        message: 'This product is currently out of stock.',
        color: 'red',
      });
      return;
    }

    try {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;

      const existingCartItem = cart.find(
        (item: any) => item.product.id === product.id
      );

      let currentCartQuantity = 0;
      if (existingCartItem) {
        currentCartQuantity = existingCartItem.quantity;
      }

      console.log('Current Cart Quantity:', currentCartQuantity);

      let response;
      if (existingCartItem) {
        const cartItemId = existingCartItem.id;
        const newQuantity = currentCartQuantity + quantityToAdd;
        const newPrice = Number(product.attributes?.pricing) * newQuantity;

        console.log(
          'Updating Cart Item:',
          cartItemId,
          'New Quantity:',
          newQuantity,
          'New Price:',
          newPrice
        );

        response = await GlobalApi.updateCartItem(cartItemId, {
          data: {
            quantity: newQuantity,
            price: newPrice,
          },
        });
      } else {
        console.log('Adding New Item to Cart:', product.id);

        response = await GlobalApi.addToCart({
          data: {
            userName: user.fullName,
            email: userEmail,
            products: product.id,
            quantity: quantityToAdd,
            price: Number(product.attributes?.pricing) * quantityToAdd,
          },
        });
      }

      // Update the stock quantities and cart state after a successful API call
      const updatedStockQuantity =
        stockQuantity !== null ? stockQuantity - quantityToAdd : null;
      setStockQuantities((prev: any) => ({
        ...prev,
        [product.id]: updatedStockQuantity,
      }));

      const updatedCartResponse = await GlobalApi.getUserCartItems(userEmail);
      const updatedCartItems = updatedCartResponse.data.data.map(
        (item: any) => ({
          id: item.id,
          product: item.attributes.products.data[0],
          quantity: item.attributes.quantity,
          price: item.attributes.price,
        })
      );
      setCart(updatedCartItems);

      notifications.show({
        title: 'Added to Cart',
        message: `${quantityToAdd} item added to your cart`,
        color: 'green',
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to add item to cart. Please try again.',
        color: 'red',
      });
    }
  };

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 sm:gap-4 gap-4 lg:gap-x-6 lg:gap-y-8 mt-[24px]'>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInWishList={isInWishList(product.id)}
          onToggleFavorite={() => handleToggleFavorite(product.id)}
          onAddToCart={() => handleAddToCart(product)}
          isOutOfStock={stockQuantities[product.id] <= 0}
          isWishListLoaded={isWishListLoaded}
          isCartLoaded={isCartLoaded}
          isUserLoggedIn={isLoaded && !!user}
          stockQuantity={stockQuantities[product.id]}
          stockQuantityLoaded={stockQuantityLoaded}
        />
      ))}
    </div>
  );
};

export default ProductList;
