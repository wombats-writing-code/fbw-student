import React, {Component} from 'react'
import {Link} from 'react-router'
import DuckImage from '../assets/Duck.jpg'
import moment from 'moment'

import './HomeView.scss'

import MissionsContainer from 'fbw-platform-common/containers/MissionsContainer.js'
import MissionsComponent from '../../Missions/Missions.js'
const Missions = MissionsContainer(MissionsComponent)

class Home extends Component {

  componentDidMount() {
    if (this.props.subjectBankId) {
      this.props.getMissions({
        subjectBankId: this.props.subjectBankId,      // @Cole: need to fix this for the d2l case;
        username: this.props.username
      })
    }
  }

  render() {

    // if (!this.props.user) return null;

    let nextActionPrompt;
    if (this.props.missions && this.props.missions.length > 0) {
      nextActionPrompt = (
        <p className="next-action-prompt">
            Your next mission is due
            <span> {moment(this.props.missions[0].deadline).format('dddd[,] MMMM D')}</span>.
        </p>
      )
    } else {
      nextActionPrompt = (
        <p className="next-action-prompt">
          Well done on your last mission.
        </p>
      )
    }

    let navigationLink;
    if (this.props.isVisitorLogin) {
      navigationLink = (
        <Link className="navigation-link" to="/subjects">Go to my Subjects</Link>
      )
    } else {
      navigationLink = (
        <Link className="navigation-link" to="/missions">See Missions</Link>
      )
    }


    return (
      <div className="home">
        <div className="row">
          <h1 className="home__greeting">
            <span className="greeting">Welcome</span>,
            <span className="name"> {this.props.user.displayName}</span>
          </h1>
          {nextActionPrompt}
          {navigationLink}
        </div>
      </div>
    )
  }
}

export default Home
