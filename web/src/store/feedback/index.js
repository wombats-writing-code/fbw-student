import axios from 'axios'
import _ from 'lodash'
import { getDomain } from 'fbw-platform-common/utilities'
import {GET_FEEDBACK_OPTIMISTIC, GET_FEEDBACK_SUCCESS} from './getFeedback'
import {SUBMIT_FEEDBACK_OPTIMISTIC, SUBMIT_FEEDBACK_SUCCESS} from './submitFeedback'


const initialState = {}
export default function feedbackReducer (state = initialState, action) {
  switch (action.type) {

    case SUBMIT_FEEDBACK_OPTIMISTIC:
      return _.assign({}, state, {
        isSubmitFeedbackInProgress: true
      });

    case SUBMIT_FEEDBACK_SUCCESS:
      return _.assign({}, state, {
        isSubmitFeedbackInProgress: false,
        feedbacks: _.compact(_.concat(state.feedbacks, action.feedback))
      });

    case GET_FEEDBACK_OPTIMISTIC:
      return _.assign({}, state, {
        isGetFeedbackInProgress: true
      })

    case GET_FEEDBACK_SUCCESS:
      return _.assign({}, state, {
        isGetFeedbackInProgress: false,
        feedbacks: _.compact(_.concat(state.feedbacks, action.feedback))
      })

    default:
      return state
  }
}
