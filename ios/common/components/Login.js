
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

let styles = require('./Login.styles')
// import styles from 'fbw-platform-common/components/login/ios/Login.styles'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isVisitorFormVisible: false
    }
  }
  componentDidMount () {
    console.log('creds', this.props.credentials)

    if (this.props.username) {
      this.props.logout()
      Actions.login()
    }
    Linking.addEventListener('url', this._handleUrlChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrlChange);
  }

  _handleUrlChange = (event) => {
    this.props.authenticateD2L(this.props.credentials, event.url);
    Actions.subjects();
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
            placeholder='Enter username'
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

    return (
      <View style={styles.container}>
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
      </View>)
  }

  _handleACCLogin = () => {
    Linking.canOpenURL(this.props.authenticationUrl).then(supported => {
      if (!supported) {
        Action.errors('Cannot authenticate to D2L right now.');
      } else {
        Linking.openURL(this.props.authenticationUrl);
      }
    }).catch(err => Action.errors('D2L Authentication error: ', err));
  }

  _handleQCCLogin = () => {
    Actions.error({
      message: `QCC currently is not supported.`
    })
  }

  _loginUserSimple = () => {
    if (this.props.username === '') {
      Actions.error({
        message: `You must supply a unique username. For example, ${_.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8).join('')}`
      })
    } else {
      this.props.login('fbw-visitor', this.props.username)
      Actions.subjects()
    }
  }
}

module.exports = Login;
