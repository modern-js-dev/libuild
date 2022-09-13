const path = require('path');

module.exports = {
  slow: 1,
  require: require.resolve('tsm'),
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  spec: [path.join(__dirname, './src/**/*.{spec,test}.*')],
  file: [path.join(__dirname, './setupMocha.js')],
  timeout: 100000,
};
