import React, { useState } from 'react';
import { Menu, Segment, Icon } from 'semantic-ui-react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function NavBar() {
  function handleItemClick() {
    console.log('hello');
  }

  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');

  return (
    <Segment className="nav_wrapper" inverted>
      <Menu borderless inverted pointing secondary stackable>
        <Link href="/">
          <Menu.Item active={router.asPath === '/'} onClick={handleItemClick}>
            <Icon name="qq" />
            Anasayfa
          </Menu.Item>
        </Link>

        <Link href="/profilim">
          <Menu.Item
            active={router.asPath === '/profilim'}
            onClick={handleItemClick}
          >
            <Icon name="user" />
            Profilim
          </Menu.Item>
        </Link>
        <Link href="/">
          <Menu.Item
            active={router.asPath === '/friends'}
            onClick={handleItemClick}
          />
        </Link>
      </Menu>
      <Menu inverted borderless inverted pointing secondary stackable>
        <Link href="/kaydol">
          <Menu.Item
            active={router.asPath === '/kaydol'}
            onClick={handleItemClick}
          >
            <Icon name="sign-in" />
            Kaydol
          </Menu.Item>
        </Link>
      </Menu>
    </Segment>
  );
}

export default NavBar;
