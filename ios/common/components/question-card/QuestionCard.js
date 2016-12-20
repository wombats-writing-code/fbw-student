// QuestionCard.js

'use strict';

import React, {
    Component,
}  from 'react';
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

import { isTarget, checkMissionStatus } from 'fbw-platform-common/selectors';

var _ = require('lodash');

import ChoicesContainer from 'fbw-platform-common/containers/ChoicesContainer'
import ChoicesComponent from '../choice/Choices'
const Choices = ChoicesContainer(ChoicesComponent)

var MathWebView = require('../math-webview/MathWebView')
var QuestionHeader = require('./QuestionHeader');

var styles = require('./QuestionCard.styles');

const PULSE_TIMER = 1000;
let PULSE_ACTION = new Animated.Value(0)

class QuestionCard extends Component {

  render() {
    let submitButtonText;
    if (!this.props.isInProgressSubmitChoice && this.props.selectedChoiceId) {
      submitButtonText = <Text style={styles.submitButtonText}>Submit</Text>

    } else if (!this.props.selectedChoiceId && !this.props.selectedChoiceId) {
      submitButtonText = <Text style={styles.submitButtonText}>Submit</Text>

    } else {
      submitButtonText = <Text style={styles.submitButtonText}>Working...</Text>

    }

    let submitButton;

    if (checkMissionStatus(this.props.mission) === 'pending' && !this.props.isInProgressSubmitChoice) {
      submitButton = (<TouchableHighlight onPress={() => this._onSubmitChoice(this.props.selectedChoiceId, this.props.question.id)}
                                          style={[styles.submitButton, this.props.selectedChoiceId && styles.submitButtonActive]}>
            {submitButtonText}
        </TouchableHighlight>);
    }

    // since we don't have rules yet, every question is a target question
    let questionTypeIcon;
    if (isTarget(this.props.question)) {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon@2x.png')} />
    } else {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon@2x.png')} />

    }

    // console.log('question', this.props.question)

    let inProgressIndicator;
    if (this.props.isInProgressShowAnswer) {
      if (isTarget(this.props.question)) {
        inProgressIndicator = (<Animated.View style={[styles.inProgressIndicator]}>
          <Animated.Text style={[styles.inProgressIndicatorText, this._getTextProgressStyles()]} onLayout={this._onProgressTextLayout}>
            Fetching the answer...you can no longer get points on this Target.
          </Animated.Text>
        </Animated.View>)
      } else {
        inProgressIndicator = (
          <Animated.View style={[styles.inProgressIndicator]}>
            <Animated.Text style={[styles.inProgressIndicatorText, this._getTextProgressStyles()]}>
              Fetching the answer...
            </Animated.Text>
          </Animated.View>
        )
      }

    }

    return (
    <View style={[styles.container]}>
      <QuestionHeader questionTypeIcon={questionTypeIcon}
                      headerText={this.props.outcome ? this.props.outcome.displayName.text : ''}
                      onShowAnswer={() => this._onShowAnswer(this.props.question)}
                      isExpandable={false}
      />

      {inProgressIndicator}

      <View style={styles.questionBodyWrapper}>
        <MathWebView content={this.props.question.text.text}
                     onAdjustHeight={(height) => this.setState({questionHeight: height})}/>

        <Choices question={this.props.question} />
      </View>
        {submitButton}
    </View>
    )
  }

  _onSubmitChoice = (choiceId, questionId) => {
    if (!this.props.isInProgressSubmitChoice) {
      this.props.onSubmitResponse({
        bankId: this.props.privateBankId,
        choiceId: choiceId,
        questionId: questionId,
        section: this.props.section,
        username: this.props.username
      });
    }
  }

  _onProgressTextLayout = () => {
    console.log('_onProgressTextLayout')
  }

  _getTextProgressStyles = () => {
    console.log('_getTextProgressStyles', PULSE_ACTION)
    return {
      opacity: PULSE_ACTION
    }
  }

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
