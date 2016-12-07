
import { connect } from 'react-redux'
import Home from './components/Home'
import { getMissions } from 'fbw-platform-common/reducers/Mission/getMissions'
import { selectOpenMission } from 'fbw-platform-common/reducers/Mission/selectOpenMission'
import { selectClosedMission } from 'fbw-platform-common/reducers/Mission/selectClosedMission'

const mapStateToProps = (state, ownProps) => {
  // console.log('state', state);

  return {
    isVisitorLogin: state.login.user && state.login.user.isVisitor,
    user: state.login.user,
    bankId: state.subject.privateBankId ? state.subject.privateBankId : null,
    missions: state.mission ? state.mission.missions : null,
    isGetMissionsInProgress: state.mission ? state.mission.isGetMissionsInProgress : false,
    username: state.login ? state.login.user.displayName : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectOpenMission: data => dispatch(selectOpenMission(data)),
    onSelectClosedMission: data => dispatch(selectClosedMission(data)),
    getMissions: data => dispatch(getMissions(data))
  }
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Home)
}
