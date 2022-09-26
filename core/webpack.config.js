const path = require("path");
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CoreIndexGenerator = require("./index-generator");
const IndexPlugin = require("./plugins/index-plugin");

const outDir = require("path").resolve(__dirname, "./build");

module.exports = {
  entry: {
    "el-core": "./index.ts"
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-transform-modules-amd"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      "core": path.resolve(__dirname, "./")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: outDir,
    filename: "[name].js",
    libraryTarget: "amd"
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'overrides'
      }]
    }),
    new IndexPlugin([
      {
        name: "@core",
        generator: new CoreIndexGenerator()
      }
    ]),
    new ReplaceInFileWebpackPlugin([
      {
        dir: outDir,
        files: ["el-core.js"],
        rules: [
          {
            search: /window.Terrasoft/g,
            replace: "Terrasoft"
          }
        ]
      }
    ])
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};