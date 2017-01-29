// Choice.js

import React, { Component, }  from 'react';
import {
  Dimensions,
  ListView, ScrollView,
  Text, Image,
  TouchableWithoutFeedback, View, StyleSheet
} from "react-native";

var _ = require('lodash');
var AssessmentTakenQuestionConstants = require('../../constants/AssessmentTakenQuestion');
var Alphabet = AssessmentTakenQuestionConstants.Alphabet;

import MathWebView from '../math-webview/MathWebView';
import baseStyles from 'fbw-platform-common/styles/base-styles'

let styles = StyleSheet.create({
  choice: {
    opacity: .8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    paddingTop: 4,
    marginBottom: 9,
    paddingLeft: 5,
    borderLeftWidth: 3,
    borderColor: 'transparent'
  },
  selectedChoice: {
    borderColor: baseStyles.appBlueDark,
    backgroundColor: '#f8f8f8'
  },
  choiceWebViewWrapper: {
    flex: 96
  },
  respondedChoiceIcon: {
    width: 14,
    height: 14,
    marginTop: 1,
    marginRight: 10.5
  },
  choiceLabel: {
    width: 18,
    minWidth: 18,
    maxWidth: 18,
    fontWeight: "300",
    color: '#333'
  }
});


class Choices extends Component {
  renderChoice = (choice, idx) => {
    // === icon for responded-to choice =====
    let respondedChoiceIcon;
    if (this.props.responseId && this.props.responseId === choice.id) {
      if (this.props.isResponseCorrect) {
        respondedChoiceIcon = <Image style={styles.respondedChoiceIcon} source={require('fbw-platform-common/assets/responseType--correct@2x.png')} />

      } else {
        respondedChoiceIcon  = <Image style={styles.respondedChoiceIcon} source={require('fbw-platform-common/assets/responseType--incorrect@2x.png')} />
      }
    }

    // ==== styling for selected choice ====
    let selectedChoiceStyle = (this.props.selectedChoiceId == choice.id || this.props.responseId === choice.id) ?
                              styles.selectedChoice : null;

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onSelectChoice(choice.id)} key={choice.id}>
        <View style={[styles.choice, selectedChoiceStyle]}>
          <Text style={[styles.choiceLabel]}>
            {Alphabet[idx]}&#x00029;
          </Text>

          <View style={[styles.choiceWebViewWrapper]}>
            <MathWebView accessible={true} content={choice.text} onAdjustHeight={this._adjustChoiceRowHeight} />
          </View>

          {respondedChoiceIcon}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View>
        {_.map(this.props.choices, this.renderChoice)}
      </View>
    )
  }

  _adjustChoiceRowHeight= (height, choiceId) => {
    // console.log('calculated height for choice', height);
    // this.props.onSetChoiceHeight({choiceId: height})
  }
}

export default Choices;
