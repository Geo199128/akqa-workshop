const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    "./src/js/loader.js",
    "./src/js/app.js",
    "./src/js/header.js",
    "./src/js/video-player.js",
    "./src/js/accordion.js",
  ],
  output: {
    // Webpack will create js files even though they are not used
    filename: "main.bundle.js",
    // Where the CSS is saved to
    path: path.resolve(__dirname, "dist/js"),
  },
  mode: "production",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|eot|svg)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "../fonts",
            },
          },
        ],
      },
    ],
  },
};
