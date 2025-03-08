'use client';

import { Product } from '@/app/types/products';
import { useEffect, useRef, useMemo } from 'react';

interface ProductJsonLdProps {
  product: Product;
}

const ProductJsonLd = ({ product }: ProductJsonLdProps) => {
  // Use ref to track if the component is mounted
  const isMounted = useRef(true);
  // Use ref to track the current script element
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Generate a stable script ID
  const scriptId = useMemo(() =>
    `product-jsonld-${product?.id || 'unknown'}`,
    [product?.id]
  );

  // Memoize the JSON-LD data to prevent unnecessary regeneration
  const jsonLd = useMemo(() => {
    if (!product) return null;

    try {
      // Safely extract description with defensive coding
      let description = '';
      try {
        if (product.attributes?.description && Array.isArray(product.attributes.description)) {
          description = product.attributes.description
            .filter(Boolean)
            .map(paragraph => {
              if (paragraph?.children && Array.isArray(paragraph.children)) {
                return paragraph.children
                  .filter(child => child && typeof child === 'object')
                  .map(child => (child && typeof child.text === 'string') ? child.text : '')
                  .filter(Boolean)
                  .join(' ');
              }
              return '';
            })
            .filter(Boolean)
            .join(' ');
        }
      } catch (descError) {
        console.error('Error parsing product description:', descError);
        description = `Product: ${product.attributes?.title || 'Unknown'}`;
      }

      return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.attributes?.title || 'Product',
        "image": [
          product.attributes?.banner?.data?.attributes?.url || '/images/default.png',
          ...(Array.isArray(product.attributes?.images?.data)
            ? product.attributes.images.data
                .filter(img => img && img.attributes)
                .map(img => img.attributes?.url)
                .filter(Boolean)
            : [])
        ],
        "description": description || `Buy ${product.attributes?.title || 'this product'} for ₹${product.attributes?.pricing || '0'}`,
        "sku": String(product.id || ''),
        "mpn": String(product.id || ''),
        "brand": {
          "@type": "Brand",
          "name": "Decor Dukaan"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://decordukaan.com/product-detail/${product.id || ''}`,
          "priceCurrency": "INR",
          "price": String(product.attributes?.pricing || 0),
          "availability": product.attributes?.stock_quantity && product.attributes.stock_quantity > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock"
        }
      };
    } catch (error) {
      console.error('Error generating JSON-LD data:', error);
      return null;
    }
  }, [
    product?.id,
    product?.attributes?.title,
    product?.attributes?.pricing,
    product?.attributes?.stock_quantity,
    product?.attributes?.banner?.data?.attributes?.url,
    // Use a stable reference check for complex nested objects
    JSON.stringify(product?.attributes?.images?.data),
    JSON.stringify(product?.attributes?.description)
  ]);

  useEffect(() => {
    // Set up cleanup for component unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Safety check for SSR and product existence
    if (typeof window === 'undefined' || !product || !jsonLd) return;

    try {
      // Remove any existing script with the same ID
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      // Create and inject the script
      const scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      scriptElement.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptElement);

      // Store reference to the script element
      scriptRef.current = scriptElement;
    } catch (error) {
      console.error('Error in ProductJsonLd component:', error);
    }

    // Clean up function
    return () => {
      try {
        if (scriptRef.current && isMounted.current) {
          scriptRef.current.remove();
          scriptRef.current = null;
        }
      } catch (cleanupError) {
        console.error('Error during ProductJsonLd cleanup:', cleanupError);
      }
    };
  }, [jsonLd, scriptId]);

  return null; // This component doesn't render anything visible
};

export default ProductJsonLd;