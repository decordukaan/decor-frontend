import { useUser } from '@clerk/nextjs';
import Menu from '../_ui/organism/menu/Menu';
import { useState } from 'react';

const Header = () => {
  const { isSignedIn } = useUser(); // Get user login status from Clerk
  const [isLogin, setIsLogin] = useState(false);

  const navigationItems = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Products', href: '/all-products' },
    { label: 'Profile', href: '/profile' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  // Add "Order Details" only if the user is logged in
  if (isSignedIn) {
    navigationItems.push({ label: 'Order Details', href: '/order-details' });
  }

  return (
    <div className='container mx-auto mt-[15px] mb-[20px]'>
      <Menu navigationItems={navigationItems} isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
};

export default Header;
