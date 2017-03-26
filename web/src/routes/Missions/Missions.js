'use strict'
import moment from 'moment'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'

import LoadingBox from 'fbw-platform-common/components/loading-box/web/'
import EmptyState from 'fbw-platform-common/components/empty-state/web/'
import '../../styles/react-spinner.css'
import './Missions.scss'

import {checkMissionStatus} from 'fbw-platform-common/utilities/time'
import {missionConfig} from 'fbw-platform-common/reducers/Mission'

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
    // console.log('missions mission', mission)

    let missionTypeIconSource
    if (mission.type === missionConfig.PHASE_I_MISSION_TYPE) {
      missionTypeIconSource = require('fbw-platform-common/assets/phase-1-icon@2x.png')

    } else if (mission.type === missionConfig.PHASE_II_MISSION_TYPE) {
      missionTypeIconSource = require('fbw-platform-common/assets/phase-2-icon@2x.png');

    }

    let missionStatus = checkMissionStatus(mission);

    let activeStyle = mission === this.props.currentMission ? 'isSelected' : null;

    return (
      <li className={`missions-list__item ${activeStyle}`} key={sectionId} onClick={() => this._onSelectMission(mission)}>
        <button className="clickable-row__button" >
          <div className="flex-container align-top">
            <img className="mission-type-icon" src={missionTypeIconSource} />

            <div className="missions-list__item__body">
              <p className="row-title mission-name">
                {mission.displayName}
                {mission.description ? ' | ' + mission.description : null}
              </p>
              <p className="row-subtitle mission-datetime" >
                <span className="">{moment(mission.startTime).format('ddd, MMM D [at] ha')}</span>
                 &#8202; &mdash; &#8202;
                <span className="bold">{moment(mission.deadline).format('ddd, MMM D [at] ha')} </span>
                &ensp;
                <span>
                  {missionStatus === 'over' ? '(Deadline is past)' : null}
                </span>
              </p>
              <p className="row-subtitle mission-datetime">
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
      currentMissions = EmptyState('Your instructor has not opened any Missions yet. Check back later!')
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
