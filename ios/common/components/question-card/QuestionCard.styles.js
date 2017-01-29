// QuestionCard.styles.js
import { StyleSheet, } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    marginLeft: 10.5,
    marginRight: 10.5,
    padding: 10.5
  },
  questionBodyWrapper: {
    paddingLeft: 32,      // because the QuestionHeader has icon of width=20
  },
  rightAnswer: {
    color: '#355e3b',
    textAlign: 'center'
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
  solutionCaption: {
    fontWeight: '500',
    marginBottom: 4,
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
