import { join } from 'path';

import { Configuration } from 'webpack';

import babelConfig from './babelConfig';

export default {
  entry: ['core-js/stable', 'regenerator-runtime/runtime'],
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    host: '0.0.0.0'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: babelConfig },
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: babelConfig }]
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
        include: join(__dirname, 'assets')
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
        include: join(__dirname, 'assets')
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/gif',
        include: join(__dirname, 'assets')
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?mimetype=image/jpg',
        include: join(__dirname, 'assets')
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
} as Configuration;
