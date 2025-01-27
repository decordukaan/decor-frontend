import { Container } from '@mantine/core';
import Menu from '../_ui/organism/menu/Menu';
import { useState } from 'react';
import { setLocalStorage, getLocalStorage } from '../_utils/localStorage';

const Header = () => {

  const [isLogin, setIsLogin] = useState(false);
  const navigationItems = [
    { label: 'Home', href: '#' },
    { label: 'Learn', href: '#' },
    {
      label: 'Products',
      href: '#',
      subItems: [
        { label: 'Clock', href: '#' },
        { label: 'Wall Painting', href: '#' },
        { label: 'Pots', href: '#' },
      ],
    },
    { label: 'Learn', href: '#' },
  ];

  return (
    <div className="container mx-auto">

        <Menu
          navigationItems={navigationItems}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />

    </div>
  );
};
export default Header;
