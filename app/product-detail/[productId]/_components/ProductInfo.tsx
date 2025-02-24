import { Product } from '@/app/types/products';
import { ShoppingCart, Minus, Plus, Check, X } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/app/_context/CartContext';
import { notifications } from '@mantine/notifications';
import { Button, Tooltip, Collapse, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { useCart } from '@/app/_hooks/useCart';

interface ProductInfoProps {
  product: Product | undefined;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedDescription, setTruncatedDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { user, isLoaded } = useUser();
  const { setCart } = useContext(CartContext);
  const { cart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product?.attributes?.pricing || 0);
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (product?.attributes?.description) {
      const fullText = product.attributes.description
        .map((paragraph: any) => paragraph.children[0].text)
        .join('\n');

      if (fullText.length > 150) {
        setTruncatedDescription(fullText.slice(0, 150) + '...');
      } else {
        setTruncatedDescription(fullText);
      }
    }
    setLoading(false);
  }, [product]);

  useEffect(() => {
    const fetchStockQuantity = async () => {
      if (product) {
        try {
          const stock = await GlobalApi.getStockByProductId(product.id);
          const cartItem = cart.find(
            (item: any) => item.product.id === product.id
          );
          let adjustedStock = cartItem ? stock - cartItem.quantity : stock;

          if (stock === null) {
            adjustedStock = null;
          }

          setStockQuantity(adjustedStock);
        } catch (error) {
          console.error('Error fetching stock quantity:', error);
        } finally {
          setIsDataLoaded(true);
        }
      }
    };

    fetchStockQuantity();
  }, [product, cart]);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const onIncreaseQuantity = () => {
    if (stockQuantity !== null && quantity >= stockQuantity) {
      notifications.show({
        title: 'Stock Limit Reached',
        message: 'You cannot add more items than available in stock.',
        color: 'red',
        icon: <X />,
      });
      return;
    }

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
    if (!user || (stockQuantity !== null && stockQuantity <= 0)) {
      notifications.show({
        title: 'Out of Stock',
        message: 'This product is currently out of stock.',
        color: 'red',
        icon: <X />,
      });
      return;
    }

    setLoading(true);

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

      setQuantity(1);

      notifications.show({
        title: 'Added to Cart',
        message: `${quantity} ${
          quantity > 1 ? 'items' : 'item'
        } added to your cart`,
        color: 'green',
        icon: <Check />,
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to add item to cart. Please try again.',
        color: 'red',
        icon: <X />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisabledClick = () => {
    if (stockQuantity !== null && quantity >= stockQuantity) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div>
      {!isDataLoaded || !isLoaded ? (
        <div>
          <Skeleton height={24} width="60%" radius="sm" />
          <Skeleton height={18} width="30%" radius="sm" mt={8} />
          <Skeleton height={20} width="90%" radius="sm" mt={16} />
          <Skeleton height={20} width="85%" radius="sm" mt={4} />
          <Skeleton height={20} width="50%" radius="sm" mt={4} />
          <Skeleton height={30} width="20%" radius="sm" mt={20} />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, gap: 8 }}>
            <Skeleton height={40} width={40} radius="md" />
            <Skeleton height={40} width={40} radius="md" />
            <Skeleton height={40} width={40} radius="md" />
          </div>
          <Skeleton height={50} width="50%" radius="md" mt={16} />
        </div>
      ) : (
        <>
          <h2 className='text-[22px]'>{product?.attributes?.title}</h2>
          <h2 className='text-[16px] text-gray-400'>
            {product?.attributes?.product_category?.data?.attributes.title || ''}
          </h2>

          <p className='text-[18px] mt-5 text-gray-700 max-w-xl whitespace-pre-line'>
            {isExpanded
              ? product?.attributes?.description
                  ?.map((p) => p.children[0].text)
                  .join('\n')
              : truncatedDescription}
            {product?.attributes?.description &&
              product.attributes.description
                .map((p) => p.children[0].text)
                .join('\n').length > 150 && (
                <>
                  {isExpanded && <br />}
                  <button
                    onClick={toggleDescription}
                    className='text-blue-500 mt-2'
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>
                </>
              )}
          </p>

          <h2 className='text-[22px] text-[#373737] font-medium mt-5'>
            ₹{product?.attributes?.pricing}
          </h2>

          {stockQuantity !== null && stockQuantity > 0 ? (
            <div>
              <div className='flex items-center gap-4 mt-5'>
                <button
                  className='p-2 bg-gray-200 rounded'
                  onClick={onDecreaseQuantity}
                  disabled={quantity === 1}
                >
                  <Minus size={16} />
                </button>

                <span className='text-[18px] font-medium'>{quantity}</span>

                <Tooltip
                  label='Out of Stock'
                  position='top'
                  withArrow
                  disabled={
                    !(stockQuantity !== null && quantity >= stockQuantity)
                  }
                >
                  <div>
                    <button
                      className={`p-2 rounded transition ${
                        stockQuantity !== null && quantity >= stockQuantity
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200'
                      }`}
                      onClick={() => {
                        if (
                          stockQuantity !== null &&
                          quantity >= stockQuantity
                        ) {
                          handleDisabledClick();
                        } else {
                          onIncreaseQuantity();
                        }
                      }}
                      disabled={
                        stockQuantity !== null && quantity >= stockQuantity
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </Tooltip>
              </div>

              {!user ? (
                <Link href='/sign-in' passHref>
                  <Button
                    className='flex gap-2 mt-[24px] px-8 py-3 bg-yellow-500 hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-600 text-white font-semibold rounded-lg'
                    leftSection={<ShoppingCart />}
                    color='yellow'
                  >
                    Sign in to Add to Cart
                  </Button>
                </Link>
              ) : (
                <Button
                  className='flex gap-2 mt-[24px] px-8 py-3 bg-yellow-500 hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-600 text-white font-semibold rounded-lg'
                  leftSection={<ShoppingCart />}
                  loading={loading}
                  onClick={onAddToCartClick}
                  color='yellow'
                >
                  Add to cart
                </Button>
              )}
            </div>
          ) : (
            <div className='text-red-500 mt-2'>
              This product is currently out of stock.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductInfo;
