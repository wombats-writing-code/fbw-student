import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import './LogOutSuccess.scss'

class LogOutSuccess extends Component {

  render() {

    return (
      <div className="logout-success flex-container justify-center align-center">
        <div class="logout-success__wrapper">
          <p className="logout-success__prompt text-center">
            You must also log out from your D2L account. Go to:
          </p>
          <p><a className="acc-link" href="https://myportal.cccs.edu/jsp/misc/schoolLoginNew.jsp?school=acc">My ACC Portal &rarr;</a></p>
          <p className="logout-success__text text-center">
            If you don't log out from there, other people will be able to see your account here on FbW.
          </p>
        </div>
      </div>)
  }

}

export default LogOutSuccess
