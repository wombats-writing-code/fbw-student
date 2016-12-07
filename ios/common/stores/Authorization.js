// Authorization store

import {
  Actions
} from 'react-native-router-flux';

var AuthorizationDispatcher = require('../dispatchers/Authorization');
var AuthorizationConstants = require('../constants/Authorization');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var credentials = require('../credentials');
var fbwUtils = require('fbw-utils')(credentials);

var ConvertDate2Dict = fbwUtils.ConvertDateToDictionary;
var qbankFetch = fbwUtils.qbankFetch;

var BaseBanks = AuthorizationConstants.BaseBanks;
var StudentAuthorizationFunctions = AuthorizationConstants.StudentAuthorizationFunctions;

var store = require('react-native-simple-store');

var _data = {};

var AuthorizationStore = _.assign({}, EventEmitter.prototype, {
  hasAuthorizations: function (data, callback) {
    // data should include username and the schoolId (acc or qcc)
    var url = 'assessment/banks/' + credentials.qbank.SchoolNodes[data.schoolId] + '/assessments/cantake',
      params = {
        path: url,
        proxy: data.username
      };
    Q(qbankFetch(params))
      .then((res) => {
        if (res.status == 403) {
          Q.reject();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        callback(data.canTake);
      })
      .catch((error) => {
        console.log('no authz');
        callback(false);
      })
      .done();
  },
  setAuthorizations: function (data, callback) {
    // data should include username and the schoolId (acc or qcc)
    var qualifierIds = BaseBanks,
      now = new Date(),
      endDate = ConvertDate2Dict(now),
      params = {
      data: {
        bulk: []
      },
      method: 'POST',
      path: 'authorization/authorizations'
    };

    endDate.month = endDate.month + 6;

    if (endDate.month > 12) {
      endDate.month = endDate.month - 12;
      endDate.year++;
    }

    if (endDate.month == 2 && endDate.day > 28) {
      endDate.day = 28;
    }

    if ([4, 6, 9, 11].indexOf(endDate.month) >= 0 && endDate.day == 31) {
      endDate.day = 30;
    }

    // change this so students can only TAKE on the sharedBankId
    //   for the selected class -- take out the schoolNodeId
    //   and instead test for bankId property on data.
    // So, if bankId is passed in, only add the functions to the given
    //   qualifier. Otherwise add them to the base qualifiers in constants.
    if (data.bankId) {
      qualifierIds = [data.bankId];
    }

    _.each(qualifierIds, function (qualifierId) {
      _.each(StudentAuthorizationFunctions, function (functionId) {
        params.data.bulk.push({
          agentId: data.username,
          endDate: endDate,
          functionId: functionId,
          qualifierId: qualifierId
        });
      });
    });
    Q(qbankFetch(params))
      .then((res) => {
        if (res.status == 403) {
          Q.reject();
        } else {
          console.log('returned from set authz call');
          console.log(res);
          callback();
        }
      })
      .catch((error) => {
        console.log('error creating authz');
        console.log(error);
        store.delete('username');
        //Actions.push(Actions.loading); it would be nice to do something like this ...
        Actions.error({message: 'Error creating your user in qbank.'})
      })
      .done();
  },
  setAuthorizationsPromise: function (data) {
    // slightly redundant, should be cleaned up
    // same as above, except returns a promise, not using callback
    // and only does it for the given bankId.
    // data should include username and the schoolId (acc or qcc)
    var qualifierIds = [data.bankId],
      now = new Date(),
      endDate = ConvertDate2Dict(now),
      params = {
      data: {
        bulk: []
      },
      method: 'POST',
      path: 'authorization/authorizations'
    };

    endDate.month = endDate.month + 6;

    if (endDate.month > 12) {
      endDate.month = endDate.month - 12;
      endDate.year++;
    }

    if (endDate.month == 2 && endDate.day > 28) {
      endDate.day = 28;
    }

    if ([4, 6, 9, 11].indexOf(endDate.month) >= 0 && endDate.day == 31) {
      endDate.day = 30;
    }
    return store.get('username')
    .then((username) => {
      _.each(qualifierIds, function (qualifierId) {
        _.each(StudentAuthorizationFunctions, function (functionId) {
          params.data.bulk.push({
            agentId: data.username,
            endDate: endDate,
            functionId: functionId,
            qualifierId: qualifierId
          });
        });
      });

      return qbankFetch(params)
    })
    .then((res) => {
      if (res.status == 403) {
        Q.reject();
      } else {
        return Q.when('done with authz')
      }
    })
  }
});

AuthorizationStore.dispatchToken = AuthorizationDispatcher.register(function (action) {
    switch(action.type) {
        case ActionTypes.SET_AUTHORIZATIONS:
            AuthorizationStore.setAuthorizations(action.content);
            break;
    }
});

module.exports = AuthorizationStore;
