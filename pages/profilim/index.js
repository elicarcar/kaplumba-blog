import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Container, Label, Button, Icon } from 'semantic-ui-react';
import UserMenu from '../../components/dashboard/UserMenu';
import UserMenuItem from '../../components/dashboard/UserMenuItem';
import Link from 'next/link';

export default function Profilim({ user }) {
  const [activeTab, setActiveTab] = useState(null);

  function handleMenuItemClick(e, data) {
    setActiveTab(data.value);
  }

  return (
    <>
      <Container className="d-flex container">
        <Container>
          <Header as="h1">{`Hosgeldin ${user.username}`}</Header>
          <UserMenu>
            <UserMenuItem
              itemName="Okuma Listem"
              iconName="bookmark"
              itemValue={user.readLists}
              handleMenuItemClick={(e, data) => handleMenuItemClick(e, data)}
            />
            <UserMenuItem
              itemName="Makalelerim"
              itemValue={user.articles}
              handleMenuItemClick={(e, data) => handleMenuItemClick(e, data)}
            >
              <Label color="teal">{user.articles.length}</Label>
            </UserMenuItem>
            <UserMenuItem>
              <Icon
                className="d-flex align-center justify-center"
                name="plus"
                color="teal"
                size="large"
                center
              />
              <Link href="profilim/makale">
                <Button color="teal">Makale olustur</Button>
              </Link>
            </UserMenuItem>
          </UserMenu>
        </Container>
        <Container text>
          {activeTab !== null &&
            !activeTab.length &&
            'Henuz gosterilebilecek bir icerik yok.'}
        </Container>
      </Container>
    </>
  );
}
