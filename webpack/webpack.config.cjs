/* eslint-env node */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge: webpackMerge } = require('webpack-merge');
const webpackFrontEnd = require('./webpack.frontend.cjs');
const webpackDev = require('./webpack.dev.cjs');
const webpackProd = require('./webpack.prod.cjs');

function bundler(pack, env) {
   const isProduction = process.env.NODE_ENV === 'production';

   const webpackConfig = pack();

   if (env.showBundleAnalysis) {
      return webpackMerge(webpackConfig, webpackProd(), {
         plugins: [
            new BundleAnalyzerPlugin({
               defaultSizes: 'parsed',
               openAnalyzer: true,
            }),
         ],
      });
   }
   if (isProduction) {
      return webpackMerge(webpackConfig, webpackProd());
   }
   return webpackMerge(webpackConfig, webpackDev());
}

module.exports = function (env = {}) {
   return bundler(webpackFrontEnd, env);
};
