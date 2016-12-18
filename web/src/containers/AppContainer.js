import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import { getUsername } from 'fbw-platform-common/reducers/Login/getUsername'
import { getEnrolledSubjects } from 'fbw-platform-common/reducers/Subject/getEnrolledSubjects'
import { getSelectedSubject } from 'fbw-platform-common/reducers/Subject/getSelectedSubject'
import { getSavedOutcomes } from 'fbw-platform-common/reducers/Outcome/getSavedOutcomes'


class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount() {
    const store = this.props.store;

    store.dispatch(getEnrolledSubjects())
    store.dispatch(getSelectedSubject())
    store.dispatch(getSavedOutcomes())

    store.dispatch(getUsername())
    .then( (username) => {
      const state = store.getState();
      console.log('state in AppContainer', state);
      console.log('resolved promise username in AppContainer', username);
      console.log('location.pathname in AppContainer', window.location.pathname)

      if (!username && window.location.pathname !== "/d2l-callback") {
        browserHistory.push('/login')
      } else if (!state.subject.enrolledBankIds) {
        browserHistory.push('/subjects')
      }

    })
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
