// user store
// saves state for the given user
// use react-native-store to save these in the device
import {
  Actions
} from "react-native-router-flux";

var credentials = require('../credentials');

var UserDispatcher = require('../dispatchers/User');
var UserConstants = require('../constants/User');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var store = require('react-native-simple-store');

var AuthorizationStore = require('./Authorization');
var D2LMiddlware = require('../middleware/D2L.js');
var HardcodedMiddlware = require('../middleware/Hardcoded.js');

var ActionTypes = UserConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;

var D2LLOGIN = credentials.login == 'd2l';


var UserStore = _.assign({}, EventEmitter.prototype, {
  clearUserContext: function (callback) {
    store.get('school')
      .then(function (school) {
        if (school === 'acc') {
          D2LMiddlware.clearUserContext();
        }
        callback();
      });
  },
  enrollments: function (callback) {
    store.get('school')
      .then(function (school) {
        if (school === 'acc') {
          if (D2LLOGIN) {
            D2LMiddlware.enrollments(callback);
          } else {
            console.log('getting hardcoded enrollments');
            HardcodedMiddlware.enrollments(callback);
          }
        }
      });
  },
  getBankId: function () {
    return store.get('username')
      .then((username) => {
        return store.get(`${username}-bankId`);
      });
  },
  getDepartment: function () {
    return store.get('username')
      .then((username) => {
        return store.get(`${username}-department`);
      });
  },
  getLastActiveDirective: function (missionId) {
    return store.get('username')
      .then((username) => {
        return store.get(`${username}-inProgressDirective-${missionId}`);
      });
  },
  getLastActiveTarget: function (sectionId, missionId) {
    return store.get('username')
      .then((username) => {
        return store.get(`${username}-inProgressTarget-${sectionId}-${missionId}`);
      });
  },
  getLMSCourseId: function () {
    return store.get('lmsCourseId');
  },
  getLMSUserId: function () {
    return store.get('lmsUserId');
  },
  getSchool: function () {
    return store.get('school');
  },
  getUsername: function () {
    return store.get('username');
  },
  hasSession: function (callback) {
    store.get('school')
      .then(function (school) {
        if (school === 'qcc') {
          store.delete('school');
          Actions.login();
        } else {
          if (D2LLOGIN) {
            D2LMiddlware.hasSession((hasSession) => {
              if (hasSession) {
                callback(hasSession);
              } else {
                UserStore.clearUserContext(() => {
                  callback(false);
                });
              }
            });
          } else {
            HardcodedMiddlware.hasSession((hasSession) => {
              callback(hasSession);
            });
          }
        }
    });
  },
  logout: function () {
    store.delete('username');
    store.delete('bankId');
    store.delete('department');
    // no way to get the inProgress data yet ... but every
    // student should have different sectionId's

    Actions.loading();
  },
  setAuthenticationUrlD2L: function (d2lURL) {
    D2LMiddlware.setAuthenticationUrl(d2lURL);
  },
  setBankId: function (bankId) {
    store.get('username')
      .then((username) => {
        store.save(`${username}-bankId`, bankId);
      });
  },
  setDepartment: function (department) {
    store.get('username')
      .then((username) => {
        store.save(`${username}-department`, department);
      });
  },
  setLastActiveDirective: function (sectionId, missionId) {
    store.get('username')
      .then((username) => {
        store.save(`${username}-inProgressDirective-${missionId}`, sectionId);
      });
  },
  setLastActiveTarget: function (targetKey, sectionId, missionId) {
    store.get('username')
      .then((username) => {
        store.save(`${username}-inProgressTarget-${sectionId}-${missionId}`, targetKey);
      });
  },
  setLMSCourseId: function (courseId) {
    store.save('lmsCourseId', courseId);
  },
  setLMSUserId: function (userId) {
    store.save('lmsUserId', userId);
  },
  setSchool: function (school) {
    store.save('school', school);
  },
  setUsername: function (callback) {
    store.get('school')
      .then(function (school) {
        if (school === 'acc') {
          D2LMiddlware.whoAmI(function (user) {
            var username = user.UniqueName.indexOf('@') >= 0 ? user.UniqueName : `${user.UniqueName}@acc.edu`;

            store.save('username', username)
              .then(function () {
                // also create the QBank authorizations here
                var payload = {
                  schoolId: school,
                  username: username
                };

                AuthorizationStore.hasAuthorizations(payload,
                  function (hasAuthz) {
                    if (hasAuthz) {
                      callback();
                    } else {
                      console.log('initializing qbank');
                      Actions.initializeQbank(
                        {
                          payload: payload,
                          callback: callback
                        });
                    }
                });
              });
          });
        }
      });
  },
  setUsernameSimple: function (username, callback) {
    store.get('school')
      .then(function (school) {
        if (school === 'acc') {
          username = username.indexOf('@') >= 0 ? username : `${username}@acc.edu`;

          store.save('username', username)
            .then(function () {
              // also create the QBank authorizations here
              var payload = {
                schoolId: school,
                username: username
              };

              AuthorizationStore.hasAuthorizations(payload,
                function (hasAuthz) {
                  if (hasAuthz) {
                    callback();
                  } else {
                    console.log('initializing qbank');
                    Actions.initializeQbank(
                      {
                        payload: payload,
                        callback: callback
                      });
                  }
              });
            });
        }
      });
  }
});

UserStore.dispatchToken = UserDispatcher.register(function (action) {
  switch(action.type) {
    case ActionTypes.BANK_SELECTED:
      UserStore.setBankId(action.content);
      break;
  }
});

module.exports = UserStore;
