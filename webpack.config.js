'use strict'

const path = require('path');
const webpack = require('webpack');

const baseConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: ['./src/index'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: "tslint-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'ts-loader',
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};

const browserConfig = (env) => {
  const DISTRIBUTION = env && env.DISTRIBUTION === 'true';
  return Object.assign({}, baseConfig, {
    devtool: !DISTRIBUTION && 'inline-source-map',
    output: {
      path: path.join(__dirname, DISTRIBUTION ? 'lib/browser' : 'build/browser'),
      filename: DISTRIBUTION ? 'nns.min.js' : 'bundle.js',
      libraryTarget: "umd",
      library: 'NeoNS',
      libraryExport: 'default',
      globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
  });
};

const nodeConfig = (env) => {
  const DISTRIBUTION = env && env.DISTRIBUTION === 'true';

  return Object.assign({}, baseConfig, {
    devtool: !DISTRIBUTION && 'inline-source-map',
    output: {
      path: path.join(__dirname, DISTRIBUTION ? 'lib/node' : 'build/node'),
      filename: DISTRIBUTION ? 'nns.min.js' : 'bundle.js',
      libraryTarget: "umd",
      library: 'NeoNS',
      libraryExport: 'default',
      globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    externals: {
      '@cityofzion/neon-js': '@cityofzion/neon-js'
    },
  });
};

module.exports = [ browserConfig, nodeConfig ];
