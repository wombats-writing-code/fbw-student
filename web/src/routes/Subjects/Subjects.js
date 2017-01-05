import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import Spinner from 'react-spinner'

import '../../styles/react-spinner.css'

import './Subjects.scss'

class Subjects extends Component {
  componentDidMount () {
    // console.log('bankIds', this.props.bankIds)
    this.props.getSubjects(this.props.bankIds)
    this.props.getMapping(this.props.bankIds)
  }

  renderRow = (subject, index) => {
      return (
        <li className="clickable-row" key={index} >
          <button className="clickable-row__button" tabIndex={index + 1} onClick={() => this._onSelectSubject(subject.id)}>
            <p className="row-title">{subject.displayName.text}</p>
            <p className="row-subtitle">{subject.description.text}</p>
          </button>
        </li>
      );
  }

  render() {
    if (this.props.isGetSubjectsInProgress || !this.props.subjects || !this.props.username) {
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

  _onSelectSubject(subjectId) {
    this.props.onSelectSubject({
      bankId: subjectId,
      username: this.props.username
    })

    browserHistory.push(`/missions`)

  }

}

export default Subjects
