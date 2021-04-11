import React, { useState, useEffect } from 'react';
import { Menu, Segment, Icon } from 'semantic-ui-react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function NavBar({ user }) {
  function handleItemClick() {
    console.log('hello');
  }

  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');

  return (
    <Segment className="nav_wrapper radius-none align-baseline" inverted>
      <Menu borderless inverted pointing secondary stackable>
        <Link href="/">
          <Menu.Item active={router.asPath === '/'} onClick={handleItemClick}>
            <Icon name="qq" />
            Kaplumba
          </Menu.Item>
        </Link>
      </Menu>
      <Menu inverted borderless pointing secondary stackable>
        <Link href="/profilim">
          <Menu.Item
            active={router.asPath === '/profilim'}
            onClick={handleItemClick}
          >
            <Icon name="user" />
            Profilim
          </Menu.Item>
        </Link>
        <Link href="/kaydol">
          <Menu.Item
            active={router.asPath === '/kaydol'}
            onClick={handleItemClick}
          >
            <Icon name="sign-in" />
            {!user ? 'Kaydol' : 'Cikis yap'}
          </Menu.Item>
        </Link>
      </Menu>
    </Segment>
  );
}

export default NavBar;
