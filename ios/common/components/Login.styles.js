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
  schoolButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 42
  },
  schoolButton: {
    flexDirection: 'row',
    padding: 10.5,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center'
  },
  schoolButtonText: {
    color: '#fafafa',
    fontSize: 16,
    textAlign: 'center'
  },
  usernameInput: {
    fontSize: 18,
    textAlign: 'center',
    height: 42,
    color: '#fff',
    marginTop: 21,
    marginBottom: 21
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
  }
});

module.exports = styles;
