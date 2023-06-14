/* eslint-env node */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const Dotenv = require('dotenv-webpack');

const root = path.resolve(__dirname, '../');

module.exports = function () {
   return {
      context: path.resolve(root, 'client'),
      entry: ['./index'],
      output: {
         path: path.resolve(root, 'dist'),
         filename: '[name].[contenthash].js',
         assetModuleFilename: '[name].[contenthash][ext]',
         publicPath: '/',
         hashDigestLength: 10,
      },
      plugins: [
         new ForkTsCheckerWebpackPlugin({
            typescript: {
               configFile: path.resolve(root, 'tsconfig.json'),
               configOverwrite: {
                  compilerOptions: {
                     skipLibCheck: true,
                     sourceMap: false,
                     inlineSourceMap: false,
                     declarationMap: false,
                  },
                  exclude: [
                     '**/*.test.js',
                     '**/*.test.jsx',
                     '**/*.test.ts',
                     '**/*.test.tsx',
                     'server',
                  ],
               },
            },
         }),
         new HtmlWebpackPlugin({
            template: '../public/template.html',
            favicon: '../public/favicon.ico',
         }),
         new CopyWebpackPlugin({
            patterns: [{ from: '../public', noErrorOnMissing: false }],
         }),
         new Dotenv({ path: '.env' }),
      ],
      resolve: {
         alias: {
            '@/types': path.resolve(root, 'types'),
            '@/test': path.resolve(root, 'test'),
            '@': path.resolve(root, 'client'),
         },
         extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      module: {
         rules: [
            {
               test: /\.(j|t)s(x?)$/,
               exclude: /node_modules/,
               use: ['babel-loader'],
            },
            {
               test: /\.(png|jpg|jpeg|gif|bmp|webp)$/,
               type: 'asset',
            },
            {
               test: /\.(woff2|woff|ttf)$/,
               type: 'asset/resource',
            },
            {
               test: /\.svg$/,
               type: 'asset',
               generator: {
                  dataUrl: (content) => svgToMiniDataURI(content.toString()),
               },
            },
         ],
      },
      stats: 'errors-warnings',
   };
};
