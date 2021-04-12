import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const UserMenuItem = ({
  itemName,
  iconName,
  handleMenuItemClick,
  itemValue,
  children,
  itemClass = '',
}) => {
  return (
    <Menu.Item
      className={`pointer ${itemClass}`}
      value={itemValue}
      onClick={handleMenuItemClick}
    >
      {itemName}
      {children}
      <Icon color="teal" name={iconName} />
    </Menu.Item>
  );
};

export default UserMenuItem;
