import React from 'react';
import Drawer from '@mui/material/Drawer';

import FilterSidebar from '../filter/FilterSidebar';

interface SearchDrawerProps {
  open: boolean;
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}
const SearchDrawer: React.FC<SearchDrawerProps> = ({ open, toggleDrawer }) => {
  return (
    <Drawer
      anchor="left"
      classes={{ paper: 'w-screen' }}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <FilterSidebar toggleDrawer={toggleDrawer} />
    </Drawer>
  );
};

export default SearchDrawer;
