// assessment taken store

var AssessmentTakenDispatcher = require('../dispatchers/AssessmentTaken');
var AssessmentTakenConstants = require('../constants/AssessmentTaken');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var credentials = require('../credentials');
var fbwUtils = require('fbw-utils')(credentials);

var qbankFetch = fbwUtils.qbankFetch;

var ActionTypes = AssessmentTakenConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;
var UserStore = require('../stores/User');

var _assessmenttaken = {};

var AssessmentTakenStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT, _assessmenttaken);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  createAssessmentTaken: function (data) {
    var _this = this;
    UserStore.getUsername()
      .then((username) => {
        var params = {
            method: 'POST',
            path: 'assessment/banks/' + data.bankId + '/assessmentsoffered/' + data.offeredId + '/assessmentstaken',
            proxy: username
          };
        qbankFetch(params)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            _assessmenttaken = data;
            _this.emitChange();
          })
          .catch((error) => {
            console.log('error creating assessment taken', error);
          })
          .done();
      });
  }
});

AssessmentTakenStore.dispatchToken = AssessmentTakenDispatcher.register(function (action) {
  switch(action.type) {
    case ActionTypes.CREATE_ASSESSMENT_TAKEN:
      AssessmentTakenStore.createAssessmentTaken(action.content);
      break;
  }
});

module.exports = AssessmentTakenStore;
