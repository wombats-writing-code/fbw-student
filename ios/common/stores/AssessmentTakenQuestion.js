// assessment taken question store

var AssessmentTakenQuestionDispatcher = require('../dispatchers/AssessmentTakenQuestion');
var AssessmentTakenQuestionConstants = require('../constants/AssessmentTakenQuestion');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Q = require('q');

var credentials = require('../credentials');
var fbwUtils = require('fbw-utils')(credentials);

var qbankFetch = fbwUtils.qbankFetch;

var ActionTypes = AssessmentTakenQuestionConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;
var AnswerTypes = AssessmentTakenQuestionConstants.AnswerGenusTypes;
var UserStore = require('../stores/User');

import {
  isTarget,
  targetKey,
  filterItemsByTarget,
  targetStatus
} from '../selectors/selectors'

var _assessmentSections = [];
var response_counter = 0;

function convertImagePaths (itemObject) {
  // TODO: move this into fbw-utils?
  // Grabs the 302 CloudFront URL from the QBank one and replaces it in the
  // question / choice / feedback text.
  var itemString = JSON.stringify(itemObject),
    mc3RegEx = /https:\/\/mc3.mit.edu\/fbw-author.*?\/url/g,
    matches = itemString.match(mc3RegEx),
    numMatches = matches != null ? matches.length : 0,
    cloudFrontPromises = [],
    originalURLs = [];

  while (match = mc3RegEx.exec(itemString)) {
    let mc3URL = match[0],
      params = {
        path: mc3URL.replace('https://mc3.mit.edu/fbw-author/api/v2/', '')
      };
    originalURLs.push(mc3URL);
    cloudFrontPromises.push(qbankFetch(params));
  }

  if (cloudFrontPromises.length > 0) {
    // use the error callback -- fetch will automagically redirect to the
    // CloudFront URL, and then 502 error out -- from that error response,
    // we can get the CF URL and replace that in the itemString, so
    // the WebViews render images.
    return Q.all(cloudFrontPromises)
      .then((res) => {  // each res should be status code 403 from CloudFront
        _.each(res, (cf403, index) => {
          let cfURL = cf403.url,
            mc3URL = originalURLs[index];
          itemString = itemString.replace(mc3URL, cfURL);
        });
        return JSON.parse(itemString);
      })
      .catch((error) => {
        console.log('error getting cloudfront urls!');
      });
  } else {
    return JSON.parse(itemString);
  }
}

/*
this method takes an answer response like
{
  confusedLearningObjectiveIds: ['foo'],
  isCorrect: false/true,
  feedback: {
    text: 'foo'
  },
  nextQuestion: null or {Question -- can be target or waypoint},
}

or a surrender response like {
  feedback: {text: 'foo'},
  isCorrect: false/true,
  nextQuestion: null or {Question}
}

and 1) modifies the response / correct state of the current question in
       this.state.questionsData
    2) if nextQuestion && nextQuestion == waypoint,
       appends a new question to the right list in this.state.questionsData
    3) if this.state.currentQuestion is a target, update this.state.currentTarget
    4) if nextQuestion == waypoint,
       update this.state.currentQuestion to the nextQuestion,
 **/
function updateAssessmentSectionsWithResponse(questionId, response) {

  // have to update the response confusedLearningObjectiveIds
  // attribute and choiceIds, otherwise newly injected waypoint
  // questions will error out when you try to expand them.

  // create a new array by 'updating' its nested properties with new properties
  let submittedQuestion;        // we need this for later
  _assessmentSections = _.map(_assessmentSections, (section) => {
    if (_.find(section.questions, {id: questionId})) {
      let routeFinished = false;
      let updatedSection = _.assign({}, section, {
        questions: _.map(section.questions, (question, idx) => {

          // first we find the question that was just submitted (that generated this response)
          if (question.id === questionId) {
            submittedQuestion = question;

            return _.assign({}, question, {
              responded: true,
              isCorrect: response.isCorrect,
              response: response
            });
          }

          return question;
        })
      });

      // we already have Target questions in our list, so we ignore them and only add Waypoints
      if (response.nextQuestion && !isTarget(response.nextQuestion)) {
        updatedSection.questions.push(response.nextQuestion);
      } else if (isTarget(response.nextQuestion)) {
        // this one route is finished
        routeFinished = true;
      } else if (!response.nextQuestion) {
        // means you hit the end of the route / last target
        routeFinished = true;
        //console.log('no next question', response);
      }

      // if there is a next question, but it's a target, we know the user has done the scaffold
      // or, it might be the last target in the directive, so we need to
      // also check for that
      if (submittedQuestion) {
        // console.log('next question is target', submittedQuestion);

        //  we find the Target question to which this question belongs
        let key = targetKey(submittedQuestion);
        let target = _.find(_.filter(updatedSection.questions, isTarget), (question) => {
          return targetKey(question) === key;
        });

        // and update the updated section to set a hasNavigated = Boolean flag on it
        // only set this flag if the route has been navigated, i.e. the last
        // question in the route has been responded to
        updatedSection.questions = _.map(updatedSection.questions, (question, index) => {
          console.log('route finished?', routeFinished)
          if (question.id === target.id && routeFinished) {
            // console.log('found target question', question)
            return _.assign({}, question, {
              hasNavigated: true
            });
          }
          // console.log('key', key, 'updatedSection', updatedSection, 'target', target);

          return question;
        });
      }


      return updatedSection;
    }

    return section;
  });

}

var AssessmentTakenQuestionStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT, _assessmentSections);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getQuestion: function (id) {
    return _.find(_assessmentSections, function (question) {
      return question.id == id;
    });
  },
  getQuestions: function (data) {
    var _this = this;
    UserStore.getUsername()
      .then((username) => {
        var params = {
            path: 'assessment/banks/' + data.bankId + '/assessmentstaken/' + data.takenId + '/questions?raw',
            proxy: username
          };

        return qbankFetch(params);
      })
      .then((res) => {
        return res.json();
      })
      .then((questionsData) => {
        return convertImagePaths(questionsData);
      })
      .then((newData) => {
        // here let's inject the information about each target, to see
        // if that target question's route has finished navigating.
        // Similar to what's being done in updateAssessmentSectionsWithResponse()
        _assessmentSections = newData;

        _.each(_assessmentSections, (section) => {
          let sortedItems = filterItemsByTarget(section.questions);
          let targetsNavigatedInSection = [];
          _.each(sortedItems, (questionsList, targetKey) => {
            // Now go through each of the non-pristine target questions and figure out
            //   if the route has been finished.
            // If the route ends in an unanswered question, route not finished.
            // If the route ends in a wrong response, route not finished.
            // Route only finished if the last question isCorrect.
            if (targetStatus(questionsList[0]) !== 'PRISTINE') {
              let lastRouteQuestion = questionsList[questionsList.length - 1];
              if (lastRouteQuestion.responded && lastRouteQuestion.isCorrect) {
                targetsNavigatedInSection.push(questionsList[0].id);
              }
            }
          });
          _.each(section.questions, (question) => {
            if (targetsNavigatedInSection.indexOf(question.id) >= 0) {
              question.hasNavigated = true;
            }
          })
        });

        _this.emitChange();
      })
      .catch((error) => {
        console.log('error in getting questions');
      })
      .done();
  },
  getWorkedSolution: function (data) {
    UserStore.getUsername()
      .then((username) => {
        var params = {
            method: 'POST',
            path: `assessment/banks/${data.bankId}/assessmentstaken/${data.takenId}/questions/${data.questionId}/surrender`,
            proxy: username
        };

        return qbankFetch(params);
      })
      .then( (res) => {
        return res.json();
      })
      .then((solutionData) => {
        //console.log('solution data', solutionData);
        return convertImagePaths(solutionData);
      })
      .then((cleanSolutionData) => {
        updateAssessmentSectionsWithResponse(data.questionId, cleanSolutionData);

        this.emitChange();
      })
      .catch((error) => {
        console.error(error);
      })
      .done();

  },
  submitAnswer: function (data) {
    let now = new Date();
    response_counter++;
    console.log(`Submitting response ${response_counter} ${now.getTime()}`);
    UserStore.getUsername()
      .then((username) => {
        var params = {
            data: data,
            method: 'POST',
            path: `assessment/banks/${data.bankId}/assessmentstaken/${data.takenId}/questions/${data.questionId}/submit`,
            proxy: username
        };

        return qbankFetch(params);
      })
      .then((res) => {
        return res.json();
      })
      .then((answerResponse) => {

        answerResponse.choiceIds = data.choiceIds;

        return convertImagePaths(answerResponse);
      })
      .then((cleanAnswerResponse) => {
        //console.log('answerResponse', answerResponse);
        updateAssessmentSectionsWithResponse(data.questionId, cleanAnswerResponse);
        let now = new Date();
        console.log(`Got response ${now.getTime()}`);

        this.emitChange();
      })
      .catch((error) => {
        console.log('error submitting answer');
      })
      .done();
  }
});

AssessmentTakenQuestionStore.dispatchToken = AssessmentTakenQuestionDispatcher.register(function (action) {
    switch(action.type) {
      case ActionTypes.GET_QUESTIONS:
        AssessmentTakenQuestionStore.getQuestions(action.content);
        break;
      case ActionTypes.SUBMIT_ANSWER:
        AssessmentTakenQuestionStore.submitAnswer(action.content);
        break;
    }
});

module.exports = AssessmentTakenQuestionStore;
