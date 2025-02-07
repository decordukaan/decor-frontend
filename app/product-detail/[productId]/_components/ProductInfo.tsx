import { Product } from '@/app/types/products';
import { ShoppingCart, Minus, Plus, Check, X } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useContext, useState } from 'react';
import { CartContext } from '@/app/_context/CartContext';
import { notifications } from '@mantine/notifications';
import { Button } from '@mantine/core';
import Link from 'next/link';

interface ProductInfoProps {
  product: Product | undefined;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const descriptionText =
    product?.attributes?.description?.[0]?.children?.[0]?.text || '';

  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product?.attributes?.pricing || 0);
  const [loading, setLoading] = useState(false);

  const onIncreaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      setPrice(Number(product?.attributes?.pricing) * newQuantity);
      return newQuantity;
    });
  };

  const onDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newQuantity = prev - 1;
        setPrice(Number(product?.attributes?.pricing) * newQuantity);
        return newQuantity;
      });
    }
  };

  const onAddToCartClick = async () => {
    if (!user) return;

    setLoading(true); // Show loading spinner

    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userEmail || !product) {
      console.error('User email or product not available');
      setLoading(false);
      return;
    }

    try {
      const res = await GlobalApi.getUserCartItems(userEmail);
      const existingCartItem = res.data.data.find((cart: any) =>
        cart.attributes.products.data.some(
          (cartProduct: any) => cartProduct.id === product.id
        )
      );

      let response;
      if (existingCartItem) {
        // Update existing cart item
        const cartItemId = existingCartItem.id;
        const newQuantity = existingCartItem.attributes.quantity + quantity;
        const newPrice = Number(product.attributes?.pricing) * newQuantity;

        response = await GlobalApi.updateCartItem(cartItemId, {
          data: {
            quantity: newQuantity,
            price: newPrice,
          },
        });
      } else {
        // Add new cart item
        response = await GlobalApi.addToCart({
          data: {
            userName: user.fullName,
            email: userEmail,
            products: product.id,
            quantity,
            price: Number(product.attributes?.pricing) * quantity,
          },
        });
      }

      console.log('Cart updated successfully', response);

      // Refresh cart data
      const updatedCartResponse = await GlobalApi.getUserCartItems(userEmail);

      // Update local cart state with the fresh data from the server
      const updatedCartItems = updatedCartResponse.data.data.map((item: any) => ({
        id: item.id,
        product: item.attributes.products.data[0],
        quantity: item.attributes.quantity,
        price: item.attributes.price,
      }));
      setCart(updatedCartItems);

      // Show success notification
      notifications.show({
        title: 'Added to Cart',
        message: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart`,
        color: 'green',
        icon: <Check />,
      });

    } catch (error) {
      console.error('Error updating cart:', error);
      // Show error notification
      notifications.show({
        title: 'Error',
        message: 'Failed to add item to cart. Please try again.',
        color: 'red',
        icon: <X />,
      });
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div>
      <h2 className='text-[20px]'>{product?.attributes?.title}</h2>
      <h2 className='text-[15px] text-gray-400'>
        {product?.attributes?.product_category?.data?.attributes.title || ''}
      </h2>
      <p className='text-[15px] mt-5 text-gray-700'>{descriptionText}</p>
      <h2 className='text-[32px] text-[#373737] font-medium mt-5'>
        ₹{product?.attributes?.pricing}
      </h2>

      {/* Quantity Controls */}
      <div className='flex items-center gap-4 mt-5'>
        <button
          className='p-2 bg-gray-200 rounded'
          onClick={onDecreaseQuantity}
          disabled={quantity === 1}
        >
          <Minus size={16} />
        </button>
        <span className='text-[18px] font-medium'>{quantity}</span>
        <button
          className='p-2 bg-gray-200 rounded'
          onClick={onIncreaseQuantity}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Sign-in Button if User is Not Logged In */}
      {!user ? (
        <Link href="/sign-in" passHref>
          <Button
            className="flex gap-2 mt-5 px-8 py-3 bg-yellow-500 hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-600 text-white font-semibold rounded-lg"
            leftSection={<ShoppingCart />}
            color='yellow'
          >
            Sign in to Add to Cart
          </Button>
        </Link>
      ) : (
        <Button
          className="flex gap-2 mt-5 px-8 py-3 bg-yellow-500 hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-600 text-white font-semibold rounded-lg"
          leftSection={<ShoppingCart />}
          loading={loading}
          onClick={onAddToCartClick}
          color='yellow'
        >
          Add to cart
        </Button>
      )}

      <div className='text-gray-500 mt-4'>Cart Item Price for this item: {price}</div>
    </div>
  );
};

export default ProductInfo;
