import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import Spinner from 'react-spinner'

import '../../../styles/react-spinner.css'

import './Courses.scss'

class Courses extends Component {
  componentDidMount () {
    // console.log('bankIds', this.props.bankIds)
    // deprecated getCourses call, because banks is now set elsewhere?
    // this.props.getCourses(this.props.bankIds)
  }

  renderRow = (course, index) => {
      return (
        <li className="clickable-row course" key={index} >
          <button className="clickable-row__button" tabIndex={index + 1} onClick={() => this._onSelectCourse(course)}>
            <p className="row-title text-left">{course.Name || course.Code}</p>
            <p className="row-subtitle">{course.description}</p>
          </button>
        </li>
      );
  }

  render() {
    if (!this.props.courses) {
      return <Spinner />
    }

    let currentCourses = this.props.courses ?
                ( <ul className="row-list">
                      {_.map(this.props.courses, this.renderRow)}
                  </ul> ) :
                ( <div className="notification">
                    <div className="notificationText">
                      No courses configured. Please contact a Fly-by-Wire administrator.
                    </div>
                  </div> );

    return (
      <main id="main-content" className="row">
        <div className="medium-6 columns no-left-padding">
          {currentCourses}
        </div>
      </main>
    )
  }

  _onSelectCourse(course) {
    // this.props.getMapping({
    //   courseId: course.Id,
    //   entityTypes: ['outcome']
    // });
    this.props.onSelectCourse(course, this.props.user.username);

    browserHistory.push(`/missions`)
  }

}

export default Courses
