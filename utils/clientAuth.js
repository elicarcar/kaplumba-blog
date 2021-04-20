import Router from 'next/router';
import Cookies from 'js-cookie';
import baseUrl from './baseUrl';

export const setCookie = (token) => {
  Cookies.set('token', token.data);
  window.location.href = `${baseUrl}/profilim`;
};

export function redirectUser(ctx, location) {
  if (ctx.req) {
    // ctx.res.writeHead(302, { Location: location });
    // ctx.res.end();
    window.location.href = `${baseUrl}/${location}`;
  }
}

export const destroyCookie = (ctx, token) => {
  Cookies.remove(token);
  // ctx.res.writeHead(302, { Location: '/login' });
  // ctx.res.end();
};
