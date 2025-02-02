import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Category } from './categoryList';

export interface Product {
  id?: number;
  attributes?: {
    title?: string;
    description?: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    pricing?: number;
    product_category?: {
      data: {
        id: number;
        attributes: {
          description: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          title: string;
        }
      }
    };
    updatedAt?: string;
    publishedAt?: string;
    banner?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
            [key: string]: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: string | null;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string | StaticImport | undefined;
          previewUrl: string | null;
          provider: string;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          createdAt: string;
          updatedAt: string;
        };
      };
    };
    featured:boolean;
    stock_quantity: number;
  };
}

export interface ProductListProps {
  productList: Product[];
}
