'use strict'

import React, {Component} from 'react'

import {isTarget, filterItemsByTarget, targetKey, directiveIdsFromQuestions} from 'fbw-platform-common/selectors/'

var _ = require('lodash');
import Spinner from 'react-spinner'

import QuestionContainer from 'fbw-platform-common/containers/QuestionContainer'
import QuestionComponent from './question-card/QuestionCard'
const QuestionCard = QuestionContainer(QuestionComponent)

var AnsweredQuestionCard = require('./question-card/AnsweredQuestionCard');
var AnsweredQuestionCue = require('./answered-question-cue/AnsweredQuestionCue');
var ShowAnswerPrompt = require('./show-answer/ShowAnswerPrompt');
var ShowAnswer = require('./show-answer/ShowAnswer');

import './Questions.scss'
var BASE_STYLES = require('fbw-platform-common/styles/base-styles');

class Questions extends Component {
  renderListRow = (questionItem, sectionId, rowId) => {

    let outcome = _.find(this.props.outcomes, {id: questionItem.learningObjectiveIds[0]});

    // console.log('row', rowId, 'total length', this.props.questions.length, 'questions', this.props.questions);

    if (questionItem.responded) {
      // let hasNextQuestion = (questionItem !== _.last(this.props.questions));
      let nextQuestion = this.props.questions[parseInt(sectionId)+1];

      let nextOutcome;
      if (nextQuestion && questionItem.response.isCorrect) {
        nextOutcome = _.find(this.props.outcomes, {id: nextQuestion.learningObjectiveIds[0]});

      } else if (nextQuestion && questionItem.response.confusedLearningObjectiveIds && !questionItem.response.isCorrect){
        nextOutcome = _.find(this.props.outcomes, {id: questionItem.response.confusedLearningObjectiveIds[0]});
      }

      // if (!nextOutcome) {
      //   console.log('questionItem', questionItem);
      //   console.log('nextQuestion', nextQuestion);
      // }

      // AnsweredQuestionCard should be expanded if: 1) it's the only item in the list or 2) it's the last responded item
      let isExpanded = false;
      if (!nextQuestion || !nextQuestion.responded) {
        isExpanded = true;
      }

      return (
        <li key={questionItem.id} className="questions-list__item">
          <div className="medium-8 medium-centered large-6 large-centered columns">
            <AnsweredQuestionCard question={questionItem} outcome={outcome} isExpanded={isExpanded}/>
          </div>

          <AnsweredQuestionCue isLastTarget={this.props.isLastTarget}
                               response={questionItem.response}
                               outcome = {outcome}
                               nextQuestion={nextQuestion}
                               nextOutcome={nextOutcome}/>
        </li>
      )

    } else {

      return (
        <div key={sectionId} className="medium-8 medium-centered large-6 large-centered columns">
          <QuestionCard question={questionItem} username={this.props.username}
                        />
        </div>
       )
    }
  }

  render() {
    if (!this.props.questions) {
      return null;
    }

    // console.log('will render questions', this.props.questions);
    let inProgressIndicator;
    if (this.props.isInProgressSubmitChoice) {
      inProgressIndicator = (
        <div className="text-center">
          <p>Please wait while we check your answer...</p>
          <Spinner />
        </div>);
    }


    let infiniteTimelineHeight = {
      height: this.props.questionListHeight,
    };

    let infiniteTimeline = (<div></div>);

    return (
      <div className="questions">
        {infiniteTimeline}
        <ul className="questions-list">
          {_.map(this.props.questions, this.renderListRow)}
        </ul>

        {inProgressIndicator}
      </div>
    )
  }
}

export default Questions
