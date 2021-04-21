const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kaplumba-blog.vercel.app/'
    : 'http://localhost:3000';

export default baseUrl;
