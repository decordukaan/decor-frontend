interface WishlistItem {
    id: number;
    attributes: {
      title: string;
      description: {
        type: string;
        children: {
          text: string;
          type: string;
        }[];
      }[];
      pricing: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      featured: boolean;
    };
  }

  interface UserWishlist {
    id: number;
    attributes: {
      userName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      products: {
        data: WishlistItem[];
      };
    };
  }

  type UsersWishlistData = UserWishlist[];
