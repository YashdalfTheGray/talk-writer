const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions']
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties']
};

export default babelConfig;
