const PORT = process.env.PORT || 3000;

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kaplumba.herokuapp.com'
    : `http://localhost:${PORT}`;

export default baseUrl;
