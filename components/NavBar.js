import React, { useState, useEffect } from 'react';
import { Menu, Segment, Icon } from 'semantic-ui-react';
import Router, { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import Link from 'next/link';
import NProgress from 'nprogress';

function NavBar({ user }) {
  Router.onRouteChangeStart = () => NProgress.start();
  Router.onRouteChangeComplete = () => NProgress.done();
  Router.onRouteChangeError = () => NProgress.done();

  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');

  async function handleItemClick() {
    await destroyCookie(null, 'token');
    router.push('/login');
  }

  return (
    <Segment
      id="navBar"
      className="nav_wrapper radius-none align-baseline"
      inverted
    >
      <Menu borderless inverted pointing secondary>
        <Link href="/">
          <Menu.Item active={router.asPath === '/'}>
            <Icon name="qq" />
            Kaplumba
          </Menu.Item>
        </Link>
      </Menu>
      <Menu inverted borderless pointing secondary>
        {user && (
          <Link href="/profilim">
            <Menu.Item active={router.asPath === '/profilim'}>
              <Icon name="user" />
              Profilim
            </Menu.Item>
          </Link>
        )}

        {!user ? (
          <Link href="/login">
            <Menu.Item active={router.asPath === '/login'}>
              Giris
              <Icon name="sign-in" />
            </Menu.Item>
          </Link>
        ) : (
          <Menu.Item onClick={handleItemClick}>
            <Icon name="sign-in" />
            Cikis
          </Menu.Item>
        )}
      </Menu>
    </Segment>
  );
}

export default NavBar;
