// Handcar module constants

var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
      CHANGE_EVENT: null,
  }),
  BankMap: {
    //'assessment.Bank%3A57279fc9e7dde086c7fe2102%40bazzim.MIT.EDU': 'mc3-objectivebank%3A2822%40MIT-OEIT',  // fake accounting term -> CAD
    //'assessment.Bank%3A57279fc9e7dde086c7fe2102%40bazzim.MIT.EDU': 'mc3-objectivebank%3A2823%40MIT-OEIT',  // fake accounting term -> MAT
    //'assessment.Bank%3A57279fbce7dde086c7fe20ff%40bazzim.MIT.EDU': 'mc3-objectivebank%3A2815%40MIT-OEIT',  // ACC 1
    //'assessment.Bank%3A57279fb9e7dde086d01b93ef%40bazzim.MIT.EDU': 'mc3-objectivebank%3A2815%40MIT-OEIT',  // MAT 1
    accounting: "mc3-objectivebank%3A2821%40MIT-OEIT",
    algebra: "mc3-objectivebank%3A2823%40MIT-OEIT",
    cad: "mc3-objectivebank%3A2822%40MIT-OEIT"
  },
  GenusTypes: {
  }
};
