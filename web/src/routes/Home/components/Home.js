import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import DuckImage from '../assets/Duck.jpg'
import moment from 'moment'

import './HomeView.scss'

import {usernameToDisplayName} from 'fbw-platform-common/selectors/login'

import MissionsContainer from 'fbw-platform-common/containers/MissionsContainer.js'
import MissionsComponent from '../../Missions/Missions.js'
const Missions = MissionsContainer(MissionsComponent)

class Home extends Component {

  componentDidMount() {
    if (this.props.bank) {
      this.props.getMissions({
        subjectBankId: this.props.bank.id,
        username: this.props.user.username
      })
    } else {
      // browserHistory.push('/login')
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
    } 

    let navigationLink;
    if (this.props.isVisitor) {
      navigationLink = (
        <Link className="navigation-link" to="/subjects">Go to my Subjects</Link>
      )
    } else {
      navigationLink = (
        <Link className="navigation-link" to="/missions">See Missions</Link>
      )
    }


    return (
      <div className="home row">
        <div className="columns">
          <h1 className="home__greeting">
            <span className="greeting">Welcome</span>,
            <span className="name"> {usernameToDisplayName(this.props.user.username)}</span>
          </h1>
          {nextActionPrompt}
          {navigationLink}
        </div>
      </div>
    )
  }
}

export default Home
