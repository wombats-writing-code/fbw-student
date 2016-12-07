// subject offering constants

var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror({
        CHANGE_EVENT: null,
    }),
    GenusTypes: {
      SUBJECT: "assessment-bank-genus%3Afbw-subject%40ODL.MIT.EDU",
      TERM: "assessment-bank-genus%3Afbw-term%40ODL.MIT.EDU"
    }
};