// IntegratedLogin.styles.js
'use strict';

import { StyleSheet } from "react-native";
import baseStyles from 'fbw-platform-common/styles/base-styles'

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseStyles.appGreen,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  usernameInput: {
    fontSize: 20,
    textAlign: 'center',
    height: 42,
    color: '#fff',
    marginTop: 21,
    marginBottom: 21
  },
  // usernameInputWrapper: {
  //   maxWidth: 320,
  //   height: 42,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#eee',
  //   borderStyle: 'solid'
  // },
  schoolButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 21
  },
  schoolButton: {
    flexDirection: 'row',
    width: 250,
    padding: 10.5,
    margin: 24,
    borderColor: '#fff',
    borderWidth: 2.5,
    borderRadius: 5,
    justifyContent: 'center'
  },
  schoolButtonText: {
    color: '#fafafa',
    fontSize: 24,
    textAlign: 'center'
    // flex: 1,
    // width: 130,
    // minWidth: 130,
    // maxWidth: 130
  },
  loginButton: {
    width: 140,
    backgroundColor: 'transparent',
    margin: 10,
    padding: 10,
    borderColor: '#fff',
    borderWidth: 2.5,
    borderRadius: 5
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: "600",
    color: '#fff'
  },
  cancelButton: {
    width: 70,
    backgroundColor: 'transparent',
    margin: 5,
    padding: 5,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: "300",
    color: '#fff',
    fontSize: 12
  },
  visitorLoginContainer: {
    padding: 25,
    margin: 24,
    borderColor: '#fff',
    borderWidth: 2.5,
    borderRadius: 5,
  }
});

module.exports = styles;
