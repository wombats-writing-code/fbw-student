// Splash container
import { connect } from 'react-redux'

import { getUser } from 'fbw-platform-common/selectors/'


const mapStateToProps = (state, ownProps) => {
  console.log('state in SplashContainer', state)

  return {
    user: getUser(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
