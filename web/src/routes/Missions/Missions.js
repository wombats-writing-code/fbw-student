'use strict'
import moment from 'moment'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'

import Spinner from 'react-spinner'
import LoadingBox from '../../components/LoadingBox'

import '../../styles/react-spinner.css'
import './Missions.scss'

import {checkMissionStatus} from 'fbw-platform-common/utilities/time'

class Missions extends Component {

  componentDidMount () {
    this.props.getMissions({
      course: this.props.course,
      user: this.props.user
    })

    // get mapping happens when Missions load
    this.props.getMapping({
      course: this.props.course,
      user: this.props.user,
      entityTypes: ['outcome']
    });
  }

  renderRow = (mission, sectionId, rowId) => {
    // Let students view past missions, but not submit any choices.

    let dlLocal = moment(mission.deadline).toDate(),
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
    // console.log('missions mission', mission)

    let missionTypeIconSource
    if (mission.type === 'PHASE_I_MISSION_TYPE') {
      missionTypeIconSource = require('fbw-platform-common/assets/phase-1-icon@2x.png')

    } else if (mission.type === 'PHASE_II_MISSION_TYPE') {
      missionTypeIconSource = require('fbw-platform-common/assets/phase-2-icon@2x.png');

    } else {
      console.error('uh oh. could not recognize genusTypeId in Missions.js');
    }

    return (
      <li className="missions-list__item" key={sectionId} onClick={() => this._onSelectMission(mission)}>
        <button className="clickable-row__button" >
          <div className="flex-container align-top">
            <img className="mission-type-icon" src={missionTypeIconSource} />

            <div className="missions-list__item__body">
              <p className="row-title mission-name">
                {mission.displayName}
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
    if (this.props.isGetMissionsInProgress) {
      loadingBox =  <LoadingBox type="enter-active"/>
    } else {
      loadingBox =  <LoadingBox type="enter"/>
    }

    let nonFutureMissions = _.filter(this.props.missions, (mission) => {
      return checkMissionStatus(mission) !== 'future'
    })

    let currentMissions;
    if (nonFutureMissions && nonFutureMissions.length > 0) {
      currentMissions = (<ul className="row-list">
                          {_.map(nonFutureMissions, this.renderRow)}
                        </ul>)
    } else if (!this.props.isGetMissionsInProgress && nonFutureMissions && nonFutureMissions.length === 0) {
      currentMissions = (<div className="empty-state">
                  Your instructor has not opened any Missions yet. Check back later!
                </div>)
    }



    // console.log('currentMissions', currentMissions);

    return (
      <div className="medium-9 medium-centered large-6 large-centered columns">
          {currentMissions}
          {loadingBox}
      </div>)
  }

  _onSelectMission (mission) {
    let missionStatus = checkMissionStatus(mission);

    if (missionStatus === 'over') {
      this.props.onSelectClosedMission({mission, course: this.props.course, user: this.props.user})
    } else {
      this.props.onSelectOpenMission({mission, course: this.props.course, user: this.props.user})
    }
    browserHistory.push(`/missions/${slug(mission.displayName)}`)
  }

}

export default Missions
