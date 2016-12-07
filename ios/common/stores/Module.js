// Module store (Handcar)

var ModuleConstants = require('../constants/Module');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var credentials = require('../credentials');
var HandcarFetch = require('fbw-utils')(credentials).handcarFetch;

var ActionTypes = ModuleConstants.ActionTypes;
var BankMap = ModuleConstants.BankMap;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;
var GenusTypes = ModuleConstants.GenusTypes;

var GuessDepartmentCode = require('../../utilities/department/guessDepartmentCode');
var UserStore = require('./User');

var _modules = [];
var _outcomes = {};

var ModuleStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT, _modules);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAllModules: function () {
    var _this = this,
      departments = ['accounting', 'algebra', 'cad'],
      departmentPromises = [];
    _modules = [];
    _outcomes = {};
    _.each(departments, (department) => {
      var params = {
          path: '/learning/objectivebanks/' + BankMap[department] + '/objectives/roots?descendentlevels=2'
        };
      departmentPromises.push(HandcarFetch(params));
    });
    Q.all(departmentPromises)
      .then((res) => {
        let dataPromises = [];
        _.each(res, (data) => {
          dataPromises.push(data.json());
        });
        return Q.all(dataPromises);
      })
      .then((data) => {
        _.each(data, (datum) => {
          _modules = _modules.concat(datum);
          _.each(datum, (module) => {
            _.each(module.childNodes, (outcome) => {
              _outcomes[outcome.id] = outcome;
            });
          });
        });
      })
      .then(() => {
        _this.emitChange();
      })
      .catch((error) => {
        console.log('error getting modules and outcomes');
      })
      .done();
  },
  getModule: function (id) {
    return _.find(_modules, function (module) {
      return module.id == id;
    });
  },
  getOutcome: function (outcomeId) {
    return _outcomes[outcomeId];
  }
});


module.exports = ModuleStore;
