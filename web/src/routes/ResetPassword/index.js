import ResetPasswordComponent from '@wombats-writing-code/fbw-platform-common/components/reset-password/web/ResetPassword';
import ResetPasswordContainer from '@wombats-writing-code/fbw-platform-common/components/reset-password/ResetPasswordContainer'
const ResetPassword = ResetPasswordContainer(ResetPasswordComponent)

export default (store) => ({
  path : 'reset-password',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      /*  Return getComponent   */
      cb(null, ResetPassword)

    /* Webpack named bundle   */
  }, 'reset-password')
  }
})
