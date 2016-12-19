'use strict'
import moment from 'moment'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'

import Spinner from 'react-spinner'
import LoadingBox from '../../components/LoadingBox'

import '../../styles/react-spinner.css'
import './Missions.scss'

import { localDateTime, checkMissionStatus } from 'fbw-platform-common/selectors/'

class Missions extends Component {

  componentDidMount () {
    if (this.props.subjectBankId || this.props.isGetPrivateBankIdInProgress) {
      // console.log('Missions.js: getting missions from', this.props.subjectBankId)
      // this.props.getMissions({
      //   subjectBankId: this.props.subjectBankId,
      //   username: this.props.username
      // })
    } else {
      browserHistory.push('/subjects')
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

    let dlLocal = localDateTime(rowData.deadline).toDate(),
      now = new Date(),
      deadlineText = 'Due',
      timeRemaining = (dlLocal - now) / 1000 / 60 / 60 / 24 ;

    let deadlineStyle;
    if (timeRemaining <= 1 && timeRemaining > 0) {
      deadlineStyle = {color: '#DB5142'};

    } else if (timeRemaining <= 0) {
      deadlineText = 'Closed';
      deadlineStyle = {color: '#888'}
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
      <li className="missions-list__item" key={sectionId} onClick={() => this._onSelectMission({mission: rowData, username: this.props.username})}>
        <button className="clickable-row__button" >
          <div className="flex-container align-top">
            <img className="mission-type-icon" src={missionTypeIconSource} />

            <div className="missions-list__item__body">
              <p className="row-title mission-name">
                {rowData.displayName.text}
              </p>
              <p className="row-subtitle mission-deadline" style={deadlineStyle} >
                {deadlineText}: {dlLocal.getMonth() + 1}-{dlLocal.getDate()}-{dlLocal.getFullYear()}
              </p>
            </div>
          </div>
      </button>
    </li>
    )
  }

  render() {

    let loadingBox;
    console.log('rendering', this.props.isGetMissionsInProgress, this.props.privateBankId)
    if (this.props.isGetMissionsInProgress || !this.props.privateBankId) {
      loadingBox =  <LoadingBox type="enter-active"/>
    } else {
      loadingBox =  <LoadingBox type="enter"/>
    }

    let nonFutureMissions = _.filter(this.props.missions, (mission) => {
      return checkMissionStatus(mission) !== 'future'
    })
    let currentMissions = nonFutureMissions && nonFutureMissions.length > 0 ?
                ( <ul className="row-list">
                    {_.map(nonFutureMissions, this.renderRow)}
                  </ul> ) : null;

    return (
      <div className="medium-8 medium-centered large-6 large-centered columns">
          {currentMissions}
          {loadingBox}
      </div>)
  }

  _onSelectMission (data) {
    let missionState = checkMissionStatus(data.mission)
    if (missionState === 'over') {
      data.bankId = this.props.subjectBankId
      this.props.onSelectClosedMission(data)
    } else {
      this.props.onSelectOpenMission(data)
    }
    browserHistory.push(`/missions/${slug(data.mission.displayName.text)}`)
  }

}

export default Missions
