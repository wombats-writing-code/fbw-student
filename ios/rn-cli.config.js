'use strict';
// from https://github.com/facebook/react-native/issues/5467
var path = require('path')
const blacklist = require('react-native/packager/blacklist');

var myBlacklist = [
  /StudentApp\/node_modules\/.+\/node_modules\/fbjs\/.*/,
  /platform-common\/node_modules\/.*/
]

var config = {
  getProjectRoots() {
    return getRoots();
  },

  getAssetRoots() {
    return getRoots();
  },

  getBlacklistRE() {
    return blacklist('', myBlacklist);
  },

};

function getRoots() {
  return [
    __dirname
    // , path.resolve(__dirname, '../')
  ];
}

module.exports = config
