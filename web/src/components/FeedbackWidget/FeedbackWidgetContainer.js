import _ from 'lodash'
import { connect } from 'react-redux'

import {getUser} from '@wombats-writing-code/fbw-platform-common/selectors'
import {getRouteQuestions} from '@wombats-writing-code/fbw-platform-common/selectors/mission'
import {submitFeedback} from '../../store/feedback/submitFeedback'
import {getFeedback} from '../../store/feedback/getFeedback'
import component from './FeedbackWidget'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in FeedbackWidgetContainer', state)


  return {
    user: getUser(state),
    mission: state.mission.currentMission,
    goalId: selectGoal(state),
    target: selectTarget(state),
    feedback: selectRouteFeedback(state),
    routeQuestions: selectRouteQuestions(state),
    isGetFeedbackInProgress: state.feedback.isGetFeedbackInProgress,
    isSubmitFeedbackInProgress: state.feedback.isSubmitFeedbackInProgress,
    isVisible: false
  }
}

const selectGoal = state => {
  return state.mission.currentMission ? state.mission.currentMission.goals[state.mission.currentDirectiveIndex] : null
}

const selectTarget = state => {
  return state.mission.currentTarget
}

const selectRouteFeedback = (state) => {
  if (state.mission.currentMission && state.mission.currentTarget) {
    let goal = state.mission.currentMission.goals[state.mission.currentDirectiveIndex];

    return _.find(state.feedback.feedbacks, {mission: state.mission.currentMission.id, goal, target: state.mission.currentTarget.id})
  }
  return null
}

const selectRouteQuestions = (state) => {
  if (state.mission.currentMission && state.mission.currentMission.questions) {
    // console.log('state.mission.currentDirectiveIndex', state.mission.currentDirectiveIndex)
    // console.log('section questions', state.mission.currentMission.questions[state.mission.currentDirectiveIndex])

    return getRouteQuestions(state.mission.currentMission.questions[state.mission.currentDirectiveIndex], state.mission.currentTarget);
  }

  return null
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeedbackForRoute: (user, mission, goal, target) => dispatch(getFeedback(user, mission, goal, target)),
    onClickFeedback: (data) => dispatch(submitFeedback(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(component)
