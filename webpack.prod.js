const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  mode: 'production',
  output:
  {
      assetModuleFilename: 'assets/[name][ext]',
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename : "index.html",
      minify: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/contact.html'),
      filename : "contact.html",
      minify: true
    }),
  ],

  module: {
    rules: [
      // HTML
      {
          test: /\.(html)$/,
          use: [{
            loader : 'html-loader',
            options: {
              // Disables attributes processing
             
            }
          }],
      },
      // CSS
      {
        test: /\.s[ac]ss$/i,
        use:
        [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
      },
      // Images & videos
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: 'asset/resource',
      },
      // Fonts
     {

       test: /\.(woff|woff2|eot|ttf|otf)$/i,
       type: 'asset/resource',

     },
    ]
  }
};