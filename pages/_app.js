import '../styles/globals.css';
import Layout from '../components/Layout';
import axios from 'axios';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import baseUrl from '../utils/baseUrl';
import 'semantic-ui-css/semantic.min.css';
import { redirectUser } from '../utils/clientAuth';
import Cookie from 'js-cookie';
import '../styles/nprogress.css';

function MyApp({ Component, pageProps }) {
  const token = Cookie.get('token');

  const notProtectedRoute =
    Router.pathname == '/kaydol' || Router.pathname == '/login';

  useEffect(() => {
    if (!notProtectedRoute && !token) {
      Router.push('/login');
    }
  }, []);

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
    const payload = {
      headers: { Authorization: token },
    };
    const res = await axios.get(`${baseUrl}/api/user`, payload);
    const user = await res.data;
    pageProps.user = user;
  } catch (error) {
    //Throw out invalid token
    destroyCookie(ctx, 'token');
  }

  return { pageProps };
};

export default MyApp;
