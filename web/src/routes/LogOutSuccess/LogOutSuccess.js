import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'

import './LogOutSuccess.scss'

class LogOutSuccess extends Component {

  componentDidMount () {
    if (this.props.isVisitor) {
      browserHistory.push('/login')
    }
  }

  render () {
    return (
      <DocumentTitle title="Logout">
        <div className="logout-success flex-container justify-center align-center">
          <div className="logout-success__wrapper">
            <p className="logout-success__prompt text-center">
              You <b>must</b> also log out from your D2L account. Go to:
            </p>
            <p><a className="acc-link" href="https://acc.desire2learn.com/d2l/home">My ACC D2L Portal &rarr;</a></p>
            <p className="logout-success__text text-center">
              If you don't log out from there, other people will be able to see your missions here.
            </p>
          </div>
        </div>
      </DocumentTitle>)
  }

}

export default LogOutSuccess
