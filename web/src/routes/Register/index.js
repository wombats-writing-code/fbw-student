import RegisterComponent from '@wombats-writing-code/fbw-platform-common/components/register/web/Register';
import RegisterContainer from '@wombats-writing-code/fbw-platform-common/components/register/RegisterContainer'
const Register = RegisterContainer(RegisterComponent)

export default (store) => ({
  path : 'register',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      /*  Return getComponent   */
      cb(null, Register)

    /* Webpack named bundle   */
    }, 'register')
  }
})
