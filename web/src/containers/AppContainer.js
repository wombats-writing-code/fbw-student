import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import {isLoggedIn} from '@wombats-writing-code/fbw-platform-common/selectors'
import {getD2LUserIdentifer} from '@wombats-writing-code/fbw-platform-common/selectors/login'
import axios from 'axios'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount() {
    const store = this.props.store;
    const state = store.getState();

    if (window.location.pathname.indexOf('logout-success') > -1 ||
      window.location.pathname.indexOf('guide') > -1 ||
      window.location.pathname.indexOf('introduction') > -1) {
      // do nothing on the logout-succcess page

    } else if (window.location.pathname.indexOf('d2l-callback') === -1 &&
        window.location.pathname.indexOf('guest-callback') === -1 &&
        window.location.pathname.indexOf('register') === -1 &&
        window.location.pathname.indexOf('reset-password') === -1 &&
      window.location.pathname.indexOf('set-password') === -1) {
      // if we're not login, need to redirect to login
      if (!isLoggedIn(state)) browserHistory.push('/login');

    } else {
      let unsub = store.subscribe(() => {
        let state = store.getState();
        // console.log('in AppContainer. state changed', state);
        unsub();
        if (isLoggedIn(state))  browserHistory.push('/')
      })
    }
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
