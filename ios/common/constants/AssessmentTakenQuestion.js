// assessment taken question constants

var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    CHANGE_EVENT: null,
    GET_QUESTIONS: null,
    SUBMIT_ANSWER: null
  }),
  Alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
  AnswerTypes: {
    MC: 'answer-record-type%3Amulti-choice-with-files-and-feedback%40ODL.MIT.EDU'
  },
  AnswerGenusTypes: {
    RIGHT: 'answer-type%3Aright-answer%40ODL.MIT.EDU',
    WRONG: 'answer-type%3Awrong-answer%40ODL.MIT.EDU'
  }
};
