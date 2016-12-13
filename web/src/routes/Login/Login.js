import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import { getAuthenticationUrl } from 'fbw-platform-common/d2lutils'
import credentials from '../../d2lcredentials'

import './Login.scss'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isVisitorLoginVisible: false
    }
  }

  componentDidMount () {
    if (this.props.username) {
      this.props.logout()
    }
  }

  componentDidUpdate () {
    if (this.props.isVisitor) {
      this.textInput.focus()
    }
  }

  render() {
    const props = this.props;

    let loginButtonText
    if (props.isLoginInProgress) {
      loginButtonText = (<div className="">Logging you in...</div>)
    } else {
      loginButtonText = (<div className="">
        Login
      </div>)
    }

    let visitorLogin,
      visitorButtonText = 'Visiting?';
    if (this.state.isVisitorLoginVisible) {
      visitorButtonText = 'Cancel';

      let loginButton = (
        <button type="submit" disabled={this.props.username ? false : true} className="login-form-button login-form-button--submit">
          {loginButtonText}
        </button>
      )

      visitorLogin = (
        <div className="medium-5 medium-centered columns">
          <form onSubmit={(e) => this._loginUserSimple(e)}>
            <input type="text"
              ref={(input) => {this.textInput = input;}}
              onChange={(e) => props.updateUsername({ username: e.target.value.toUpperCase() })}
              placeholder='Username'
              className="login-form__input"
              value={props.username} />

            {loginButton}
          </form>
        </div>
      )
    }

    return (
      <div className="login">
        <h1 className="app-name">Fly-by-Wire</h1>

        <div className="school-buttons flex-container space-between medium-5 medium-centered columns">
          <button onClick={() => this._handleACCLogin()}
            className="login-form-button login-form-button--d2l flex-container align-center">
            Arapahoe <img className="d2l-login-button__image" src={require('fbw-platform-common/assets/myACC.png')} />
          </button>
          <button disabled
            className="login-form-button login-form-button--d2l is-disabled">
            Quinsigamond
          </button>
        </div>

        <button className="visiting-prompt-button" onClick={() => this.setState({isVisitorLoginVisible: !this.state.isVisitorLoginVisible})} >
          {visitorButtonText}
        </button>

        {visitorLogin}

      </div>
    )
  }

  _handleACCLogin = () => {
    let authenticationUrl = getAuthenticationUrl(credentials)
    window.open(authenticationUrl, '_self')
  }

  _loginUserSimple = (e) => {
    console.log(this.props.username)

    e.preventDefault();
    if (this.props.username !== '') {
      this.props.login('fbw-visitor', this.props.username)
      this._goToSubjects(null)  // for default banks
    }
  }

  _goToSubjects = (bankIds) => {
    // leave bankIds null for default banks
    this.props.onSetEnrolledSubjects(bankIds)
    browserHistory.push('/subjects')
  }

  _onLogin(username, school) {
    this.props.login(username, school);
    browserHistory.push('/')
  }

}

export default Login
