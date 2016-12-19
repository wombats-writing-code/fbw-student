'use strict'
import moment from 'moment'
import React, { Component } from 'react'
import {
  ActivityIndicator, RefreshControl, ListView, ScrollView,
  Text, TouchableHighlight, View, Image
} from 'react-native'
import { Actions } from "react-native-router-flux";
import _ from 'lodash'

const Icon = require('react-native-vector-icons/FontAwesome')

import { localDateTime, checkMissionStatus } from 'fbw-platform-common/selectors/'
const styles = require('./Missions.styles')

class Missions extends Component {

  componentDidMount () {
    // this will probably never get called from here,
    // because the bankId isn't returned until after this
    // has mounted.
    // console.log('getting missions in mount with subjectBankId:', this.props.subjectBankId)

    if (this.props.subjectBankId) {
      this.props.getMissions({
        subjectBankId: this.props.subjectBankId,
        username: this.props.username
      })
    }
  }

  componentDidUpdate() {
    console.log('missions updated', this.props)
    if (this.props.privateBankId &&
        this.props.subjectBankId &&
        !this.props.isGetMissionsInProgress &&
        !this.props.missions) {
      console.log('Missions.js: getting missions from', this.props.subjectBankId)
      this.props.getMissions({
        subjectBankId: this.props.subjectBankId,
        username: this.props.username
      })
    }
  }

  renderRow = (rowData, sectionId, rowId) => {
    // Let students view past missions, but not submit any choices.
    // TODO: get the subject names from D2L

    let deadlineStyle = styles.missionSubTitle,
      dlLocal = localDateTime(rowData.deadline).toDate(),
      now = new Date(),
      deadlineText = 'Due',
      timeRemaining = (dlLocal - now) / 1000 / 60 / 60 / 24 ;

    if (timeRemaining <= 1) {
      deadlineStyle = styles.deadlineTextWarning
    }
    if (timeRemaining <= 0) {
      deadlineText = 'Closed'
    }

    // console.log(dlLocal)
    // console.log('missions rowData', rowData)

    let missionTypeIconSource
    if (rowData.genusTypeId === 'assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU') {
      missionTypeIconSource = require('fbw-platform-common/assets/phase-1-icon@2x.png')

    } else if (rowData.genusTypeId === 'assessment-genus%3Afbw-in-class-mission%40ODL.MIT.EDU') {
      missionTypeIconSource = require('fbw-platform-common/assets/phase-2-icon@2x.png');

    } else {
      console.error('uh oh. could not recognize genusTypeId in Missions.js');
    }

    return (
        <TouchableHighlight onPress={() => this._onSelectMission({mission: rowData, username: this.props.username})}
                              style={[styles.touchableHighlightWrapper]}>

          <View style={styles.missionWrapper}>
              <Image style={styles.missionTypeIcon} source={missionTypeIconSource} />

              <View style={styles.missionTextWrapper}>
                <Text style={styles.missionTitle}>
                  {rowData.displayName.text}
                </Text>
                <Text style={deadlineStyle}>
                  {deadlineText}: {dlLocal.getMonth() + 1}-{dlLocal.getDate()}-{dlLocal.getFullYear()}
                </Text>
              </View>

              <View style={styles.angleIcon}>
                <Icon color="#dddddd"
                      name="angle-right"
                      size={30} />
              </View>
          </View>
      </TouchableHighlight>
    )
  }

  render() {
    if (this.props.isGetMissionsInProgress || !this.props.missions) {
      return (<View style={styles.container}>
        <ActivityIndicator/>
      </View>)
    }

    // we need to filter out "future" missions
    let filteredMissions = _.filter(this.props.missions, (mission) => {
      return checkMissionStatus(mission) !== "future"
    })
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let currentMissions = filteredMissions.length > 0 ?
                ( <ListView
                      dataSource={ds.cloneWithRows(filteredMissions)}
                      renderRow={this.renderRow}
                      style={styles.missionList}>
                  </ListView> ) : (
                  <View style={styles.notification}>
                    <Text style={styles.notificationText}>No missions yet!</Text></View>
                );

    // return <View style={styles.container}><Text>hi</Text></View>

    let refreshControl = (
      <RefreshControl
        refreshing={this.props.isGetMissionsInProgress}
        onRefresh={() => this.props.getMissions(this.props.bankId)}
      />
    )

    return (<View style={styles.container}>
        <ScrollView refreshControl={refreshControl}>
          {currentMissions}
        </ScrollView>
      </View>)
  }

  _onSelectMission (data) {
    let missionState = checkMissionStatus(data.mission)
    if (missionState === 'over') {
      data.bankId = this.props.subjectBankId
      this.props.onSelectClosedMission(data)
    } else {
      this.props.onSelectOpenMission(data)
    }
    Actions.mission()
  }
}

export default Missions
