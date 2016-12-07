import { connect } from 'react-redux'
import NavBar from './NavBar'

import { logOutUser } from 'fbw-platform-common/reducers/Login/logOutUser'
import { resetMissionState } from 'fbw-platform-common/reducers/Mission/resetMissionState'
import { resetSubjectState } from 'fbw-platform-common/reducers/Subject/resetSubjectState'

const mapStateToProps = (state, ownProps) => {
  return {
    isVisitorLogin: state.login.user && state.login.user.isVisitor,
    user: state.login.user,
    missions: state.mission ? state.mission.missions : null,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: data => {
      dispatch(logOutUser())
      dispatch(resetMissionState())
      dispatch(resetSubjectState())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
