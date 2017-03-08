
import { connect } from 'react-redux'
import Home from './components/Home'
import { getMissions } from 'adaptive-common/reducers/Mission/getMissions'
import { selectOpenMission } from 'adaptive-common/reducers/Mission/selectOpenMission'
import { selectClosedMission } from 'adaptive-common/reducers/Mission/selectClosedMission'
import {getEnrolledSubject} from 'adaptive-common/selectors/bank'
import {getUser} from 'adaptive-common/selectors/'

const mapStateToProps = (state, ownProps) => {
  console.log('state in Home', state);

  return {
    isVisitor: state.login.isVisitor,
    user: getUser(state),
    bank: getEnrolledSubject(state),
    missions: state.mission ? state.mission.missions : null,
    isGetMissionsInProgress: state.mission ? state.mission.isGetMissionsInProgress : false,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // onSelectOpenMission: data => dispatch(selectOpenMission(data)),
    // onSelectClosedMission: data => dispatch(selectClosedMission(data)),
    getMissions: data => dispatch(getMissions(data))
  }
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Home)
}
