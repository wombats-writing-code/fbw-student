import ResendVerificationEmailComponent from '@wombats-writing-code/fbw-platform-common/components/resend-verification-email/web/ResendVerificationEmail';
import ResendVerificationEmailContainer from '@wombats-writing-code/fbw-platform-common/components/resend-verification-email/ResendVerificationEmailContainer'
const ResendVerificationEmail = ResendVerificationEmailContainer(ResendVerificationEmailComponent)

export default (store) => ({
  path : 'resend-verification-email',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      /*  Return getComponent   */
      cb(null, ResendVerificationEmail)

    /* Webpack named bundle   */
    }, 'resend-verification-email')
  }
})
