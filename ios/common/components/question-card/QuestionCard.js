// QuestionCard.js

import React, { Component, }  from 'react';
import {
  Dimensions, Animated,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  Image
} from "react-native";
import {
  Actions
} from "react-native-router-flux";

import { isTarget } from 'fbw-platform-common/selectors/mission';

var _ = require('lodash');

import Choices from './Choices'

var MathWebView = require('../math-webview/MathWebView')
var QuestionHeader = require('./QuestionHeader');

var styles = require('./QuestionCard.styles');

const PULSE_TIMER = 1000;
let PULSE_ACTION = new Animated.Value(0)

class QuestionCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedChoiceId: null,
      isExpanded: props.isExpanded
    }
  }

  render() {
    let submitButtonText;
    if (!this.props.isInProgressSubmitChoice && this.state.selectedChoiceId) {
      submitButtonText = <Text style={styles.submitButtonText}>Submit</Text>

    } else if (!this.props.selectedChoiceId && !this.state.selectedChoiceId) {
      submitButtonText = <Text style={styles.submitButtonText}>Submit</Text>

    } else {
      submitButtonText = <Text style={styles.submitButtonText}>Working...</Text>
    }

    let submitButton;
    if (!this.props.isInProgressSubmitChoice) {
      submitButton = (
        <TouchableHighlight onPress={() => this._onSubmitChoice(this.state.selectedChoiceId, this.props.question.id)}
                                          style={[styles.submitButton, this.state.selectedChoiceId && styles.submitButtonActive]}>
            {submitButtonText}
        </TouchableHighlight>);
    }

    // =====
    // this block determines the icon image that should be shown, depending on the question and whether it's been answered
    // ======
    let questionTypeIcon;
    if (isTarget(this.props.question)) {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon@2x.png')} />
    } else {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon@2x.png')} />
    }

    // ====
    // determines whether solution should be shown
    // =====
    let solution = (this.props.question.responded && this.state.isExpanded) ?
                    (<div className="solution">
                        <p className="bold">Solution</p>
                        <div className="question-card__body"
                          dangerouslySetInnerHTML={{__html: this.props.question.response.feedback.text}}>
                        </div>
                      </div>) : null;

    // ====
    // determines whether choices should be shown
    // =====
    let choices = this.state.isExpanded ?
          (<Choices onSelectChoice={(choiceId) => this.setState({selectedChoiceId: choiceId})}
                      selectedChoiceId={this.state.selectedChoiceId}
                      choices={this.props.question.choices}
                      responseId={this.props.question.responded ? this.props.question.response.choiceIds[0] : null}
                      isResponseCorrect={this.props.question.isCorrect}/>) : null;

    // console.log('question', this.props.question)

    return (
    <View style={[styles.container]}>
      <QuestionHeader questionTypeIcon={questionTypeIcon}
                      headerText={this.props.outcome ? this.props.outcome.displayName.text : ''}
                      onShowAnswer={() => this._onShowAnswer(this.props.question)}
                      isExpanded={this.state.isExpanded}
                      isExpandable={this.props.question.responded || this.props.isExpandable}
                      onToggleExpand={() => this.setState({isExpanded: !this.state.isExpanded})}
      />

      {inProgressIndicator}

      <View style={styles.questionBodyWrapper}>
        <MathWebView content={this.props.question.text.text}
                     onAdjustHeight={(height) => this.setState({questionHeight: height})}/>

        {choices}
        {solution}
      </View>

      {submitButton}
    </View>
    )
  }

  _onSubmitChoice = (choiceId, questionId) => {
    if (!this.props.isInProgressSubmitChoice) {
      this.props.onSubmitResponse({
        bankId: this.props.bank.id,
        choiceId: choiceId,
        questionId: questionId,
        section: this.props.section,
        username: this.props.user.username
      });
    }
  }


  // old code below for showing the answer
  _onShowAnswer = (questionItem) => {
    if (!this.props.isInProgressShowAnswer) {
      this.props.onShowAnswer({
        bankId: this.props.privateBankId,
        questionId: this.props.question.id,
        section: this.props.section
      });
    }
    Animated.timing(PULSE_ACTION, {
      duration: PULSE_TIMER,
      toValue: 1
    }).start(this.animationActionComplete);
  }

  animationActionComplete = () => {
    if (this._value === 1) {
      Animated.timing(PULSE_ACTION, {
        duration: PULSE_ACTION * PULSE_TIMER,
        toValue: 0
      }).start();
    }
  }

}

module.exports = QuestionCard;
