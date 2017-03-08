import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import persistState from 'redux-localstorage'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

import logger from 'adaptive-common/logger'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, logger]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // copy state to local storage
  enhancers.push(persistState(null, {
    slicer: paths => state => {
      let subset = {
        bank: state.bank,
        subject: state.subject,
        result: _.omit(state.result, ['phaseIResults', 'phaseIIResults']),
        editMission: {},
        mapping: state.mapping,
        mission: _.assign({}, state.mission, {
          isGetMissionsInProgress: false,
          missions: null
        }),
        login: state.login,
        location: state.location,
        view: state.view
      };

      return subset
    }
  }))

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
