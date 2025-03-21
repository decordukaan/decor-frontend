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
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

const outfit = Outfit({ subsets: ['latin'] });

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
              <title>Decor Dukaan - Transforming Spaces with Elegance and Style</title>
    <meta
      name='description'
      content='Discover Decor Dukaan, where we blend elegance with functionality to transform your spaces. Our curated collection of home decor items is designed to inspire and elevate your living environment. Explore our range of stylish and high-quality products that cater to every taste and preference.'
    />
    <meta name="google-site-verification" content="Vhj8cONYHe2iWkLUb-haNgo24VZNpw1Kijmh7UUknbg" />
    <meta name="google-site-verification" content="C1tTbTZzKWQFnQNijPPqTVcvATtbYZlE0CPAcH5foj4" />
                <ColorSchemeScript />
                <Script
                  id='razorpay-checkout-js'
                  src='https://checkout.razorpay.com/v1/checkout.js'
                />
                <GoogleTagManager gtmId='GTM-N7MTTGPW' />
                <GoogleAnalytics gaId='G-04S1DLREZC' />
                {/* Google Analytics */}
              </head>
              <body className={outfit.className}>
                <MantineProvider
                  theme={{
                    primaryColor: 'yellow', // Set yellow as default
                  }}
                >
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
