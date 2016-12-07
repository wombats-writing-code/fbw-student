// InitializeQBank.js
'use strict';

import React, {
    Component,
}  from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import {
  Actions
} from "react-native-router-flux";

var AuthorizationStore = require('../../stores/Authorization');

var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#86bEa4',
    flex: 1,
    paddingTop: 80
  },
  messageText: {
    marginTop: 30,
    color: '#fff',
    fontWeight: "300",
    fontSize: 14,
    textAlign: 'center'
  },
  messageWrapper: {
    margin: 10
  }
});

class InitializeQBank extends Component {
  constructor(props) {
    super (props);

    this.state = {
    };
  }
  componentDidMount() {
    console.log('setting authz');
    AuthorizationStore.setAuthorizations(this.props.payload,
      this.props.callback);
  }
  render() {
    return <View style={styles.container}>
      <View style={styles.messageWrapper}>
        <Text style={styles.messageText}>
          Creating your account ...
        </Text>
      </View>
      <ActivityIndicator size="large" />
    </View>;
  }
}

module.exports = InitializeQBank;
