// QuestionCard.styles.js
'use strict';

import {
  StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    marginLeft: 10.5,
    marginRight: 10.5,
    padding: 10.5
  },
  questionBodyWrapper: {
    paddingLeft: 32,      // because the QuestionHeader has icon of width=20
    // backgroundColor: '#ff0000'
  },
  rightAnswer: {
    color: '#355e3b',
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: '#888',
    borderRadius: 5,
    marginLeft: 25,
    padding: 9,
    marginTop: 9
  },
  submitButtonActive: {
    backgroundColor: '#324D5C'
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "500",
  },
  toggleChoicesButton: {
    backgroundColor: 'green',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.5,
    padding: 5,
    position: 'absolute',
    right: 0,
    top: -20
  },
  inProgressIndicator: {
    marginTop: 21,
    marginBottom: 21,
  },
  inProgressIndicatorText: {
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center'
  },
});
