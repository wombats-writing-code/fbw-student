// Middleware for hardcoded banks ... i.e. without an LMS and with SimpleLogin
var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');
var Q = require('q');
var store = require('react-native-simple-store');

let AuthorizationStore = require('../stores/Authorization')

var credentials = require('../credentials');
var fbwUtils = require('fbw-utils')(credentials);
var qbankFetch = fbwUtils.qbankFetch;

function privateBankAlias(termBankId, username) {
  // should return something like "private-bank%3A1234567890abcdef12345678-S12345678.acc.edu%40ODL.MIT.EDU"
  if (termBankId.indexOf('@') >= 0) {
    termBankId = encodeURIComponent(termBankId)
  }
  return `private-bank%3A${termBankId.match(/%3A(.*)%40/)[1]}-${username.replace('@', '.')}%40ODL.MIT.EDU`
}
function sharedBankAlias(termBankId) {
  // should return something like "shared-bank%3A1234567890abcdef12345678%40ODL.MIT.EDU"
  if (termBankId.indexOf('@') >= 0) {
    termBankId = encodeURIComponent(termBankId)
  }
  return `shared-bank%3A${termBankId.match(/%3A(.*)%40/)[1]}%40ODL.MIT.EDU`
}

let SHARED_MISSIONS_GENUS = "assessment-bank-genus%3Afbw-shared-missions%40ODL.MIT.EDU";
let PRIVATE_MISSIONS_GENUS = "assessment-bank-genus%3Afbw-private-missions%40ODL.MIT.EDU"

function linkPrivateBanksIntoTerm(privateBankIds, termBankId) {
  // append the private bankIds
  let createChildrenOptions = {
      method: 'POST',
      path: `assessment/hierarchies/nodes/${termBankId}/children`,
      data: {
        ids: privateBankIds
      }
    }

  return qbankFetch(createChildrenOptions)
  .then( function (updatedChildren) {
    // now add the shared bank as a child of the private bank
    return getSharedBankId(termBankId)
  })
  .then( function (sharedBankId) {
    let promises = []
    _.each(privateBankIds, function (privateBankId) {
      let addSharedBankToPrivateBankOptions = {
        method: 'POST',
        path: `assessment/hierarchies/nodes/${privateBankId}/children`,
        data: {
          ids: [sharedBankId]
        }
      }
      promises.push(qbankFetch(addSharedBankToPrivateBankOptions))
    })
    return Q.all(promises)
  })
}

function createSharedBank(bankId) {
  // create the shared mission bank with alias
  let createSharedBankOptions = {
    method: 'POST',
    path: 'assessment/banks',
    data: {
      name: 'Shared missions bank',
      description: `For all students in a class: ${bankId}`,
      genusTypeId: SHARED_MISSIONS_GENUS,
      aliasId: sharedBankAlias(bankId)
    }
  };

  return qbankFetch(createSharedBankOptions)
  .then((res) => {return res.json()})
  .then( function (newBank) {
    return Q.when(newBank)
  })
}

function linkSharedBankToTerm(sharedBankId, termBankId) {
  // append the shared bankId if it isn't already linked
  let sharedBankOptions = {
    path: `assessment/hierarchies/nodes/${termBankId}/children`
  };

  return qbankFetch(sharedBankOptions)
  .then((res) => {return res.json()})
  .then( (result) => {
    let children = result.data.results
    if (children.length == 0 || !_.find(children, {genusTypeId: SHARED_MISSIONS_GENUS})) {
      let addChildOptions = {
          method: 'POST',
          path: `assessment/hierarchies/nodes/${termBankId}/children`,
          data: {
            ids: [sharedBankId]
          }
        };
      return qbankFetch(addChildOptions)
    } else {
      return Q.when('shared bank is already a child')
    }
  })
  .then( function (result) {
    return Q.when('done')
  })
}

// utility method to get the sharedBankId for CRUD on shared missions...
function getSharedBankId(bankId) {
  let getSharedBankOptions = {
    path: `assessment/banks/${sharedBankAlias(bankId)}`
  }, sharedBank = {};

  return qbankFetch(getSharedBankOptions)
  .then((res) => {return res.json()})
  .then((result) => {
    sharedBank = result

    // let's now make sure the sharedBank is part of the
    // termBank hierarchy
    return Q.when(linkSharedBankToTerm(sharedBank.id, bankId))
  })
  .then((result) => {
    return Q.when(sharedBank.id)
  })
  .catch((error) => {
    // shared bank may not exist
    return Q.when(createSharedBank(bankId))
    .then((result) => {
      sharedBank = result
      return Q.when(linkSharedBankToTerm(sharedBank.id, bankId))
    })
    .then(() => {
      return Q.when(sharedBank.id)
    })
  })
}

