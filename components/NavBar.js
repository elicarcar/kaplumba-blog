import React, { useState } from 'react';
import { Menu, Segment, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function NavBar() {
  function handleItemClick() {
    console.log('hello');
  }

  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');

  return (
    <Segment inverted>
      <Menu borderless inverted pointing secondary stackable>
        <Link href="/">
          <Menu.Item
            name="Anasayfa"
            active={router.asPath === '/'}
            onClick={handleItemClick}
          >
            <Icon name="qq" />
            Anasayfa
          </Menu.Item>
        </Link>

        <Link href="/profilim">
          <Menu.Item
            name="Profilim"
            active={router.asPath === '/profilim'}
            onClick={handleItemClick}
          >
            <Icon name="user" />
            Profilim
          </Menu.Item>
        </Link>
        <Link href="/">
          <Menu.Item
            name="friends"
            active={router.asPath === '/friends'}
            onClick={handleItemClick}
          />
        </Link>
      </Menu>
    </Segment>
  );
}

export default NavBar;
