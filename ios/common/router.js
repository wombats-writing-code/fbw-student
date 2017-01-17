// FbWRouter.js
'use strict';

import _ from 'lodash'
import React, { Component}  from 'react';
import { connect, Provider } from 'react-redux';
import { Navigator, StyleSheet, Text, View } from 'react-native';
import { Modal, Reducer, Router, Scene, Actions } from 'react-native-router-flux';
const RouterWithRedux = connect()(Router);

var Error = require('./components/error/Error');
var InitializeQBank = require('./components/initialize/InitializeQBank');
var Loading = require('./components/loading/Loading');

import MissionsContainer from 'fbw-platform-common/containers/MissionsContainer';
import MissionsComponent from './components/missions/Missions'

import MissionContainer from 'fbw-platform-common/containers/MissionContainer';
import MissionComponent from './components/mission/Mission'

import LoginContainer from 'fbw-platform-common/containers/LoginContainer'
import LoginComponent from './components/login/SimpleLogin'
import IntegratedLoginComponent from './components/login/IntegratedLogin'

import SubjectsContainer from 'fbw-platform-common/containers/SubjectsContainer'
import SubjectComponent from './components/subjects/Subjects'

import SplashContainer from 'fbw-platform-common/containers/SplashContainer'
import SplashComponent from './components/splash/Splash'


const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
  },
  titleStyle: {
    color: '#555',
    fontWeight: "700",
    fontSize: 12
  }
};

const loginTitleStyle = _.assign({}, styles.titleStyle, {
  color: '#fff',
  fontWeight: "600",
  fontStyle: 'italic',
  fontSize: 21,
});
const loginNavBarStyle = _.assign({}, styles.navigationBarStyle, {
  marginTop: 14,
  backgroundColor: '#86bEa4',
  borderBottomWidth: 0,
});

function logout () {
  Actions.login()
}

const AppRouter = () => {
    return (
        <RouterWithRedux>
          <Scene key="modal" component={Modal} >
            <Scene key="root">
              <Scene component={SplashContainer(SplashComponent)}
                     initial={true}
                     key="splash"
                     type="reset"
                     title={"Fly-by-Wire".toUpperCase()}
                     titleStyle={loginTitleStyle}
                     navigationBarStyle={loginNavBarStyle}
                     />
              <Scene component={LoginContainer(IntegratedLoginComponent)}
                     key="login"
                     type="reset"
                     title={"Fly-by-Wire".toUpperCase()}
                     titleStyle={loginTitleStyle}
                     navigationBarStyle={loginNavBarStyle}
                     />
              {/* <Scene component={Loading}
                     initial={true}
                     key="loading"
                     title="Loading ..."
                     type="reset"
                     titleStyle={loginTitleStyle}
                     navigationBarStyle={loginNavBarStyle} /> */}
              {/* <Scene component={InitializeQBank}
                     key="initializeQbank"
                     title="Initializing"
                     type="reset"
                     titleStyle={loginTitleStyle}
                     navigationBarStyle={loginNavBarStyle} /> */}
              <Scene component={MissionsContainer(MissionsComponent)}
                     key="missions"
                     title={"Your Missions".toUpperCase()}
                     titleStyle={styles.titleStyle}
                     navigationBarStyle={styles.navigationBarStyle}
                     onRight={logout}
                     rightTitle="Logout" />
              <Scene component={MissionContainer(MissionComponent)}
                     key="mission"
                     title={"Mission".toUpperCase()}
                     titleStyle={styles.titleStyle}
                     navigationBarStyle={styles.navigationBarStyle}
                     onRight={logout}
                     rightTitle="Logout" />
              <Scene key="subjects"
                     type="reset"
                     titleStyle={loginTitleStyle}
                     navigationBarStyle={loginNavBarStyle}
                     component={SubjectsContainer(SubjectComponent)}
                     title={"Subjects".toUpperCase()}
                     onRight={logout}
                     rightTitle="Logout" />
              {/* <Scene key="logout"
                     type="reset"
                     titleStyle={loginTitleStyle}
                     navigationBarStyle={loginNavBarStyle}
                     component={LoginContainer(LoginComponent)}
                     title={"Logout".toUpperCase()} /> */}
        </Scene>
        <Scene key="error" component={Error} title="Error!" />
      </Scene>
    </RouterWithRedux>
  )
}

export default AppRouter