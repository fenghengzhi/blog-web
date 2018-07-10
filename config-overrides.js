const webpack = require('webpack');


module.exports = function override(config, env) {
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.ProvidePlugin({ 'window.hljs': 'highlight.js' }));
  // config.devServer = config.devServer || {};
  // config.devServer.proxy = {
  //   '/api': {
  //     changeOrigin: true,
  //     target: 'http://127.0.0.1:8080',
  //     // pathRewrite: {
  //     //   '^/api': ''
  //     // }
  //   },
  // };
  return config;
};