const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
const transformAssets = require('babel-plugin-transform-assets');
// const EmptyModule = require('./EmptyModule')

module.exports = {
  process(src, filename) {
    if (filename.match(/\.(css|less|scss|jpg|png)/)) {
      console.log(filename, 'matches an asset')
      return '';
      // return EmptyModule;
    }

    if (babel.util.canCompile(filename)) {
      console.log('can compile', filename);

      return babel.transform(src, {
        filename,
        presets: [jestPreset],
        plugins: [
          [require.resolve('babel-plugin-transform-assets'), {
              extensions: ['png', '.jpg'],
              name: '[name].[ext]?[sha512:hash:base64:7]',
          }],

        ],
        retainLines: true,
      }).code;
    }
    return src;
  },
};

// "modulePathIgnorePatterns": [
//   "\\.*jpg"
// ],
// "moduleNameMapper": {
//   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)": "EmptyModule",
//   "\\.(css|less|scss)": "EmptyModule"
// },
// "moduleFileExtensions": [
//   "js",
//   "json",
//   "jsx"
// ]
