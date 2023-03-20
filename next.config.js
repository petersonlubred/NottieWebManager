/** @type {import('next').NextConfig} */

const path = require('path');
const withTM = require('next-transpile-modules')([]);
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = withTM({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const envPath = path.join(__dirname, 'env.js');
      config.node = {
        ...config.node,
        __filename: true,
        __dirname: true,
      };
      config.module.rules.push({
        test: /\.js$/,
        include: [envPath],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
            },
          },
        ],
      });
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [{ from: envPath, to: path.join(__dirname, '.next/server') }],
        })
      );
    }
    return config;
  },
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
