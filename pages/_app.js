import '../styles/globals.css';
import Layout from '../components/Layout';
import axios from 'axios';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import baseUrl from '../utils/baseUrl';
import 'semantic-ui-css/semantic.min.css';
import { redirectUser } from '../utils/clientAuth';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (ctx) => {
  let pageProps = {};
  const { token } = parseCookies(ctx);

  if (!token) {
    const notProtectedRoute =
      ctx.pathname !== '/kaydol' || ctx.pathname !== '/login';

    if (notProtectedRoute) {
      redirectUser(ctx, '/kaydol');
    }
  }

  try {
    const payload = {
      headers: { Authorization: token },
    };
    const res = await axios.get(`${baseUrl}/api/user`, payload);
    const user = await res.data;
    pageProps.user = user;
  } catch (error) {
    console.error('Error getting current user', error);
    //Throw out invalid token
    destroyCookie(ctx, 'token');
  }

  return { pageProps };
};

export default MyApp;
