module.exports = {
  env: {
    MONGO_DB:
      'mongodb+srv://eli:elideli@cluster0.1b5rb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    JWT_SECRET: 'kaplumba_blog',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          // { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
          { key: 'Origin', value: 'https://kaplumba-blog.vercel.app' },
          { key: 'Accept', value: '*/*' },
          { key: 'Referer', value: 'https://kaplumba-blog.vercel.app' },
          { key: 'User-Agent', value: 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};
