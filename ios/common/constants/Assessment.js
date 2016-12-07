// assessment constants

var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror({
        CHANGE_EVENT: null,
    }),
    GenusTypes: {
      HOMEWORK: 'assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU',
      IN_CLASS: 'assessment-genus%3Afbw-in-class-mission%40ODL.MIT.EDU',
      ROOT: "assessment-bank-genus%3Afbw-root%40ODL.MIT.EDU",
      SUBJECT: "assessment-bank-genus%3Afbw-subject%40ODL.MIT.EDU",
      TERM: "assessment-bank-genus%3Afbw-term%40ODL.MIT.EDU"
    }
};