// Choice.js

'use strict';

import React, {
    Component,
}  from 'react';
import {
  Dimensions,
  ListView, ScrollView,
  Text, Image,
  TouchableWithoutFeedback, View, StyleSheet
} from "react-native";

var _ = require('lodash');
var AssessmentTakenQuestionConstants = require('../../constants/AssessmentTakenQuestion');
var Alphabet = AssessmentTakenQuestionConstants.Alphabet;

var MathWebView = require('../math-webview/MathWebView');

let styles = StyleSheet.create({
  choiceRow: {
    opacity: .8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    borderBottomWidth: 3,
    borderColor: 'transparent'
  },
  choiceWebViewWrapper: {
    flex: 96
  },
  respondedChoice: {
    backgroundColor: '#e4dfcb',
  },
  respondedChoiceIcon: {
    width: 14,
    height: 14,
    marginTop: 1,
    marginRight: 10.5
  },
  selectedChoiceIndicator: {
    flex: 2,
    width: 16,
    minWidth: 16,
    maxWidth: 16,
    marginLeft: 0,
    marginRight: 10.5,
    height: 16,
    maxHeight: 16,
    borderRadius: 8,
    backgroundColor: '#324D5C'
  },
  choiceLabel: {
    width: 18,
    minWidth: 18,
    maxWidth: 18,
    marginLeft: -7,
    fontWeight: "300",
    color: '#333'
  }
});


class Choices extends Component {
  renderChoice = (choice, idx) => {
    // let {h, w} = Dimensions.get('window');
    // let choiceWebViewWrapperWidth = w - styles.choiceLabel.width - styles.choiceLabel.marginRight -
    //                               styles.selectedChoiceIndicator.width - styles.selectedChoiceIndicator.marginLeft;


    let selectedChoiceStyle = (this.props.selectedChoiceId === choice.id) ? styles.selectedChoiceRow : {};

    let height = this.props.heightByChoice[choice.id] || 14;

    // console.log('height for', choice.id, height);

    let respondedChoiceIcon;
    // we style it a bit differently if it's a responded-to choice
    if (this.props.responseId && this.props.responseId === choice.id) {
      if (this.props.isResponseCorrect) {
        respondedChoiceIcon = <Image style={styles.respondedChoiceIcon} source={require('fbw-platform-common/assets/responseType--correct@2x.png')} />

      } else {
        respondedChoiceIcon  = <Image style={styles.respondedChoiceIcon} source={require('fbw-platform-common/assets/responseType--incorrect@2x.png')} />
      }
    }

    let selectedChoiceIndicator, selectedChoiceLabelStyle;
    if (this.props.selectedChoiceId === choice.id) {
      // selectedChoiceIndicator = <Image style={styles.selectedChoiceIndicator} source={require('../../assets/selectedChoiceIndicator.png')} />
      selectedChoiceIndicator = <View style={styles.selectedChoiceIndicator}></View>
      selectedChoiceLabelStyle = {fontWeight: "700", color: "#324D5C"};
    }

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onSelectChoice(choice.id, this.props.question.id)} key={choice.id}>
        <View style={[styles.choiceRow, {height: this.props.heightByChoice[choice.id]}]}>
          <Text style={[styles.choiceLabel, selectedChoiceLabelStyle]}>
            {Alphabet[idx]}&#x00029;
          </Text>

          <View style={[styles.choiceWebViewWrapper]}>
            <MathWebView accessible={true} content={choice.text} onAdjustHeight={this._adjustChoiceRowHeight}
            />
          </View>

          {selectedChoiceIndicator}
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
    this.props.onSetChoiceHeight({choiceId: height})
  }

}

module.exports = Choices;
