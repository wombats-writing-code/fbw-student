// AnsweredQuestionCard.js

'use strict';

import React, {
    Component,
}  from 'react';

import {isTarget} from 'fbw-platform-common/selectors'

var QuestionHeader = require('./QuestionHeader');

import ChoicesContainer from 'fbw-platform-common/containers/ChoicesContainer'
import ChoicesComponent from '../choice/Choices'
const Choices = ChoicesContainer(ChoicesComponent)

class AnsweredQuestionCard extends Component {
  constructor(props) {
    super (props);  // props includes the mission / assessment

    // console.log('answeredresponse', this.props.question.response);
    this.state = {
      isExpanded: false
    }
  }

  componentDidMount() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  render() {
    let response = this.props.question.response;

    let questionTypeIcon;
    if (isTarget(this.props.question) && response.isCorrect) {
      questionTypeIcon = <img className="question-type-icon" src={require('fbw-platform-common/assets/target-icon--correct@2x.png')} />

    } else if (isTarget(this.props.question) && !response.isCorrect) {
      questionTypeIcon = <img className="question-type-icon" src={require('fbw-platform-common/assets/target-icon--incorrect@2x.png')} />

    } else if (!isTarget(this.props.question) && response.isCorrect) {
      questionTypeIcon = <img className="question-type-icon" src={require('fbw-platform-common/assets/waypoint-icon--correct@2x.png')} />

    } else if (!isTarget(this.props.question) && !response.isCorrect) {
      questionTypeIcon = <img className="question-type-icon" src={require('fbw-platform-common/assets/waypoint-icon--incorrect@2x.png')} />
    }

    let webviewContent = this.props.question.text.text;
    let choices;
    let solution;
    if (this.state.isExpanded) {
      // webviewContent = webviewContent.substr(0, 200) + '...';

      choices = (<Choices question={this.props.question}
                          grabFocus={false} />);

      solution = (
        <div className="solution">
          <p className="bold">Solution</p>
          <div className="question-card__body"
            dangerouslySetInnerHTML={{__html: this.props.question.response.feedback.text}}>
          </div>
        </div>
      )
    }

    // console.log('response', this.props.question.response);

    return (
      <div className="question-card">
        <QuestionHeader questionTypeIcon={questionTypeIcon}
                        headerText={this.props.outcome ? this.props.outcome.displayName.text : ''}
                        isExpandable={true}
                        isExpanded={this.state.isExpanded}
                        onShowMorePress={this._toggleShowMore}
        />
        <div className="question-card__body">
          <div dangerouslySetInnerHTML={{__html: webviewContent}}/>

          {choices}

          {solution}

        </div>
      </div>

    )
  }

  _toggleShowMore = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
}

module.exports = AnsweredQuestionCard;
