import React, { Component }  from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import _ from 'lodash';


let styles = {
  nextCue: {
    backgroundColor: '#f8f8f8',
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 4
  },
  cueText: {
    fontSize: 12,
  },
  outcomeText: {
    fontWeight: '600',
    fontStyle: 'italic'
  },
}

class NextCue extends Component {

  render() {
    let response = this.props.response;

    if (response.isCorrect) {
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <Text style={styles.cueText}>
            <Text>Good! Now let's </Text>
            <Text style={styles.outcomeText}>{this.props.nextOutcome.displayName.text}</Text>
            <Text>.</Text>
          </Text>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <Text style={styles.cueText}>No outcome bug. Please notify your instructors.</Text>

      } else if (!this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <Text style={styles.cueText}>Good job! You've reached the end of the route. Please try another Target question.</Text>

      } else if (this.props.isLastTarget) {
        cueText = <Text style={styles.cueText}>Good job! You've finished all the questions in this goal.</Text>
      }

    } else {
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <Text style={styles.cueText}>
            <Text >Not quite. Looks like you need to work on</Text>
            <Text style={styles.outcomeText}> {this.props.nextOutcome.displayName.text}</Text>
            <Text>.</Text>
          </Text>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = (
          <Text style={styles.cueText}>
              <Text >Not quite. Let's try to </Text>
              <Text style={styles.outcomeText}>{this.props.outcome.displayName.text}</Text>
              <Text> again.</Text>
          </Text>
        )

      } else if (!this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <Text style={styles.cueText}>Study the solution carefully and try another Target question.</Text>
      }
    }

    return (
      <View style={styles.nextCue}>
        {cueText}
      </View>
    )
  }
}

export default NextCue
