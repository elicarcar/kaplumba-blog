import Router from 'next/router';
import Cookies from 'js-cookie';

export const setCookie = (token) => {
  Cookies.set('token', token.data);
  Router.push('/profilim');
};

export function redirectUser(ctx, location) {
  if (ctx.req) {
    // ctx.res.writeHead(302, { Location: location });
    // ctx.res.end();
    Router.push(location);
  }
}

export const destroyCookie = (ctx, token) => {
  Cookies.remove(token);
  // ctx.res.writeHead(302, { Location: '/login' });
  // ctx.res.end();
};
