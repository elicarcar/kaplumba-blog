import React, { useEffect } from 'react';
import Yazi from '../components/Yazi';
import { Container } from 'semantic-ui-react';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Link from 'next/link';

function Home({ articles, user }) {
  useEffect(() => {
    console.log(articles);
  });

  return (
    <>
      {articles.length ? (
        <Container>
          {articles.map((article, i) => (
            <Yazi article={article} key={i} user={user} />
          ))}
        </Container>
      ) : (
        <div className="d-flex flex-column justify-center align-center h-50">
          <p>Gösterilecek hiç makale yok.</p>
          <p>
            <Link href="/profilim/makale">Buradan</Link> yeni bir makale
            oluşturmaya başlayabilirsiniz.
          </p>
        </div>
      )}
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  try {
    const res = await axios.get(`${baseUrl}/api/articles`, {
      headers: { Authorization: token },
    });

    return { articles: res.data };
  } catch (error) {
    console.log('bok');
  }
};

export default Home;
