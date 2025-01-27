import { Product } from '@/app/types/products';
import { ShoppingCart } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useContext } from 'react';
import { CartContext } from '@/app/_context/CartContext';

interface ProductInfoProps {
  product: Product | undefined;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Extract the description text
  const descriptionText =
    product?.attributes?.description?.[0]?.children?.[0]?.text || '';

  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const onAddToCartClick = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    } else {
      // logic to add the prdt to cart
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          products: product?.id,
        },
      };
      GlobalApi.addToCart(data).then(
        (res: any) => {
          console.log('add to cart', res);
          if(res){
            setCart((prevCart: Product[]) => [
              ...prevCart,
              {
                id: res.data.id,
                product: product,
              },
            ]);
          }

        },
        (error: any) => {
          console.log('error', error);
        }
      );
    }
  };

  return (
    <div>
      <h2 className='text-[20px]'>{product?.attributes?.title}</h2>
      <h2 className='text-[15px] text-gray-400'>
        {product?.attributes?.category}
      </h2>
      <p className='text-[15px] mt-5 text-gray-700'>{descriptionText}</p>
      <h2 className='text-[32px] text-primary font-medium mt-5'>
        ₹{product?.attributes?.pricing}
      </h2>
      <button
        className='flex gap-2 p-3 px-10 mt-5 bg-primary hover:bg-blue-700 text-white rounded-lg'
        onClick={onAddToCartClick}
      >
        <ShoppingCart />
        Add to cart
      </button>
    </div>
  );
};

export default ProductInfo;
