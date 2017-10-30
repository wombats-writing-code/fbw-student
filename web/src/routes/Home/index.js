
import { connect } from 'react-redux'
import Home from './components/Home'
import { getMissions } from '@wombats-writing-code/fbw-platform-common/reducers/Mission/getMissions'
import { selectOpenMission } from '@wombats-writing-code/fbw-platform-common/reducers/Mission/selectOpenMission'
import { selectClosedMission } from '@wombats-writing-code/fbw-platform-common/reducers/Mission/selectClosedMission'
import {getCurrentCourse} from '@wombats-writing-code/fbw-platform-common/selectors/course'
import {getUser} from '@wombats-writing-code/fbw-platform-common/selectors/'

const mapStateToProps = (state, ownProps) => {
  console.log('state in HomeContainer', state);

  return {
    isVisitor: state.login.isVisitor,
    user: getUser(state),
    currentCourse: getCurrentCourse(state),
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
