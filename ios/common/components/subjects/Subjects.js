// Subjects.js
// * For the hardcoded case, presents a list of banks / subjects for the user
//   to select from
// * Also create the student's private bank (for personalized missions),
//   make it a child of the class bank, make the shared bank a child of
//   the private bank, and then set "take" authz on the private bank.

'use strict';

import React, { Component, } from 'react';
import { Animated,
  ActivityIndicator,
  Dimensions, ListView, ScrollView, Text, TouchableHighlight, View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
var { height: deviceHeight } = Dimensions.get("window");
var styles = require('./Subjects.styles');

class Subjects extends Component {
  componentDidMount () {
    this.props.getSubjects(this.props.bankIds)
    this.props.getOutcomes()
  }

  renderRow = (rowData) => {
      return (
        <TouchableHighlight onPress={() => this._onSelectSubject(rowData.id)}
                                  style={styles.subjectWrapper}>
                <View>
                  <Text style={styles.rowTitle}>{(rowData.displayName.text || '').toUpperCase()}
                  </Text>
                  <Text style={styles.rowSubtitle}>{rowData.description.text}
                  </Text>
                </View>
              </TouchableHighlight>
      );
  }

  render() {
    if (this.props.isGetSubjectsInProgress || !this.props.subjects || !this.props.username) {
      return (<View style={styles.container}>
        <ActivityIndicator/>
      </View>)
    }

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      currentSubjects = this.props.subjects ?
                ( <ListView
                      dataSource={ds.cloneWithRows(this.props.subjects)}
                      renderRow={this.renderRow}
                      style={styles.subjectList}>
                  </ListView> ) :
                ( <View style={styles.notification}>
                    <Text style={styles.notificationText}>
                      No subjects configured. Please contact a Fly-by-Wire administrator.
                    </Text>
                  </View> );

    return <View style={styles.container}>
      <Text style={styles.header}>
        Select your Fly-by-Wire subject
      </Text>
      <ScrollView>
        {currentSubjects}
      </ScrollView>
    </View>;
  }

  _onSelectSubject(subjectId) {
    if (!this.props.isSelectSubjectInProgress) {
      this.props.onSelectSubject({
        bankId: subjectId,
        username: this.props.username
      })
      Actions.missions()
    }
  }
}

module.exports = Subjects;
