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

import { isTarget, checkMissionStatus } from 'platform-common/selectors';

var _ = require('lodash');

var Choices = require('../choice/Choices');
var MathWebView = require('../math-webview/MathWebView')
var QuestionHeader = require('./QuestionHeader');

var styles = require('./QuestionCard.styles');

const PULSE_TIMER = 1000;

class QuestionCard extends Component {
  constructor(props) {
    super (props);  // props includes the mission / assessment

    this.state = {
      selectedChoiceId: '',
      choiceLabelPaddingTop: 0,
      isInProgressSubmitChoice: false,
      isInProgressShowAnswer: false,
      pulseAction: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question !== this.props.question) {
      this.setState({isInProgressSubmitChoice: false})
    }
  }

  setChoice = (choice) => {
    this.setState({ selectedChoiceId: choice.id });
  }

  render() {
    let submitButtonText;
    if (!this.state.isInProgressSubmitChoice && this.state.selectedChoiceId) {
      submitButtonText = <Text style={styles.submitButtonText}>Submit</Text>

    } else if (!this.state.selectedChoiceId && !this.state.selectedChoiceId) {
      submitButtonText = <Text style={styles.submitButtonText}>Submit</Text>

    } else {
      submitButtonText = <Text style={styles.submitButtonText}>Working...</Text>

    }

    let submitButton;
    if (CheckMissionStatus(this.props.mission) === 'pending' && !this.state.isInProgressSubmitChoice) {
      submitButton = (<TouchableHighlight onPress={() => this._onSubmitChoice(this.state.selectedChoiceId, this.props.question.id)}
                                          style={[styles.submitButton, this.state.selectedChoiceId && styles.submitButtonActive]}>
            {submitButtonText}
        </TouchableHighlight>);
    }

    // since we don't have rules yet, every question is a target question
    let questionTypeIcon;
    if (isTarget(this.props.question)) {
      questionTypeIcon = <Image source={require('../../assets/target-question--inProgress.png')} />
    } else {
      questionTypeIcon = <Image source={require('../../assets/waypoint-question--inProgress.png')} />

    }

    // console.log('question', this.props.question)

    let inProgressIndicator;
    if (this.state.isInProgressShowAnswer) {
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

        <Choices choices={this.props.question.choices}
                 onSelect={this.setChoice}
                 selectedChoiceId={this.state.selectedChoiceId}
                 paddingTop={0} //this.state.choiceLabelPaddingTop}
        />
      </View>
        {submitButton}
    </View>
    )
  }

  _onSubmitChoice(choiceId, questionId) {
    if (choiceId) {
      this.props.onSubmitChoice(choiceId, questionId);
    }
  }

  _onProgressTextLayout = () => {
    console.log('_onProgressTextLayout')
  }

  _getTextProgressStyles = () => {
    console.log('_getTextProgressStyles', this.state.pulseAction)
    return {
      opacity: this.state.pulseAction
    }
  }

  _onShowAnswer = (questionItem) => {
    this.setState({
      isInProgressShowAnswer: true
    });

    Animated.timing(this.state.pulseAction, {
      duration: PULSE_TIMER,
      toValue: 1
    }).start(this.animationActionComplete);

    this.props.onShowAnswer(questionItem);
  }

  animationActionComplete = () => {
    if (this._value === 1) {
      Animated.timing(this.state.pulseAction, {
        duration: this.state.pulseAction * PULSE_TIMER,
        toValue: 0
      }).start();
    }
  }

}

module.exports = QuestionCard;
