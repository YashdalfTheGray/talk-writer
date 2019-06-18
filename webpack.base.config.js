const { resolve } = require('path');

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime'],
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, './dist'),
    host: '0.0.0.0'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.md$/,
        loader: 'html-loader!markdown-loader?gfm=true'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'raw-loader'],
        include: __dirname
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        include: path.join(__dirname, 'assets')
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
        include: path.join(__dirname, 'assets')
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/gif',
        include: path.join(__dirname, 'assets')
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?mimetype=image/jpg',
        include: path.join(__dirname, 'assets')
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
};
