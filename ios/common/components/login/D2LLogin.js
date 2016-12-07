// D2LLogin.js
'use strict';

import React, {
    Component,
}  from 'react';
import {
  Animated,
  Dimensions,
  Linking,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  WebView
} from "react-native";
import {
  Actions
} from "react-native-router-flux";

var UserStore = require('../../stores/User');

var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = require('./D2LLogin.styles');

var credentials = require('../../credentials');
var D2L = require('valence');
var AppContext = new D2L.ApplicationContext(credentials.d2l.appID, credentials.d2l.appKey);


class D2LLogin extends Component {
  constructor(props) {
    super (props);

    this.state = {
      authenticationUrlD2L: AppContext.createUrlForAuthentication(credentials.d2l.host,
        credentials.d2l.port,
        "flybywire://"),
      offset: new Animated.Value(-deviceHeight),
      school: 'acc',
      username: ''
    };
  }
  componentDidMount() {
    // if user already has a token from d2l, pass them off to the next view
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
    Linking.addEventListener('url', this._handleLogin);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleLogin);
  }
  render() {
    return <View style={styles.container}>
      <View>
        <Text style={styles.schoolPrompt}>
          Select your school
        </Text>
      </View>
      <Picker onValueChange={(school) => this.setState({ school: school })}
              selectedValue={this.state.school}>
        <Picker.Item label="ACC" value="acc" />
        <Picker.Item label="QCC" value="qcc" />
      </Picker>

      <View style={styles.loginPanel}>
        <TouchableHighlight onPress={() => this._loginUser()}
                            style={styles.loginButton}>
          <Text style={styles.loginButtonText}>
            Login
          </Text>
        </TouchableHighlight>
      </View>

    </View>;
  }
  _handleLogin = (event) => {
    if (this.state.school === 'acc') {
      let userContext = AppContext.createUserContext(credentials.d2l.host,
        credentials.d2l.port,
        event.url
      );
      UserStore.setAuthenticationUrlD2L(event.url);
      UserStore.setUsername(() => {
          Actions.missions({
          });
        }
      );
    }
  }
  _loginUser = () => {
    UserStore.setSchool(this.state.school);
    if (this.state.school === "acc") {
      Linking.canOpenURL(this.state.authenticationUrlD2L).then(supported => {
        if (!supported) {
          console.log('Cannot authenticate to D2L right now.');
        } else {
          Linking.openURL(this.state.authenticationUrlD2L);
        }
      }).catch(err => console.error('D2L Authentication error: ', err));
    } else {
      Actions.error({
        message: 'QCC not supported yet.'
      });
      console.log('QCC not implemented');
    }
  }
}

module.exports = D2LLogin;
