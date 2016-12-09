import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import { enrollments, whoami, stringifyUsername } from 'fbw-platform-common/d2lutils'
import credentials from '../../d2lcredentials'

const styles = {
  container: {
    backgroundColor: '#86bEa4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  usernameInput: {
    fontSize: 20,
    textAlign: 'center',
    height: 42,
    marginTop: 21,
    marginBottom: 21
  },
  // usernameInputWrapper: {
  //   maxWidth: 320,
  //   height: 42,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#eee',
  //   borderStyle: 'solid'
  // },
  schoolButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 21
  },
  schoolButton: {
    flexDirection: 'row',
    width: 250,
    padding: 10.5,
    margin: 24,
    border: '1px solid #fff',
    borderRadius: 5,
    justifyContent: 'center'
  },
  schoolButtonText: {
    color: '#fafafa',
    fontSize: 24,
    textAlign: 'center'
    // flex: 1,
    // width: 130,
    // minWidth: 130,
    // maxWidth: 130
  },
  disabledButton: {
    flexDirection: 'row',
    width: 250,
    padding: 10.5,
    margin: 24,
    border: '1px solid #dddddd',
    backgroundColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    opacity: 0.5
  },
  disabledButtonText: {
    color: '#fafafa',
    fontSize: 24,
    textAlign: 'center'
  },
  loginButton: {
    width: 140,
    backgroundColor: 'transparent',
    margin: 10,
    padding: 10,
    border: '1px solid #fff',
    borderRadius: 5
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: "600",
    color: '#fff'
  },
  cancelButton: {
    width: 70,
    backgroundColor: 'transparent',
    margin: 5,
    padding: 5,
    border: '1px solid #fff',
    borderRadius: 5
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: "300",
    color: '#fff',
    fontSize: 12
  },
  visitorLoginWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  visitorLoginContainer: {
    padding: 25,
    margin: 24,
    border: '1px solid #fff',
    borderRadius: 5,
    width: 300
  },
  navTitle: {
    color: '#fff'
  }
}

class D2LCallback extends Component {

  componentDidMount () {
    // console.log(this.props)
    let url = `${this.props.location.pathname}${this.props.location.search}`
    // console.log('mounted d2l callback!', url)
    this.props.onSetD2LAuthenticatedUrl(url)
    // now get the user enrollments and set them in the global state
    enrollments(credentials, url)
    .then((studentBankIds) => {
      // console.log("got bank ids", instructorBankIds)
      this.props.onSetEnrolledSubjects(studentBankIds)
      return whoami(credentials, url)
    })
    .then((response) => {
      // console.log('logging in', response)
      this.props.login('acc', stringifyUsername(response))
      browserHistory.push('/subjects')
    })
  }

  render() {
    return (
      <div>
        <h1>Redirecting you to your dashboard ...</h1>
      </div>
    )
  }

}

export default D2LCallback
