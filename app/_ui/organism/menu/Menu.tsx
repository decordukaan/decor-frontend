// src/components/Menu/Menu.tsx

import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import { Box, Burger, Button, Drawer, Group, Text } from '@mantine/core';
import classes from './Menu.module.css';
import { useCart } from '@/app/_hooks/useCart';
import { useEffect, useState } from 'react';
import { useDrawer } from '@/app/_hooks/useDrawer';
import Navigation from '../../molecules/Navigation';
import Cart from '@/app/_components/Cart';
import Link from 'next/link';

interface MenuProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  navigationItems: Array<{ label: string; href: string }>;
}

const Menu = ({ isLogin, setIsLogin, navigationItems }: MenuProps) => {
  const { cart, setCart } = useCart(); // Get cart state from custom hook
  const { user, isLoaded } = useUser();
  const { drawerOpened, toggleDrawer } = useDrawer(); // Get drawer state from custom hook
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
        // Add any other user properties you want to store
      };
      console.log('User data loaded:', userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } else if (isLoaded && !user) {
      localStorage.removeItem('userData');
    }
  }, [isLoaded, user]);

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
                    color='blue'
                  >
                    Login
                  </Button>
                  <Button
                    component='a'
                    href='/sign-in'
                    variant='outline'
                    color='blue'
                    className='hidden sm:block'
                  >
                    Register
                  </Button>
                </Group>
              ) : (
                <Group>
                  <Text
                    className='flex gap-1 cursor-pointer'
                    onClick={() => {
                      setOpenCart(!openCart);
                      console.log('hellooooooo');
                    }}
                  >
                    <ShoppingCart />({cart?.length})
                  </Text>
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