// utility method to get the private bank of a student, or
// to set it up / create the alias / set up the hierarchy / set student authz
//    class term bank
//         |-----Private user banks (aliased per method above)
//         |          |
//         |-----Shared bank
function getPrivateBankId(bankId) {
  // assumption is that the shared bank already exists
  // the private bank may or may not exist
  // this method does NOT link the private bank into the hierarchy
  // we need to do that in bulk to prevent collisions
  let privateBank = {},
    privateBankAliasId,
    username = '';

  return store.get('username')
  .then((storedUsername) => {
    username = storedUsername
    privateBankAliasId = privateBankAlias(bankId, username);
    let privateBankTestOptions = {
        path: `assessment/banks/${privateBankAliasId}`
      };
    return qbankFetch(privateBankTestOptions)
  })
  .then((res) => {return res.json()})
  .then( (bank) => {
    privateBank = bank
    return Q.when(privateBank.id)
  })
  .catch( (error) => {
    // qbank(privateBankTestOptions) might throw a 500 if the private bank
    // doesn't exist -- so let's create the bank!
    // create the private bank and set authz
    let createPrivateBankOptions = {
      method: 'POST',
      path: 'assessment/banks',
      data: {
        name: `Private mission bank for ${username}`,
        description: `${username}'s missions for bank ${bankId}`,
        genusTypeId: PRIVATE_MISSIONS_GENUS,
        aliasId: privateBankAliasId
      }
    };

    return qbankFetch(createPrivateBankOptions)
    .then((res) => {return res.json()})
    .then( function (newBank) {
      privateBank = newBank;
      return Q.when(AuthorizationStore.setAuthorizationsPromise({
        bankId: privateBank.id,
        username: username}))
    })
    .then( function (updatedChildren) {
      return Q.when(privateBank.id)
    })
  })
}

var HardcodedMiddleware = _.assign({}, EventEmitter.prototype, {
  clearUserContext: function () {
    store.delete('authenticationUrlD2L');
  },
  createGrade: function (assessmentName) {
  },
  enrollments: function (callback) {
    if (credentials.hardcodedBanks) {
      let returnData = [], username,
      allPrivateBankIds = [];
      store.get('username')
        .then((storedUsername) => {
          let banksPromises = [];
          username = storedUsername;

          _.each(credentials.hardcodedBanks, (bankId) => {
            let params = {
              path: `assessment/banks/${bankId}`,
              proxy: username
            };
            banksPromises.push(qbankFetch(params));
          });
          return Q.all(banksPromises)
        })
        .then((res) => {
          return Q.all(_.map(res, (oneRes) => {return oneRes.json();}));
        })
        .then((data) => {
          let privateBankPromises = [];
          _.each(data, (datum) => {
            returnData.push({
              description: datum.description.text,
              id: datum.id,
              name: datum.displayName.text
            });

            privateBankPromises.push(getPrivateBankId(datum.id));
          });
          // update this to also get the student's private
          // bankId and set that as the ID...and set "take" authz on that
          // private bankId
          return Q.all(privateBankPromises)
        })
        .then((privateBankIds) => {
          // link private banks
          allPrivateBankIds = privateBankIds
          let promises = []
          _.each(returnData, (termBank, index) => {
            promises.push(linkPrivateBanksIntoTerm([privateBankIds[index]], termBank.id))
          })
          return Q.all(promises)
        })
        .then((results) => {
          console.log('before manipulation', returnData)
          _.each(allPrivateBankIds, (privateBankId, index) => {
            returnData[index].id = privateBankId
          })
          console.log('after manipulation', returnData)
          callback(returnData);
        })
        .catch((error) => {
          console.log('error getting enrollments');
          console.log(error);
        })
        .done();
    }
  },
  hasSession: function (callback) {
    store.get('username')
      .then((username) => {
        if (username !== null) {
          callback(true);
        } else {
          callback(false);
        }
      })
  },
  id: function (id) {
    return id;
  },
  setAuthenticationUrl: function (d2lURL) {
  },
  whoAmI: function (callback) {

  },
  _fetch: function (path, method, data, callback) {
    this._getUserContext(userContext => {
      let authenticatedUrl = userContext.createAuthenticatedUrl(path, method),
        params = {};
      if (method != 'GET') {
        params.method = method;
      }
      if (data !== null) {
        params.body = JSON.stringify(data);
        params.headers = {
          "accept": "application/json",
          "content-type": 'application/json'
        };
      }
      fetch(authenticatedUrl, params)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              callback(data);
            });
          } else {
            response.text().then(function (text) {
              console.log("response text: " + text);
              console.log(response.status);
              callback(false);
            });
          }
        })
        .catch(function (error) {
          console.log(error.message);
          callback(false);
        });
    });
  },
  _getCourseOffering: function (orgUnitId, callback) {
    let offeringUrl = '/d2l/api/lp/1.5/courses/' + orgUnitId;
    this._fetch(offeringUrl, 'GET', null, callback);
  },
  _getOrgUnit: function (orgUnitId, callback) {
    let offeringUrl = '/d2l/api/lp/1.5/orgstructure/' + orgUnitId;
    this._fetch(offeringUrl, 'GET', null, callback);
  },
  _getUserContext: function (callback) {
    store.get('authenticationUrlD2L')
      .then(authenticationUrlD2L => {
        let userContext = AppContext.createUserContext(credentials.d2l.host,
          credentials.d2l.port,
          authenticationUrlD2L
        );
        callback(userContext);
    }).catch(error => {
      callback(false);
    })
  }
});

module.exports = HardcodedMiddleware;
