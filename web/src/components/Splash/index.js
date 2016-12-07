import React, {Component} from 'react'
import { browserHistory } from 'react-router'

class Splash extends Component {
  componentDidMount () {
    this.props.onInitialize()
  }

  render() {
    return <div></div>
  }

}

export default Splash
