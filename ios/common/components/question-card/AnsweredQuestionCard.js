// QuestionCard.js

'use strict';

import React, {
    Component,
}  from 'react';
import {
  Dimensions,
  ListView, WebView,
  Text,
  TouchableHighlight,
  View, Image,
  StyleSheet
} from "react-native";

import {isTarget} from 'fbw-platform-common/selectors'

var MathWebView = require('../math-webview/MathWebView');
var QuestionHeader = require('./QuestionHeader');

import ChoicesContainer from 'fbw-platform-common/containers/ChoicesContainer'
import ChoicesComponent from '../choice/Choices'
const Choices = ChoicesContainer(ChoicesComponent)

var styles = StyleSheet.create({
  container: {
    marginLeft: 10.5,
    marginRight: 10.5,
    padding: 10.5,
    backgroundColor: 'transparent'
  },
  questionBodyWrapper: {
    paddingLeft: 32,      // because the QuestionHeader has icon of width=20
  },
  solutionWrapper: {

  },
  solutionTitle: {
    fontWeight: "500"
  },
  solution: {
    marginTop: 13
  }
})

class AnsweredQuestionCard extends Component {
  constructor(props) {
    super (props);  // props includes the mission / assessment

    // console.log('answeredresponse', this.props.question.response);
    this.state = {
      isExpanded: false
    }
  }

  render() {
    let response = this.props.question.response;

    let questionTypeIcon;
    if (isTarget(this.props.question) && response.isCorrect) {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon--correct@2x.png')} />

    } else if (isTarget(this.props.question) && !response.isCorrect) {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/target-icon--incorrect@2x.png')} />

    } else if (!isTarget(this.props.question) && response.isCorrect) {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon--correct@2x.png')} />

    } else if (!isTarget(this.props.question) && !response.isCorrect) {
      questionTypeIcon = <Image source={require('fbw-platform-common/assets/waypoint-icon--incorrect@2x.png')} />
    }

    let webviewContent = this.props.question.text.text;
    let choices;
    let solution;
    if (this.state.isExpanded) {
      // webviewContent = webviewContent.substr(0, 200) + '...';

      choices = (<Choices question={this.props.question} />);

      solution = (
        <View style={styles.solutionWrapper}>
          <Text style={styles.solutionTitle}>Solution</Text>
          <View style={styles.solution}>
            <MathWebView content={this.props.question.response.feedback.text} />
          </View>
        </View>
      )
    }

    // console.log('response', this.props.question.response);

    return (
      <View style={styles.container}>
        <QuestionHeader questionTypeIcon={questionTypeIcon}
                        headerText={this.props.outcome ? this.props.outcome.displayName.text : ''}
                        isExpandable={true}
                        isExpanded={this.state.isExpanded}
                        onShowMorePress={this._toggleShowMore}
        />
        <View style={styles.questionBodyWrapper}>
          <MathWebView content={webviewContent}/>

          {choices}

          {solution}

        </View>
      </View>

    )
  }

  _toggleShowMore = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
}

module.exports = AnsweredQuestionCard;
