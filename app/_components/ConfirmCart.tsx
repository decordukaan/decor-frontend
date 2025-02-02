import { useContext } from 'react';
import { CartContext } from '../_context/CartContext';

function ConfirmCart() {
  const { cart, setCart } = useContext(CartContext);
  return (
    <div className='mt-[38px]'>
      <ul className='space-y-4'>
        {cart.map((item: any, index: number) => (
          <li key={index} className='flex items-center gap-4'>
            <img
              src={
                (item.product?.attributes?.banner?.data.attributes
                  .url as string) || ''
              }
              alt=''
              className='size-16 rounded object-cover'
            />

            <div className='flex-grow'>
              <h3 className='text-sm text-gray-900'>
                {item?.product?.attributes?.title}
              </h3>

              <dl className='mt-0.5 space-y-px text-[10px] text-gray-600'>
                <div>
                  <dt className='inline'>
                    {item?.product?.attributes?.category}
                  </dt>
                </div>

                <div>
                  <dt className='inline'>
                    ₹ {item?.product?.attributes?.pricing} x {item.quantity}
                  </dt>
                </div>

                <div>
                  <dt className='inline font-semibold'>
                    Total: ₹{' '}
                    {Number(
                      (
                        item?.product?.attributes?.pricing * item.quantity
                      ).toFixed(2)
                    )}
                  </dt>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ConfirmCart;
