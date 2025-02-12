'use client';

import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { CartContext } from './_context/CartContext';
import { useState } from 'react';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { WishListContext } from './_context/WishListContext';
import { StockProvider } from './_context/StockContext';
import Script from 'next/script';

const outfit = Outfit({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);

  return (
    <ClerkProvider>
      <StockProvider>
        <CartContext.Provider value={{ cart, setCart }}>
          <WishListContext.Provider value={{ wishListItems, setWishListItems }}>
            <html lang='en' {...mantineHtmlProps}>
              <head>
                <ColorSchemeScript />
                <Script
                  id='razorpay-checkout-js'
                  src='https://checkout.razorpay.com/v1/checkout.js'
                />
              </head>
              <body className={outfit.className}>
                <MantineProvider>
                  <Notifications />
                  <Header />
                  {children}
                  <Footer />
                </MantineProvider>
              </body>
            </html>
          </WishListContext.Provider>
        </CartContext.Provider>
      </StockProvider>
    </ClerkProvider>
  );
}
