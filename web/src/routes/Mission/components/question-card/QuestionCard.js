// QuestionCard.js

'use strict';

import React, { Component, }  from 'react';
import $ from 'jquery'
import { isTarget, checkMissionStatus } from 'fbw-platform-common/selectors';

var _ = require('lodash');

import ChoicesContainer from 'fbw-platform-common/containers/ChoicesContainer'
import ChoicesComponent from '../choice/Choices'
const Choices = ChoicesContainer(ChoicesComponent)

const QuestionHeader = require('./QuestionHeader');

var styles = require('./QuestionCard.styles');
import './QuestionCard.scss';


class QuestionCard extends Component {
  componentDidMount() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    if (this.activeSubmitButton) {
      this.activeSubmitButton.focus()
    }
  }

  render() {
    let submitButtonText;
    if (!this.props.isInProgressSubmitChoice) {
      submitButtonText = 'Submit';

    } else {
      submitButtonText = 'Working...';
    }
    let missionStatus = checkMissionStatus(this.props.mission)
    let submitButton;
    if (missionStatus !== "over") {
      if (!this.props.selectedChoiceId) {
        submitButton = (
          <button disabled
                  onClick={() => this._onSubmitChoice(this.props.selectedChoiceId, this.props.question.id)}
                  className="submit-button is-disabled">
                  {submitButtonText}
          </button>);

      } else if (missionStatus === 'pending' && !this.props.isInProgressSubmitChoice) {
        submitButton = (<button onClick={() => this._onSubmitChoice(this.props.selectedChoiceId, this.props.question.id)}
                                className="submit-button"
                                ref={(btn) => this.activeSubmitButton = btn}>
              {submitButtonText}
        </button>);
      }
    }

    // console.log('question', this.props.question)

    let inProgressIndicator;
    if (this.props.isInProgressShowAnswer) {
      if (isTarget(this.props.question)) {
        inProgressIndicator = (<div style={styles.inProgressIndicator}>
          <p style={_.assign({}, styles.inProgressIndicatorText, this._getTextProgressStyles())}
            onLayout={this._onProgressTextLayout}>
            Fetching the answer...you can no longer get points on this Target.
          </p>
        </div>)
      } else {
        inProgressIndicator = (
          <div style={styles.inProgressIndicator}>
            <p style={_.assign({}, styles.inProgressIndicatorText, this._getTextProgressStyles())}>
              Fetching the answer...
            </p>
          </div>
        )
      }
    }

    let questionTypeIcon;
    if (isTarget(this.props.question)) {
      questionTypeIcon = <img className="question-type-icon" src={require('fbw-platform-common/assets/target-icon@2x.png')} />
    } else {
      questionTypeIcon = <img className="question-type-icon" src={require('fbw-platform-common/assets/waypoint-icon@2x.png')} />
    }

    return (
    <div className="question-card clearfix">
      <QuestionHeader questionTypeIcon={questionTypeIcon}
                      headerText={this.props.outcome ? this.props.outcome.displayName.text : ''}
                      onShowAnswer={() => this._onShowAnswer(this.props.question)}
                      isExpandable={false}
      />

      {inProgressIndicator}

      <div className="question-card__body clearfix">
        <div dangerouslySetInnerHTML={{__html: this.props.question.text.text}}></div>

        <Choices question={this.props.question}
          grabFocus={true} />
      </div>

      {submitButton}
    </div>
    )
  }

  _onSubmitChoice = (choiceId, questionId) => {
    if (!this.props.isInProgressSubmitChoice) {
      $('html, body').animate({
        scrollTop: $("body")[0].scrollHeight - 30
      }, 1000);

      this.props.onSubmitResponse({
        choiceId: choiceId,
        questionId: questionId,
        section: this.props.section,
        username: this.props.username
      });
    }
  }

  _onShowAnswer = (questionItem) => {
    if (!this.props.isInProgressShowAnswer) {
      this.props.onShowAnswer({
        questionId: this.props.question.id,
        section: this.props.section
      });
    }
  }

}

module.exports = QuestionCard;
