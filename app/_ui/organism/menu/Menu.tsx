import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart, Heart } from 'lucide-react';
import { Box, Burger, Button, Drawer, Group, Text } from '@mantine/core';
import classes from './Menu.module.css';
import { useCart } from '@/app/_hooks/useCart';
import { useState } from 'react';
import { useDrawer } from '@/app/_hooks/useDrawer';
import Navigation from '../../molecules/Navigation';
import Cart from '@/app/_components/Cart';
import Link from 'next/link';
import { useWishList } from '@/app/_hooks/useWishList';

interface MenuProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  navigationItems: Array<{ label: string; href: string }>;
}

const Menu = ({ isLogin, setIsLogin, navigationItems }: MenuProps) => {
  const { cart } = useCart(); // Get cart state from custom hook
  const { user, isLoaded } = useUser();
  const { drawerOpened, toggleDrawer } = useDrawer(); // Get drawer state from custom hook
  const [openCart, setOpenCart] = useState(false);
  const { wishListItems } = useWishList();

  return (
    !isLogin && (
      <div>
        <header className={classes.header}>
          <Group justify='space-between' h='100%'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='Company Logo'
                width={90}
                height={90}
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation navigationItems={navigationItems} />

            <Group>
              {!user && isLoaded ? (
                <Group>
                  <Button
                    component='a'
                    href='/sign-in'
                    variant='filled'
                    color='yellow'
                  >
                    Login
                  </Button>
                  <Button
                    component='a'
                    href='/sign-in'
                    variant='outline'
                    color='yellow'
                    className='hidden sm:block'
                  >
                    Register
                  </Button>
                </Group>
              ) : (
                <Group>
                  {/* WishList Icon */}
                  <Link href='/wishlist' className='flex gap-1 cursor-pointer'>
                    <Heart
                      className={`h-5 w-5 ${
                        wishListItems.length > 0
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    />
                    {/* Display the number of items in the wishList */}
                    {wishListItems.length > 0 && (
                      <Text size='sm' className='text-red-500'>
                        ({wishListItems.length})
                      </Text>
                    )}
                  </Link>

                  {/* Shopping Cart Icon */}
                  <Text
                    className='flex gap-1 cursor-pointer'
                    onClick={() => {
                      setOpenCart(!openCart);
                    }}
                  >
                    <ShoppingCart />
                    {cart && cart.length > 0 && `(${cart.length})`}
                  </Text>

                  {/* User Button */}
                  <UserButton />
                </Group>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom='sm'
            />
          </Group>
        </header>

        {openCart && <Cart openCart={openCart} setOpenCart={setOpenCart} />}

        <Drawer
          opened={drawerOpened}
          onClose={toggleDrawer}
          size='100%'
          padding='md'
          hiddenFrom='sm'
          zIndex={1000000}
        >
          {/* Mobile Navigation inside Drawer */}
          <Navigation navigationItems={navigationItems} isMobile={true} />
        </Drawer>
      </div>
    )
  );
};

export default Menu;
