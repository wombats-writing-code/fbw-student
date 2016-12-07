// assessment store

var AssessmentDispatcher = require('../dispatchers/Assessment');
var AssessmentConstants = require('../constants/Assessment');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var credentials = require('../credentials');
var fbwUtils = require('fbw-utils')(credentials);

var qbankFetch = fbwUtils.qbankFetch;
var QBankSchool2BankMap = credentials.qbank.SchoolNodes;

var ActionTypes = AssessmentConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;
var UserStore = require('./User');

var _assessments = [];

var AssessmentStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT, _assessments);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAssessment: function (id) {
    return _.find(_assessments, function (assessment) {
      return assessment.id == id;
    });
  },
  getAssessments: function (bankIds) {
    var _this = this,
      numObjects = bankIds.length,
      assessmentPromises = [],
      finalAssessments = [];
    _.each(bankIds, function (bankId) {
      var params = {
        path: 'assessment/banks/' + bankId + '/assessments?raw'
      };
      assessmentPromises.push(qbankFetch(params));
    });

    Q.all(assessmentPromises)
      .then((res) => {
        return Q.all(_.map(res, (data) => {
          if (data.status == 200) {
            return data.json();
          }
        }));
      })
      .then((data) => {
        let assessments = [];
        _.each(data, (datum) => {
          if (typeof datum !== "undefined") {
            assessments = assessments.concat(datum);
          }
        })
        if (assessments.length > 0) {
          let assessmentPromises = [];
          _assessments = assessments;
          _.each(assessments, function (assessment) {
            let assessmentParams = {
              path: 'assessment/banks/' + assessment.bankId + '/assessments/' + assessment.id + '/assessmentsoffered?raw'
            };
            assessmentPromises.push(qbankFetch(assessmentParams));
          });
          return Q.all(assessmentPromises);
        } else {
          _assessments = [];
          Q.reject('done');
        }
      })
      .then((res) => {
        let dataPromises = [];
        _.each(res, (data) => {
          dataPromises.push(data.json());
        });
        return Q.all(dataPromises);
      })
      .then((data) => {
        _.each(_assessments, (_assessment, index) => {
          _assessment.startTime = data[index][0].startTime;
          _assessment.deadline = data[index][0].deadline;
          _assessment.assessmentOfferedId = data[index][0].id;
        });
        _this.emitChange();
      })
      .then(null, (err) => {
        if (err == 'done') {
          _this.emitChange();
        }
      })
      .catch((error) => {
        console.log('error getting missions');
      })
      .done();
  },
  getResults: function (data) {
    var _this = this;
    UserStore.getUsername()
      .then((username) => {
        var params = {
            path: `assessment/banks/${data.bankId}/assessmentsoffered/${data.assessmentOfferedId}/results?raw&agentId=${username}`
          };
        return qbankFetch(params);
      })
      .then((res) => {
        return res.json();
      })
      .then((resultsData) => {
        if (_.keys(resultsData).indexOf('id') >= 0) {
          data.callback(resultsData);
        } else {
          return Q.reject()
        }
      })
      .catch((error) => {
        console.log(`error getting assessment results`);
        console.log(error);
        data.callback(false)
      })
      .done();
  },
});

AssessmentStore.dispatchToken = AssessmentDispatcher.register(function (action) {
    switch(action.type) {
    }
});

module.exports = AssessmentStore;
