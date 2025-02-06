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

type UsersWishListData = UserWishList[];
