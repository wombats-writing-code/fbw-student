// import { injectReducer } from '../../store/reducers'
// import MissionComponent from './components/Mission'
//
// export default (store) => ({
//   path : 'mission',
//   /*  Async getComponent is only invoked when route matches   */
//   getComponent (nextState, cb) {
//     /*  Webpack - use 'require.ensure' to create a split point
//         and embed an async module loader (jsonp) when bundling   */
//     require.ensure([], (require) => {
//       /*  Webpack - use require callback to define
//           dependencies for bundling   */
//       const MissionFactory = require('fbw-platform-common/containers/MissionContainer').default
//
//       /*  Return getComponent   */
//       cb(null, MissionFactory(MissionComponent))
//
//     /* Webpack named bundle   */
//   }, 'mission')
//   }
// })

import MissionComponent from './components/Mission'
import MissionContainer from  'fbw-platform-common/containers/MissionContainer'
//
// // Sync route definition
// export default {
//   component : Mission
// }

export default MissionContainer(MissionComponent)
