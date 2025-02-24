interface WishListItem {
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

interface UserWishList {
  id: number;
  attributes: {
    userName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    products: {
      data: WishListItem[];
    };
  };
}

// Add this line to define UsersWishListData
type UsersWishListData = UserWishList[];

// Export the types
export type { WishListItem, UserWishList, UsersWishListData };