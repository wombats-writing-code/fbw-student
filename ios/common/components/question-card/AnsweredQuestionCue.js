
// AnsweredQuestionCue is the part that lets someone see immediately
// what type of question it is and what the text is (even if it might be abbreviated)

'use strict';

import React, {
    Component,
}  from 'react';
import {
  Dimensions,
  TouchableHighlight,
  View,
  Image,
  StyleSheet,
  Text
} from "react-native";


var _ = require('lodash');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingLeft: 10.5,
    paddingRight: 10.5,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: 10,
    marginBottom: 13
  },
  cueTextContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cueTextParent: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cueText: {
    color: '#333',
    fontWeight: "300",
    fontStyle: 'italic',
    fontSize: 12,
  },
  outcomeText: {
    color: '#333',
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: "500",
  },
})

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
          <View style={styles.cueTextContainer}>
            <Text style={styles.cueTextParent}>
              <Text style={styles.cueText}>Good! Now let's </Text>
              <Text style={styles.outcomeText}>{this.props.nextOutcome.displayName.text}</Text>
              <Text style={styles.cueText}>.</Text>
            </Text>
          </View>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <Text style={styles.cueText}>No outcome authored. Notify course authors.</Text>


      } else if (!this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <Text style={styles.cueText}>Good job! You've reached the end of the route. Please try another Target question.</Text>

      } else if (this.props.isLastTarget) {
        cueText = <Text style={styles.cueText}>Good job! You've finished all the questions in this directive.</Text>
      }

    } else {
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <View style={styles.cueTextContainer}>
            <Text style={styles.cueTextParent}>
              <Text style={styles.cueText}>Not quite. Looks like you need to work on</Text>
              <Text style={styles.outcomeText}> {this.props.nextOutcome.displayName.text}</Text>
              <Text style={styles.cueText}>.</Text>
            </Text>
          </View>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = (
          <View style={styles.cueTextContainer}>
            <Text style={styles.cueTextParent}>
              <Text style={styles.cueText}>Not quite. Let's try to </Text>
              <Text style={styles.outcomeText}>{this.props.outcome.displayName.text}</Text>
              <Text style={styles.cueText}> again.</Text>
            </Text>
          </View>
        )

      } else if (!this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <Text style={styles.cueText}>Study the solution carefully and try another Target question.</Text>
      }
    }

    if (!this.props.nextQuestion) {
      // console.log('No next question');
    }

    return (
      <View style={styles.container}>
        {cueText}
      </View>
    )
  }
}

module.exports = AnsweredQuestionCue;
