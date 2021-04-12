import React from 'react';
import { Menu } from 'semantic-ui-react';

const UserMenu = ({ children }) => {
  return <Menu vertical>{children}</Menu>;
};

export default UserMenu;
