import React, { useEffect } from 'react';
import NavBar from './NavBar';

const Layout = (props) => {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div>
      <NavBar user={props.user} />
      {props.children}
    </div>
  );
};

export default Layout;
