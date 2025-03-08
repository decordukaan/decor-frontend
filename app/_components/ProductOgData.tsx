'use client';

import { Product } from '@/app/types/products';
import { useEffect } from 'react';

interface ProductOgDataProps {
  product: Product;
}

const ProductOgData = ({ product }: ProductOgDataProps) => {
  // Safely extract description with defensive coding
  const getDescription = (): string => {
    try {
      if (
        product?.attributes?.description &&
        Array.isArray(product.attributes.description)
      ) {
        return (
          product.attributes.description
            .filter(Boolean)
            .map((paragraph) => {
              if (paragraph?.children && Array.isArray(paragraph.children)) {
                return paragraph.children
                  .filter((child) => child && typeof child === 'object')
                  .map((child) =>
                    child && typeof child.text === 'string' ? child.text : ''
                  )
                  .filter(Boolean)
                  .join(' ');
              }
              return '';
            })
            .filter(Boolean)
            .join(' ')
            .substring(0, 200) + '...'
        ); // Truncate for OG description
      }
      return '';
    } catch (descError) {
      console.error(
        'Error parsing product description for OpenGraph:',
        descError
      );
      return `Product: ${product?.attributes?.title || 'Unknown'}`;
    }
  };

  // Get primary image URL with fallback
  const getImageUrl = (): string => {
    try {
      return (
        product?.attributes?.banner?.data?.attributes?.url ||
        product?.attributes?.images?.data?.[0]?.attributes?.url ||
        '/images/default.png'
      );
    } catch (error) {
      console.error('Error getting product image for OpenGraph:', error);
      return '/images/default.png';
    }
  };

  useEffect(() => {
    // Safety check for SSR and product existence
    if (typeof window === 'undefined' || !product) return;

    try {
      // Update document title
      document.title = `${
        product?.attributes?.title || 'Product'
      } | Decor Dukaan`;

      // Update meta tags
      updateMetaTag('description', getDescription());
      updateMetaTag(
        'og:title',
        product?.attributes?.title || 'Decor Dukaan Product'
      );
      updateMetaTag('og:description', getDescription());
      updateMetaTag('og:image', getImageUrl());
      updateMetaTag(
        'og:url',
        `https://decordukaan.com/product-detail/${product?.id || ''}`
      );
      updateMetaTag('og:type', 'product');
      updateMetaTag('og:site_name', 'Decor Dukaan');
      updateMetaTag(
        'product:price:amount',
        String(product?.attributes?.pricing || 0)
      );
      updateMetaTag('product:price:currency', 'INR');
      updateMetaTag(
        'product:availability',
        product?.attributes?.stock_quantity &&
          product.attributes.stock_quantity > 0
          ? 'in stock'
          : 'out of stock'
      );
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag(
        'twitter:title',
        product?.attributes?.title || 'Decor Dukaan Product'
      );
      updateMetaTag('twitter:description', getDescription());
      updateMetaTag('twitter:image', getImageUrl());

      // Update canonical link
      updateCanonicalLink(
        `https://decordukaan.com/product-detail/${product?.id || ''}`
      );
    } catch (error) {
      console.error('Error updating metadata:', error);
    }
  }, [product]);

  // Helper function to update meta tags
  const updateMetaTag = (name: string, content: string) => {
    // Check if the meta tag exists
    let metaTag =
      document.querySelector(`meta[property="${name}"]`) ||
      document.querySelector(`meta[name="${name}"]`);

    if (!metaTag) {
      // Create meta tag if it doesn't exist
      metaTag = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('product:')) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      document.head.appendChild(metaTag);
    }

    // Update content
    metaTag.setAttribute('content', content);
  };

  // Helper function to update canonical link
  const updateCanonicalLink = (href: string) => {
    // Check if canonical link exists
    let canonicalLink = document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      // Create canonical link if it doesn't exist
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    // Update href
    canonicalLink.setAttribute('href', href);
  };

  return null; // This component doesn't render anything visible
};

export default ProductOgData;
