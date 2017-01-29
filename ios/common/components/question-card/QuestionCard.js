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

import { isTarget } from 'fbw-platform-common/selectors/mission';

import _ from 'lodash';
import Choices from './Choices'

import MathWebView from '../math-webview/MathWebView'
import QuestionHeader from './QuestionHeader'

let styles = require('./QuestionCard.styles');

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
    // =====
    // this block determines the icon image that should be shown, depending on the question and whether it's been answered
    // ======
    let questionTypeIcon;
    if (isTarget(this.props.question)) {
      if (this.props.question.responded && this.props.question.response.isCorrect) {
        questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon--correct@2x.png')} />

      } else if (this.props.question.responded && !this.props.question.response.isCorrect) {
        questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon--incorrect@2x.png')} />

      } else {
        questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon@2x.png')} />
      }

    } else {
      if (this.props.question.responded && this.props.question.response.isCorrect) {
        questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon--correct@2x.png')} />

      } else if (this.props.question.responded && !this.props.question.response.isCorrect) {
        questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon--incorrect@2x.png')} />

      } else {
        questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon@2x.png')} />
      }
    }

    // ====
    // determines whether solution should be shown
    // =====
    let solution = (this.props.question.responded && this.state.isExpanded) ?
                    (<View style={styles.solution}>
                        <Text style={styles.solutionCaption}>Solution</Text>
                        <MathWebView content={this.props.question.response.feedback.text} />
                      </View>) : null;

    // ====
    // determines whether choices should be shown
    // =====
    let choices = this.state.isExpanded ?
          (<Choices onSelectChoice={(choiceId) => this._onSubmitChoice(choiceId, this.props.question.id)}
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

      <View style={styles.questionBodyWrapper}>
        <MathWebView content={this.props.question.text.text}
                     onAdjustHeight={(height) => this.setState({questionHeight: height})}/>

        {choices}
        {solution}
      </View>
    </View>
    )
  }

  _onSubmitChoice = (choiceId, questionId) => {
    if (!this.props.isInProgressSubmitChoice && !this.props.question.responded) {
      this.setState({selectedChoiceId: choiceId});

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

export default QuestionCard
