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

/**
  This component is like AppContainer. It checks whether there's an existing user in local store,
  if there is, it sends it to the subjects screen
  if not, it sends it to the login screen
*/

class Splash extends Component {

  componentDidMount() {
    //
    if (this.props.user && this.props.user.username) {
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
