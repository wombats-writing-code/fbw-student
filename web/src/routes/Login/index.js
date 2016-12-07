import { injectReducer } from '../../store/reducers'
import LoginComponent from './Login'

export default (store) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LoginFactory = require('fbw-platform-common/containers/LoginContainer').default

      /*  Return getComponent   */
      cb(null, LoginFactory(LoginComponent))

    /* Webpack named bundle   */
  }, 'login')
  }
})
