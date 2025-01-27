
import { useState } from 'react';

export const useDrawer = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => setDrawerOpened((prev) => !prev);

  return { drawerOpened, toggleDrawer };
};
