// Error.styles.js
'use strict';

import {
  StyleSheet
} from "react-native";

var styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#cb213d',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center'
  },
  error: {
    alignItems: "center",
    backgroundColor: "#E25E75",
    bottom:0,
    justifyContent: "center",
    left:0,
    position: "absolute",
    right:0,
    top:0
  },
  errorMessageText: {
    color: 'white'
  }
});

module.exports = styles;