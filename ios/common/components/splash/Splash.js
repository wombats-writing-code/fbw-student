// Splash.js
'use strict';

import React, { Component, }  from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Actions } from "react-native-router-flux";
import baseStyles from 'fbw-platform-common/styles/base-styles'


let styles = StyleSheet.create({
  container: {
    backgroundColor: baseStyles.appGreen,
    flex: 1,
    padding: 100
  }
});


class Splash extends Component {

  componentDidMount() {
    this.props.onInitialize()
  }
  componentDidUpdate() {
    if (this.props.username && this.props.initialized) {
      Actions.subjects()
    } else {
      Actions.login()
    }
  }
  render() {
    return (<View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>);
  }
}

module.exports = Splash;
