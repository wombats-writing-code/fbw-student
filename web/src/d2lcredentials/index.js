
let devCredentials = require('./_dev.credentials');
let prodCredentials = require('./_prod.credentials');

if (location.host === 'fbw-student.mit.edu') {
  // console.log('prod credentials')
  module.exports = prodCredentials;
} else {
  // console.log('dev credentials')
  module.exports = devCredentials;
}
