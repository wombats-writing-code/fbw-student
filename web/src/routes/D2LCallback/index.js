// import { injectReducer } from '../../store/reducers'
import D2LCallback from './D2LCallbackContainer'

export default (store) => ({
  path : 'd2l-callback',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      /*  Return getComponent   */
      cb(null, D2LCallback)

    /* Webpack named bundle   */
  }, 'd2l-callback')
  }
})
