import { injectReducer } from '../../store/reducers'
import SubjectsComponent from './Subjects'

export default (store) => ({
  path : 'subjects',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SubjectsFactory = require('adaptive-common/containers/SubjectsContainer').default

      /*  Return getComponent   */
      cb(null, SubjectsFactory(SubjectsComponent))

    /* Webpack named bundle   */
  }, 'subjects')
  }
})
