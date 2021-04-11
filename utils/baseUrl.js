const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'write something'
    : 'http://localhost:3000';

export default baseUrl;
