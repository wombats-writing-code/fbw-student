// Subjects.js
// * For the hardcoded case, presents a list of banks / subjects for the user
//   to select from

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
  }

  renderRow = (subject) => {
      return (
        <TouchableHighlight onPress={() => this._onSelectSubject(subject)}
                                  style={styles.subjectWrapper}>
                <View>
                  <Text style={styles.rowTitle}>{(subject.displayName.text || '').toUpperCase()}
                  </Text>
                  <Text style={styles.rowSubtitle}>{subject.description.text}
                  </Text>
                </View>
              </TouchableHighlight>
      );
  }

  render() {
    // console.log('this.props.subjects of Subjects', this.props);

    if (this.props.isGetSubjectsInProgress || !this.props.subjects || !this.props.user.username) {
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

    return (
      <View style={styles.container}>
        <ScrollView>
          {currentSubjects}
        </ScrollView>
      </View>);
  }

  _onSelectSubject(subject) {
    if (!this.props.isSelectSubjectInProgress) {
      console.log('selected subject', subject, 'subjects available', this.props.subjects);
      this.props.onSelectSubject(subject, this.props.user.username);
      this.props.getMapping();

      Actions.missions();
    }
  }
}

module.exports = Subjects;
