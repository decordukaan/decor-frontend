import Image from 'next/image';
import { Product } from '../types/products';
import { Heart, ChevronRightSquare, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  Badge,
  Text,
  Group,
  ActionIcon,
  Button,
  Skeleton,
} from '@mantine/core';
import { useState } from 'react';

interface ProductItemProps {
  product: Product;
  isInWishList: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => Promise<void>;
  isOutOfStock: boolean;
  isWishListLoaded: boolean;
  isCartLoaded: boolean;
  isUserLoggedIn: boolean;
  stockQuantity: number;
  stockQuantityLoaded: boolean;
}

const ProductItem = ({
  product,
  isInWishList,
  onToggleFavorite,
  onAddToCart,
  isOutOfStock,
  isWishListLoaded,
  isCartLoaded,
  isUserLoggedIn,
  stockQuantity,
  stockQuantityLoaded,
}: ProductItemProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      await onAddToCart();
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Link href={`/product-detail/${product.id}`} className='block h-full'>
      <Card
        shadow='sm'
        radius='md'
        className='relative transition-transform hover:scale-[102%] h-full flex flex-col justify-between'
        padding={0}
      >
        {/* Product Image and Wishlist Icon */}
        <div className='relative'>
          <Image
            src={
              product.attributes?.banner?.data?.attributes?.url ||
              '/images/default.png'
            }
            alt={product.attributes?.title || 'Product image'}
            width={0}
            height={0}
            sizes='100vw'
            className='rounded-md object-cover w-full h-[120px] sm:h-[300px]'
          />

          {isUserLoggedIn && !isWishListLoaded ? (
            <Skeleton
              height={36}
              width={36}
              className='absolute top-2 right-2'
            />
          ) : (
            <div className='absolute top-2 right-2'>
              <ActionIcon
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                variant='light'
                color={isInWishList ? 'red' : 'gray'}
                radius='xl'
              >
                <Heart size={20} />
              </ActionIcon>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className='p-4 flex flex-col justify-between flex-grow min-h-[80px] sm:min-h-[120px]'>
          <Group className='w-full'>
            <div className='sm:flex-[5] flex-wrap '>
              <div
                className='font-semibold text-[12px] sm:text-base line-clamp-2'
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.attributes?.title}
              </div>
              <Text size='xs' c='dimmed' className='truncate' mt='xs'>
                <span className='hidden sm:inline-flex'>
                  <ChevronRightSquare
                    size={16}
                    className='text-gray-500 mr-2'
                  />
                  {product.attributes?.product_category?.data?.attributes.title}
                </span>
              </Text>
            </div>
            <Badge color='green' size='xl' variant='light'>
              ₹{product.attributes?.pricing}
            </Badge>
          </Group>

          <Group py='xs' mt='xs'>
            {!stockQuantityLoaded ? (
              <Skeleton height={36} width='100%' />
            ) : !isUserLoggedIn ? (
              <Link className='w-full flex' href='/sign-in' passHref>
                <Button
                  variant='light'
                  color={isOutOfStock ? 'gray' : 'yellow'}
                  leftSection={<ShoppingCart />}
                  fullWidth
                >
                  {isOutOfStock ? 'Out of Stock' : 'Sign in to Add to Cart'}
                </Button>
              </Link>
            ) : (
              <Button
                variant='light'
                color={isOutOfStock ? 'gray' : 'yellow'}
                flex={5}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                loading={isAddingToCart}
                leftSection={<ShoppingCart />}
                fullWidth
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            )}
          </Group>
        </div>
      </Card>
    </Link>
  );
};

export default ProductItem;
