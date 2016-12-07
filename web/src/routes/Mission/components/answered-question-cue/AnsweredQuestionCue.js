
'use strict';

import React, { Component, }  from 'react';

var _ = require('lodash');

import './AnsweredQuestionCue.scss'

class AnsweredQuestionCue extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    // console.log('inRender of AnsweredQuestionCue', this.props.response, 'next question', this.props.nextQuestion);
    var response = this.props.response;

    var cueText;
    if (response.isCorrect) {
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <p className="cue-text">
            <span>Good! Now let's </span>
            <span className="bold">{this.props.nextOutcome.displayName.text}</span>
            <span>.</span>
          </p>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <p className="cue-text">No outcome authored. Notify course authors.</p>

      } else if (!this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <p className="cue-text">Good job! You've reached the end of the route. Please try another Target question.</p>

      } else if (this.props.isLastTarget) {
        cueText = <p className="cue-text">Good job! You've finished all the questions in this directive.</p>
      }

    } else {
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <p className="cue-text">
            <span >Not quite. Looks like you need to work on</span>
            <span className="bold"> {this.props.nextOutcome.displayName.text}</span>
            <span>.</span>
          </p>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = (
          <p className="cue-text">
              <span >Not quite. Let's try to </span>
              <span className="bold">{this.props.outcome.displayName.text}</span>
              <span> again.</span>
          </p>
        )

      } else if (!this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <p >Study the solution carefully and try another Target question.</p>
      }
    }

    if (!this.props.nextQuestion) {
      // console.log('No next question');
    }

    return (
      <div className="answered-question-cue">
        {cueText}
      </div>
    )
  }
}

module.exports = AnsweredQuestionCue;
