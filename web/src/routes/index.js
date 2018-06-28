// We only need to import the modules necessary for initial render
import { Router, Route, Link } from 'react-router'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
// import CounterRoute from './Counter'

import LoginRoute from './Login'
import RegisterRoute from './Register'
import ResetPasswordRoute from './ResetPassword'
import SetNewPassword from './SetNewPassword'
import Mission from './Mission'
import MissionsRoute from './Missions'
import D2LCallbackRoute from './D2LCallback'
import GuestCallbackRoute from './GuestCallback'

import LogOutSuccessRoute from './LogOutSuccess'
import GuideRoute from './Guide'
import IntroductionRoute from './Introduction'


export const createRoutes = (store) => {

  /*  Note: Instead of using JSX, we recommend using react-router
      PlainRoute objects to build route definitions.   */
  const routes = {
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home,
    childRoutes : [
      LoginRoute(store),
      RegisterRoute(store),
      ResetPasswordRoute(store),
      MissionsRoute(store),
      D2LCallbackRoute(store),
      GuestCallbackRoute(store),
      LogOutSuccessRoute(store),
      GuideRoute(store),
      IntroductionRoute(store),
      // CounterRoute(store),      // came with boilerplate, for reference only

      {
        path: '/missions/:missionName',
        component: Mission,
      }, {
        path: '/set-password/:userId',
        component: SetNewPassword
      }

    ]
  }

  return routes;
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
