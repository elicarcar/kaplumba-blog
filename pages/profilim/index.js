import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Header, Icon, Label } from 'semantic-ui-react';
import UserMenu from '../../components/dashboard/UserMenu';
import UserMenuItem from '../../components/dashboard/UserMenuItem';
import Yazi from '../../components/Yazi';

export default function Profilim({ user }) {
  const [activeTab, setActiveTab] = useState(user.articles);

  function handleMenuItemClick(e, data) {
    console.log(data.value);
    setActiveTab(data.value);
  }

  useEffect(() => {
    console.log(user);
  });

  return (
    <>
      <Container className="d-flex profil container">
        <Container>
          <Header as="h1">{`Hoşgeldin ${user.username}`}</Header>
          <p className="secondary">
            Burada okuma listeni ve makalelerini görebilir, isteğine göre
            düzenleyebilirsin.
          </p>
          <UserMenu>
            <UserMenuItem
              itemName="Makalelerim"
              itemValue={user.articles}
              handleMenuItemClick={(e, data) => handleMenuItemClick(e, data)}
            >
              <Label color="teal">{user.articles.length}</Label>
            </UserMenuItem>
            <UserMenuItem
              itemName="Okuma Listem"
              iconName="bookmark"
              itemValue={user.readLists}
              handleMenuItemClick={(e, data) => handleMenuItemClick(e, data)}
            />
            <UserMenuItem>
              <Icon
                className="d-flex align-center justify-center"
                name="plus"
                color="teal"
                size="large"
              />
              <Link href="profilim/makale">
                <Button color="teal">Makale oluştur</Button>
              </Link>
            </UserMenuItem>
          </UserMenu>
        </Container>
        <div className="line"></div>
        <Container text>
          {!activeTab.length || activeTab == undefined ? (
            <p className="secondary">Henüz gösterilebilecek bir içerik yok.</p>
          ) : (
            activeTab.map((article) => {
              return (
                <Yazi isOnProfilePage={true} article={article} user={user} />
              );
            })
          )}
        </Container>
      </Container>
    </>
  );
}
