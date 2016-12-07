
'use strict';

import React, {
    Component,
}  from 'react';
import {
  Dimensions, Animated, Easing,
  TouchableHighlight,
  View,Image, StyleSheet,Text
} from "react-native";

var _ = require('lodash');

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 21,
  },
  showTargetAnswerView: {
    padding: 21,
  },
  showTargetAnswerText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    padding: 10.5,
    borderRadius: 4,
  },
  cancelButton: {
    marginLeft: 21,
    backgroundColor: '#96CEB4',
  },
  showAnswerButton: {
    backgroundColor: '#FF6F69',
  },
  emphasis: {
    fontWeight: "700"
  }
})

class ShowAnswerPrompt extends Component {
  constructor(props) {
    super (props);

    let {width, height} = Dimensions.get('window');

    this.state = {
      width: width,
      fadeInAnimation: new Animated.Value(0),
      moveVerticalAnimation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    console.log('show answer prompt did mount');

    let {width, height} = Dimensions.get('window');

    Animated.parallel([
      Animated.timing(this.state.fadeInAnimation, {
        toValue: 1,
        duration: 600
      }),
      Animated.timing(this.state.moveVerticalAnimation, {
        toValue: height/2,
        easing: Easing.elastic(1),
        duration: 600
      })
    ])
    .start();
  }

  render() {

    console.log('rendering ShowAnswerPrompt')

    let showTargetAnswerText;
    if (this.props.isTarget) {
      showTargetAnswerText = (
        <View style={styles.showTargetAnswerView}>
          <Text style={styles.showTargetAnswerText}>Are you sure? Showing the answer will void this Target.
            You need to complete <Text style={styles.emphasis}>{this.props.numTargets}</Text>.
            You have done <Text style={styles.emphasis}>{this.props.numCompleted}</Text>.
            There are <Text style={styles.emphasis}>{this.props.numPristine}</Text> left.
          </Text>
        </View>
      )
    }

    return (
      <Animated.View style={[styles.container, {opacity: this.state.fadeInAnimation, top: this.state.moveVerticalAnimation}]}>

        {showTargetAnswerText}

        <View style={styles.buttons}>
          <TouchableHighlight style={[styles.button, styles.showAnswerButton]} onPress={this.props.onConfirmShowAnswer}>
            <Text style={styles.buttonText}>Yes, Show answer</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.button, styles.cancelButton]} onPress={this.props.onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>

      </Animated.View>
    )
  }
}

module.exports = ShowAnswerPrompt;
