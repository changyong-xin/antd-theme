const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: ' http://192.168.4.17:7777/api',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
    }));
}