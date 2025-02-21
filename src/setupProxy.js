const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://eu-test.oppwa.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};