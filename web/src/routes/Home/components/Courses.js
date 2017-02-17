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
        <li className="clickable-row" key={index} >
          <button className="clickable-row__button" tabIndex={index + 1} onClick={() => this._onSelectCourse(course)}>
            <p className="row-title">{course.Code}</p>
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

    return <div className="medium-8 medium-centered large-6 large-centered columns">
        {currentCourses}
    </div>;
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
