// Questions.styles.js
'use strict';
import {
  StyleSheet
} from "react-native";

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1
  },
  infiniteTimeline: {
    width: 2.5,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 32,
    left: 30,
  },
  questionHistoryContainer: {
    position: 'relative'
  },
  isInProgressSubmitChoice: {
    marginTop: 90,
  }
});

module.exports = styles;
