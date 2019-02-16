// var glob = require("glob");

// module.exports = {
//   entry: {
//      js: glob.sync("./src/**/*.ts"),  
//   }
// }


// resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] }

module.exports = {
  entry: ['babel-polyfill', './src/bale.ts'],
  output: {
    path: __dirname,
    filename: './dist/index.js',
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: '/node_modules/',
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        }]
      }
    ]
  }
};