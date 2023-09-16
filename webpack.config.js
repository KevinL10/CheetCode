const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    content: "./src/content.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "manifest.json", to: "manifest.json" }],
    }),
    // new CopyPlugin({
    //   patterns: [{ from: "images", to: "images" }],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: require.resolve("babel-loader"),
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  mode: "production",
  watch: true,
};