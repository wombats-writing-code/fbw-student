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


const BASE_STYLES = require('fbw-platform-common/styles/base-styles');


class NextCue extends Component {


  render() {
    return (
      <Text>
        I am a next cue.
      </Text>
    )
  }
}

export default NextCue
