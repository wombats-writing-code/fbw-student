// import LogOutSuccessContainer from '@wombats-writing-code/fbw-platform-common/components/d2l-callback/LogOutSuccessContainer'
import LogOutSuccess from './LogOutSuccess'
// const LogOutSuccess = LogOutSuccessContainer(LogOutSuccessComponent, credentials);

export default (store) => ({
  path : 'logout-success',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      /*  Return getComponent   */
      cb(null, LogOutSuccess)

    /* Webpack named bundle   */
  }, 'logout-success')
  }
})
