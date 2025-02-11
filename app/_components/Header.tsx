import { Container } from '@mantine/core';
import Menu from '../_ui/organism/menu/Menu';
import { useState } from 'react';
import { setLocalStorage, getLocalStorage } from '../_utils/localStorage';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigationItems = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Products', href: '/all-products' },
    {
      label: 'Categories',
      href: '#',
      subItems: [
        { label: 'Wall Art', href: '#' },
        { label: 'Cushions & Throws', href: '#' },
        { label: 'Lighting', href: '#' },
        { label: 'Vases & Planters', href: '#' },
        { label: 'Clock', href: '#' },
      ],
    },
    { label: 'Profile', href: '/profile' },
    { label: 'Contact Us', href: '/contact-us' }
    

  ];

  return (
    <div className='container mx-auto mt-[15px] mb-[20px]'>
      <Menu
        navigationItems={navigationItems}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </div>
  );
};
export default Header;
