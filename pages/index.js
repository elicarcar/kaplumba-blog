import React, { useEffect } from 'react';
import Yazi from '../components/Yazi';
import { Container, Header } from 'semantic-ui-react';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Link from 'next/link';
import ArticlesPagination from '../components/ArticlesPagination';
import Router from 'next/router';

function Home({ articles = [], totalPages = [], user }) {
  useEffect(() => {
    if (!user || !articles) {
      Router.push('/login');
    }
  }, []);

  return (
    <>
      {articles.length ? (
        <Container>
          <Header as="h1" textAlign="center" content="Makaleler" />
          {articles.map((article, i) => (
            <Yazi article={article} key={i} user={user} />
          ))}
          <ArticlesPagination totalPages={totalPages} />
        </Container>
      ) : (
        <div className="d-flex flex-column justify-center align-center h-50">
          <p>Gosterilecek hic makale yok.</p>
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
    const page = ctx.query.page ? ctx.query.page : '1';
    const size = 5;
    const url = `${baseUrl}/api/articles`;
    const payload = {};
    const res = await axios.get(url, {
      params: { page, size },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return res.data;
  } catch (error) {
    console.log('bok');
  }
};

export default Home;
