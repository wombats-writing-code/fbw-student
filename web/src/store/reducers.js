import { combineReducers } from 'redux'
import locationReducer from './location'
import feedbackReducer from './feedback/'
import commonReducers from '@wombats-writing-code/fbw-platform-common/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    feedback: feedbackReducer,
    ...commonReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
