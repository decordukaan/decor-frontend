import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Category } from './categoryList';

export interface Product {
  id: number;
  attributes: {
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    pricing: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    featured: boolean;
    stock_quantity: number;
    banner: {
      id: number;
      data:{
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
            large: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
            small: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
            medium: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
            thumbnail: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
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
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          createdAt: string;
          updatedAt: string;
        };
      }
    };
    product_category: {
      data: {
        id: number;
        attributes: {
          description: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          title: string;
        };
      };
    };
    images: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
            large: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
            small: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
            medium: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              size: number;
              width: number;
              height: number;
              provider_metadata: {
                public_id: string;
                resource_type: string;
              };
            };
            thumbnail: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
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
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: {
            public_id: string;
            resource_type: string;
          };
          createdAt: string;
          updatedAt: string;
        };
      }>;
    };
  };
}

export interface ProductListProps {
  productList: Product[];
  onToggleWishList?: (productId: number) => Promise<void>;
}
