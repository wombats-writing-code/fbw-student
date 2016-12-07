
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
import Icon from 'react-native-vector-icons/FontAwesome';

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
  solutionText: {
    color: '#fff'
  }
})

class ShowAnswer extends Component {
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
    return (
      <Animated.View style={[styles.container, {opacity: this.state.fadeInAnimation, top: this.state.moveVerticalAnimation}]}>
        <View>
          <View>
            <TouchableHighlight onPress={this.props.dismiss}>
              <Icon name="times-circle-o"
                    size={30}
                    style={styles.solutionText}/>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={styles.solutionText}>{this.props.solution}</Text>
          </View>
        </View>
      </Animated.View>
    )
  }
}

module.exports = ShowAnswer;
