import { StaticImport } from 'next/dist/shared/lib/get-img-props';

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
    category?: string;
    createdAt?: string;
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
    featured:boolean
  };
}

export interface ProductListProps {
  productList: Product[];
}
