// guessDepartmentCode.js
// Given a D2L department name, guess which FbW department it falls into
'use strict';

var GuessDepartmentCode = function (departmentName) {
  var departmentCode = 'algebra';
  departmentName = departmentName.toLowerCase();
  if (departmentName.indexOf('sandbox') >= 0 ||
      departmentName.indexOf('algebra') >= 0 ||
      departmentName.indexOf('math') >= 0 ||
      departmentName.indexOf('mat') >= 0) {
    departmentCode = 'algebra';
  } else if (departmentName.indexOf('accounting') >= 0 ||
      departmentName.indexOf('acc') >= 0) {
    departmentCode = 'accounting';
  } else if (departmentName.indexOf('computer') >= 0 ||
      departmentName.indexOf('drafting') >= 0 ||
      departmentName.indexOf('aided') >= 0 ||
      departmentName.indexOf('cad') >= 0 ||
      departmentName.indexOf('design') >= 0) {
    departmentCode = 'cad';
  }

  return departmentCode;
};

module.exports = GuessDepartmentCode;
