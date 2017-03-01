import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import DuckImage from '../assets/Duck.jpg'
import moment from 'moment'

import './HomeView.scss'

import {getD2LDisplayName} from 'fbw-platform-common/selectors/login'

import CoursesComponent from './Courses'
import CoursesContainer from 'fbw-platform-common/components/courses/CoursesContainer'
const Courses = CoursesContainer(CoursesComponent)

class Home extends Component {

  componentDidMount() {
    if (this.props.currentCourse) {
      this.props.getMissions({
        course: this.props.currentCourse,
        user: this.props.user
      })
    } else {
      // browserHistory.push('/login')
    }
  }

  render() {

    if (!this.props.user) return null;

    let nextActionPrompt;
    if (this.props.missions && this.props.missions.length > 0) {
      nextActionPrompt = (
        <p className="next-action-prompt">
          Go to your class to begin.
        </p>
      )
    }


    return (
      <div className="home row">
        <div className="columns">
          <h1 className="home__greeting">
            <span className="greeting">Welcome</span>,
            <span className="name"> {getD2LDisplayName(this.props.user)}</span>
          </h1>
          {nextActionPrompt}

          <Courses />

        </div>
      </div>
    )
  }
}

export default Home
