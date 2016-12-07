'use strict';

import React, { Component}  from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
// import reduceReducers from 'reduce-reducers'

import reducers from 'fbw-platform-common/reducers';
import routes from './reducers/routes'
const reducersWithRouting = combineReducers({
    ...reducers,
    routes
  });

// === create our store ====
const middleware = [thunk];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducersWithRouting);

// store.subscribe( () => {
//   const state = store.getState();
//   console.log('store changed', state)
// })

// console.log('initial state', store.getState())
// ====

import AppRouter from './router'

// this got way too annoying...
console.ignoredYellowBox = ['Warning: You are manually calling a React.PropTypes validation function']
// ====

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {AppRouter()}
      </Provider>
    );
  }
}

export default App
