const PORT = process.env.PORT || 3000;

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kaplumba-blog.vercel.app'
    : `http://localhost:${PORT}`;

export default baseUrl;
