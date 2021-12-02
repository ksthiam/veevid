//path = module node js pour la gestion des chemins de fichiers
const path = require("path");

//Plugin pour gerer l'ajout automatique des scripts et style dans head et footer
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Plugin pour une meilleure gestion des CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Point d'entrée du projet
  entry: path.resolve(__dirname, './src/index.js'),
  // Mode utilisé pour compiler
  mode: 'development',
  // paramètres de sortie des éléments
  output:
  {
    //Chemin du dossier de sortie
    path: path.resolve(__dirname, './dist'),
    // nom des bundle JS à la sortie 
    filename: 'bundle.[hash].js',
    // chemins des assets à la sortie
    assetModuleFilename: 'assets/[name][ext]',
      
  },
  // Initialisations des plugins à utiliser par webpack
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
    })
  ],
  // Liste des règles à suivre par webpack
  module: {
    rules: [
      // HTML : Utilisation d'html-loader pour gerer les chemins des assets
      {
          test: /\.(html)$/,
          use: ['html-loader'],
      },
      // CSS : Utilisation dans l'ordre : sass-loader pour compiler le scss, css-loader pour traiter le css, et le loader du plugin css pour une bonne gestion
      {
        test: /\.s[ac]ss$/i,
        use:
        [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
      },
      // Images & videos : On traite ces éléments comme des ressources
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: 'asset/resource',
      },
      // Fonts : Idem Images et videos
     {

       test: /\.(woff|woff2|eot|ttf|otf)$/i,
       type: 'asset/resource',

     },
    ]
  },
  //Paramètres du serveur de dev
    devServer:
    {
      // Chemin du dossier à servir
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      //port du serveur
      port: 9000
    }
};