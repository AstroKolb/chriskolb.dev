// cspell:words pmmmwh
/* eslint-env node */

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function () {
   return {
      mode: 'development',
      plugins: [
         new ReactRefreshWebpackPlugin({
            overlay: false,
         }),
      ],
      module: {
         rules: [
            {
               test: /\.(s?)css$/,
               use: [
                  'style-loader',
                  {
                     loader: 'css-loader',
                     options: {
                        modules: {
                           localIdentName: '[local]_[hash:base64:5]',
                        },
                     },
                  },
                  'postcss-loader',
                  'sass-loader',
               ],
               sideEffects: true,
            },
         ],
      },
      devServer: {
         hot: true,
         port: 3000,
         static: false,
         compress: true,
         host: '0.0.0.0',
         allowedHosts: 'all',
         client: {
            logging: 'warn',
            overlay: false,
         },
         historyApiFallback: true,
      },
      devtool: 'source-map',
   };
};
