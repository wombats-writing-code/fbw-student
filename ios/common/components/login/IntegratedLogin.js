// SimpleLogin.js
'use strict'

import React, { Component } from 'react'
import {
  Dimensions,
  Linking,
  Text,
  TextInput,
  TouchableHighlight, TouchableOpacity,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'

var {
  height: deviceHeight
} = Dimensions.get('window')

import Q from 'q'
import { whoami, getAuthenticationUrl, stringifyUsername, enrollments } from 'fbw-platform-common/d2lutils'

const credentials = require('../../../d2lcredentials');
const D2L = require('valence');

let styles = require('./IntegratedLogin.styles')

class IntegratedLogin extends Component {
  constructor() {
    super();
    this.state = {
      isVisitorFormVisible: false
    }
  }
  componentDidMount () {
    if (this.props.username) {
      this.props.logout()
      Actions.login()
    }
    Linking.addEventListener('url', this._handleACCD2LCallback);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleACCD2LCallback);
  }

  render () {
    let loginButtonText;
    if (this.props.isLoginInProgress) {
      loginButtonText = <Text style={styles.loginButtonText}>Logging you in...</Text>
    } else {
      loginButtonText = <Text style={styles.loginButtonText}>Login</Text>
    }

    let visitorLoginButtonText = this.state.isVisitorFormVisible ?
                                  'Cancel':
                                  'Visiting?';

    let visitorLogin;
    if (this.state.isVisitorFormVisible) {
      visitorLogin = (
        <View style={styles.visitorLoginContainer}>
          <TextInput autoCapitalize='characters'
            autoCorrect={false}
            autoFocus={true}
            onChangeText={(text) => this.props.updateUsername({ username: text.toUpperCase() })}
            placeholder='Username'
            placeholderTextColor='#f0f0f0'
            style={styles.usernameInput}
            value={this.props.username} />

          <TouchableHighlight onPress={() => this._loginUserSimple()}
            style={styles.loginButton}>
            {loginButtonText}
          </TouchableHighlight>
        </View>
      )
    }

    return <View style={styles.container}>

      <View style={styles.schoolButtons}>
        <TouchableOpacity onPress={() => this._handleACCLogin()} style={styles.schoolButton}>
          <Text style={[styles.schoolButtonText]}>Arapahoe</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._handleQCCLogin()} style={styles.schoolButton}>
          <Text style={[styles.schoolButtonText]}>Quinsigamond</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => this.setState({isVisitorFormVisible: !this.state.isVisitorFormVisible})} style={styles.visitorButton}>
       <Text style={styles.loginButtonText}>{visitorLoginButtonText}</Text>
     </TouchableOpacity>

     {visitorLogin}
    </View>
  }

  _handleACCLogin = () => {
    let authenticationUrl = getAuthenticationUrl(credentials)
    Linking.canOpenURL(authenticationUrl).then(supported => {
      if (!supported) {
        Action.errors('Cannot authenticate to D2L right now.');
      } else {
        Linking.openURL(authenticationUrl);
      }
    }).catch(err => Action.errors('D2L Authentication error: ', err));
  }

  _handleQCCLogin = () => {
    Actions.error({
      message: `QCC currently is not supported.`
    })
  }

  _handleACCD2LCallback = (event) => {
    // save the returned URL in local storage, because we'll need
    // it if the student re-opens the app.
    this.props.onSetD2LAuthenticatedUrl(event.url)

    // now get the username
    Q.when(whoami(credentials, event.url))
    .then((response) => {
      this.props.login('acc', stringifyUsername(response))
      //console.log('logged in user to acc', stringifyUsername(response))
      return enrollments(credentials, event.url)
    })
    .then((bankIds) => {
      //console.log('found these fbw banks', bankIds)
      this._goToSubjects(bankIds)
    })
    .catch((error) => {
      Actions.error('error handling d2l login')
    })
    .done()
  }

  _loginUserSimple = () => {
    if (this.props.username === '') {
      Actions.error({
        message: `You must supply a unique username. For example, ${_.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8).join('')}`
      })
    } else {
      this.props.login('fbw-visitor', this.props.username)
      this._goToSubjects(null)  // for default banks
    }
  }

  _goToSubjects = (bankIds) => {
    // leave bankIds null for default banks
    this.props.onSetEnrolledSubjects(bankIds)
    Actions.subjects()
  }
}

module.exports = IntegratedLogin;
