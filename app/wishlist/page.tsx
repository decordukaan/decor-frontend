'use client';

import { useContext, useEffect } from 'react';
import { WishListContext } from '../_context/WishListContext';

function WishList() {
  const { wishList, setWishList } = useContext(WishListContext);

  useEffect(() => {
    console.log('ith aanu wishlist' + wishList);
  }, []);

  return (
    <div>
      this is the wishlist:
      {/* {wishList.map((item: { id: string; name: string }) => (
        <div key={item.id}>{item.}</div>
      ))} */}
    </div>
  );
}

export default WishList;
