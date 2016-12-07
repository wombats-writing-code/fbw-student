// SimpleLogin.styles.js
'use strict';

import { StyleSheet } from "react-native";


var styles = StyleSheet.create({
  container: {
    backgroundColor: '#86bEa4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  usernameInput: {
    fontSize: 20,
    textAlign: 'center',
    height: 42,
    color: '#fff',
    marginTop: 84,
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
    // justifyContent: 'space-between',
    width: 140,
    padding: 10.5,
  },
  schoolButtonText: {
    color: '#fafafa',
    // textAlign: 'center',
    // flex: 1,
    // width: 130,
    // minWidth: 130,
    // maxWidth: 130
  },
  selectedSchoolIcon: {
    flex: 0,
    minWidth: 16,
    maxWidth: 16,
    width: 16,
    marginLeft: 10.5,
    color: '#fafafa'
  },
  loginButton: {
    width: 300,
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
});

module.exports = styles;
