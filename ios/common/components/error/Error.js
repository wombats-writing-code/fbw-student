// Error.js
'use strict';

import React, {
    Component,
}  from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import {
  Actions
} from "react-native-router-flux";

var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = require('./Error.styles');

class Error extends Component {
  constructor(props) {
    super (props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }
  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
  }
  closeModal = () => {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight
    }).start(Actions.pop);
  }
  render() {
    return <Animated.View style={[styles.error,
                                  {transform: [{translateY: this.state.offset}]}]}>
      <View>
        <Text style={styles.errorMessageText}>
          {this.props.message}
        </Text>
        <TouchableHighlight onPress={() => this.closeModal()}
                            style={styles.closeButton}>
          <Text style={styles.closeButtonText}>
            Close
          </Text>
        </TouchableHighlight>
      </View>
    </Animated.View>;
  }
}

module.exports = Error;