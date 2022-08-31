const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/js/controller.js"],
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
