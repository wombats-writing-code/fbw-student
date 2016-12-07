// SimpleLogin.js
'use strict'

import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  TextInput,
  TouchableHighlight, TouchableOpacity,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'

var {
  height: deviceHeight
} = Dimensions.get('window')

import { validSNumber } from 'fbw-platform-common/selectors/'

var styles = require('./SimpleLogin.styles')

class SimpleLogin extends Component {
  componentDidMount () {
    if (this.props.username) {
      this.props.logout()
      Actions.login()
    }
  }

  render () {
    let loginButtonText
    if (this.props.isLoginInProgress) {
      loginButtonText = (<Text style={styles.loginButtonText}>Logging you in...</Text>)
    } else {
      loginButtonText = (<Text style={styles.loginButtonText}>
        Login
      </Text>)
    }

    let selectedTextStyle = { fontWeight: '700' }

    let selectedACCIcon, selectedQCCIcon
    if (this.props.school === 'acc') {
      selectedACCIcon = <Text style={[styles.selectedSchoolIcon, selectedTextStyle]}>&#x02713;</Text>
    } else if (this.props.school === 'qcc') {
      selectedQCCIcon = <Text style={[styles.selectedSchoolIcon, selectedTextStyle]}>&#x02713;</Text>
    }

    return <View style={styles.container}>
      <TextInput autoCapitalize='characters'
        autoCorrect={false}
        autoFocus={true}
        onChangeText={(text) => this.props.updateUsername({ username: text.toUpperCase() })}
        placeholder='Username'
        placeholderTextColor='#f0f0f0'
        style={styles.usernameInput}
        value={this.props.username} />

      <View style={styles.schoolButtons}>
        <TouchableOpacity onPress={() => this.props.updateSchool({ school: 'acc' })} style={styles.schoolButton}>
          <Text style={[styles.schoolButtonText, this.props.school === 'acc' && selectedTextStyle]}>Arapahoe</Text>
          {selectedACCIcon}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.updateSchool({ school: 'qcc' })} style={styles.schoolButton}>
          <Text style={[styles.schoolButtonText, this.props.school === 'qcc' && selectedTextStyle]}>Quinsigamond</Text>
          {selectedQCCIcon}
        </TouchableOpacity>
      </View>

      <TouchableHighlight onPress={() => this._loginUser()}
        style={styles.loginButton}>
        {loginButtonText}
      </TouchableHighlight>
    </View>
  }

  _loginUser = () => {
    // in an OAuth-ish login, this should be the token?
    if (this.props.username === '') {
      Actions.error({
        message: 'You must supply a username'
      })
    } else if (this.props.school === 'acc' && !validSNumber(this.props.username)) {
      Actions.error({
        message: 'That is not a valid S#. Please try again.'
      })
    } else if (this.props.school !== 'acc') {
      Actions.error({
        message: `${this.props.school.toUpperCase()} is not supported yet. Please try again.`
      })
    } else {
      this.props.login(this.props.school, this.props.username)
      Actions.subjects();
    }
  }
}

module.exports = SimpleLogin;
