import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import baseUrl from '../utils/baseUrl';
import { parseCookies } from 'nookies';
import { Container } from 'semantic-ui-react';
import Yazi from '../components/Yazi';
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
        <div class="d-flex flex-column justify-center align-center h-50">
          <p>Gosterilecek hic makale yok.</p>
          <p>
            <Link href="/profilim/makale">Buradan</Link> yeni bir makale
            olusturmaya baslayabilirsiniz.
          </p>
        </div>
      )}
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  const res = await axios.get(`${baseUrl}/api/articles`, {
    headers: { Authorization: token },
  });

  return { articles: res.data };
};

export default Home;
