import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './HomeView.scss'

import { getD2LDisplayName } from '@wombats-writing-code/fbw-platform-common/selectors/login'

import CoursesComponent from './Courses'
import CoursesContainer from '@wombats-writing-code/fbw-platform-common/components/courses/CoursesContainer'
const Courses = CoursesContainer(CoursesComponent)

class Home extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.div.focus();  
    }
  }

  render() {
    if (!this.props.user) return null;

    return (
      <DocumentTitle title="Home">
        <div
          tabIndex={-1}
          ref={(div) => { this.div = div }}
          className="home row">
          <LiveMessage message="Fly-by-wire home view" aria-live="polite" />
          <div className="columns">
            <h1 className="home__greeting">
              <span className="greeting">Welcome</span>,
              <span className="name"> {getD2LDisplayName(this.props.user)}</span>
            </h1>

            <p className="next-action-prompt">
              Go to your class to begin.
            </p>

            <Courses />

          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default Home
