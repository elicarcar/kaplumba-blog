import '../styles/globals.css';
import Layout from '../components/Layout';
import axios from 'axios';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import 'semantic-ui-css/semantic.min.css';
import { redirectUser } from '../utils/clientAuth';
import '../styles/nprogress.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token } = await parseCookies(ctx);

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  try {
    const res = await axios.get(`/api/user`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const user = await res.data;
    pageProps.user = user;
  } catch (error) {
    //Throw out invalid token
    destroyCookie(ctx, 'token');
  }

  return { pageProps };
};

export default MyApp;
