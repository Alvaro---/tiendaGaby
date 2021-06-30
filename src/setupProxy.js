const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'https://young-wildwood-03509.herokuapp.com',
      changeOrigin: true,
    })
  );
};