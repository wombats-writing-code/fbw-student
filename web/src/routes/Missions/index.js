import { injectReducer } from '../../store/reducers'
import MissionsComponent from './Missions'

export default (store) => ({
  path : 'missions',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const MissionsFactory = require('@wombats-writing-code/fbw-platform-common/components/missions/MissionsContainer').default

      /*  Return getComponent   */
      cb(null, MissionsFactory(MissionsComponent))

    /* Webpack named bundle   */
  }, 'missions')
  }
})
