import { useState } from 'react';
import { Group, Anchor, Box, Stack } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

interface NavigationItem {
  label: string;
  href: string;
  subItems?: NavigationItem[];
}

interface NavigationProps {
  navigationItems: NavigationItem[];
  isMobile?: boolean;
}

const Navigation = ({ navigationItems, isMobile }: NavigationProps) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className='lg:flex bg-yellow-600 bg-opacity-20 py-3 px-6 rounded-full hidden '>
        <Group align='center'>
          {navigationItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </Group>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className='flex lg:hidden text-yellow-600'>
          <Stack w='100%'>
            {navigationItems.map((item, index) => (
              <MobileNavItem key={index} item={item} />
            ))}
          </Stack>
        </div>
      )}
    </>
  );
};

const NavItem = ({ item }: { item: NavigationItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <Group align='center'>
        <Anchor
          style={{
            backgroundColor: '#f4f4f5',
            padding: '8px 18px',
            borderRadius: '100px',
            color: '#CA8A04',
            fontSize: '16px',
            display:
              item.subItems && item.subItems.length > 0
                ? 'flex'
                : 'inline-block',
            alignItems: 'center',
            gap: '6px', // Add some spacing between text & icon
          }}
          href={item.href}
        >
          {item.label}
          {item.subItems && item.subItems.length > 0 && (
            <IconChevronDown size={16} />
          )}
        </Anchor>
      </Group>
      {item.subItems && item.subItems.length > 0 && isOpen && (
        <Box
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '4px 8px',
            zIndex: 1000,
            minWidth: 'calc(100% + 50px)',
          }}
        >
          {item.subItems.map((subItem, index) => (
            <Anchor
              key={index}
              href={subItem.href}
              style={{
                display: 'block',
                padding: '4px 4px',
                textDecoration: 'none',
                color: '#CA8A04',
              }}
            >
              {subItem.label}
            </Anchor>
          ))}
        </Box>
      )}
    </Box>
  );
};

const MobileNavItem = ({ item }: { item: NavigationItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Group onClick={() => setIsOpen((prev) => !prev)}>
        <Anchor href={item.href}>{item.label}</Anchor>
        {item.subItems && item.subItems.length > 0 && (
          <IconChevronDown
            size={16}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        )}
      </Group>
      {item.subItems && item.subItems.length > 0 && isOpen && (
        <Box style={{ padding: '16px', marginTop: '8px' }}>
          {item.subItems.map((subItem, index) => (
            <Anchor
              key={index}
              href={subItem.href}
              style={{
                display: 'block',
                padding: '4px 0',
                textDecoration: 'none',
                color: '#CA8A04',
              }}
            >
              {subItem.label}
            </Anchor>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Navigation;
