// Missions.styles.js
'use strict';

import {
  StyleSheet
} from "react-native";

var styles = StyleSheet.create({
  missionList: {
  },
  container: {
    marginTop: 65,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },
  touchableHighlightWrapper: {
    backgroundColor: '#fff',
  },
  missionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 84,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    paddingRight: 10.5,
    paddingLeft: 12,
  },
  missionTypeIcon: {
    width: 42,
    height: 42,
    marginRight: 12,
  },
  missionTextWrapper: {
    flex: 8,
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
  missionTitle: {
    fontSize: 14,
    marginBottom: 5.5,
    color: 'black'
  },
  missionSubTitle: {
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
  rounded: {
    borderRadius: 3
  },

});

module.exports = styles;
