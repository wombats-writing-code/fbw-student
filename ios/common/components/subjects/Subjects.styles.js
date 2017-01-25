// Subjects.styles.js
'use strict';

import {
  StyleSheet
} from "react-native";

var styles = StyleSheet.create({
  subjectList: {
    marginTop: 65,
    borderTopColor: '#eee',
    borderTopWidth: 2
  },
  container: {
    backgroundColor: "#86bEa4",
    bottom:0,
    justifyContent: "center",
    left:0,
    position: "absolute",
    right:0,
    top:0
  },
  touchableHighlightWrapper: {
  },
  subjectWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingLeft: 18,
    height: 84,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rowTitle: {
    color: '#fff',
    fontWeight: "600",
    marginBottom: 9
  },
  rowSubtitle: {
    color: '#fafafa'
  },
  sidePadding: {
    paddingRight: 10.5,
    paddingLeft: 10.5,
    paddingBottom: 10.5,
    paddingTop: 10.5,
    backgroundColor: '#fff'
  },
  subjectTypeIcon: {
    width: 42,
    height: 42,
    marginRight: 12,
  },
  subjectTextWrapper: {
    flex: 5,
  },
  angleIcon: {
    flex: 1,
  },
  deadlineTextWarning: {
    color: 'red',
    fontWeight: 'bold'
  },
  loadingText: {
    margin: 10,
    textAlign: 'center'
  },
  subjectSubTitle: {
    color: '#999999',
    marginBottom: 5
  },
  notification: {
    backgroundColor: '#ff9c9c',
    padding: 3
  },
  notificationText: {
    fontSize: 10,
    padding: 5
  },

});

module.exports = styles;
