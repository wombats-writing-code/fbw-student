import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import Spinner from 'react-spinner'

import '../../styles/react-spinner.css'

import './Subjects.scss'

class Subjects extends Component {
  componentDidMount () {
    // console.log('bankIds', this.props.bankIds)
    // deprecated getSubjects call, because banks is now set elsewhere?
    // this.props.getSubjects(this.props.bankIds)
    this.props.getMapping(_.map(this.props.subjects, 'id'))
  }

  renderRow = (subject, index) => {
      return (
        <li className="clickable-row" key={index} >
          <button className="clickable-row__button" tabIndex={index + 1} onClick={() => this._onSelectSubject(subject)}>
            <p className="row-title">{subject.displayName}</p>
            <p className="row-subtitle">{subject.description}</p>
          </button>
        </li>
      );
  }

  render() {
    if (!this.props.subjects || !this.props.user.username) {
      return <Spinner />
    }

    let currentSubjects = this.props.subjects ?
                ( <ul className="row-list">
                      {_.map(this.props.subjects, this.renderRow)}
                  </ul> ) :
                ( <div className="notification">
                    <div className="notificationText">
                      No subjects configured. Please contact a Fly-by-Wire administrator.
                    </div>
                  </div> );

    return <div className="medium-8 medium-centered large-6 large-centered columns">
        {currentSubjects}
    </div>;
  }

  _onSelectSubject(subject) {
    this.props.onSelectSubject(subject, this.props.user.username)

    browserHistory.push(`/missions`)

  }

}

export default Subjects
