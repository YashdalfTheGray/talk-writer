const webpackConfig = `const { resolve } = require('path');

module.exports = {
  entry: [resolve(__dirname, './index.jsx')],
  output: {
    path: resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: resolve(__dirname, './dist')
  }
};`;

export default {
  name: 'webpack.config.js',
  content: webpackConfig
};
