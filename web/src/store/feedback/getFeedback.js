import axios from 'axios'
import _ from 'lodash'
import { getDomain } from '@wombats-writing-code/fbw-platform-common/utilities'

export const GET_FEEDBACK_OPTIMISTIC = 'GET_FEEDBACK_OPTIMISTIC'
export const GET_FEEDBACK_SUCCESS = 'GET_FEEDBACK_SUCCESS'


// =====
// get feedback
// =====

function getFeedbackOptimistic() {
  return {type: GET_FEEDBACK_OPTIMISTIC}
}

function getFeedbackSuccess(feedback) {
  return {type: GET_FEEDBACK_SUCCESS, feedback}
}

export function getFeedback(user, mission, goalId, target) {
  if (!user) {
      console.error('user must be provided in 1st arg of getFeedback')
  }
  if (!mission) {
      console.error('mission must be provided in 2nd arg of getFeedback')
  }
  if (!goalId) {
      console.error('goalId must be provided in 3rd arg of getFeedback')
  }
  if (!target) {
      console.error('target must be provided in 4th arg of getFeedback')
  }


  return function(dispatch) {
    dispatch(getFeedbackOptimistic())
    // console.log('will get feedback', user)

    return axios({
      url: `${getDomain()}/l4/feedback?user=${user._id}&mission=${mission._id}&directive=${goalId}&target=${target._id}`,
      headers: {
        'x-fbw-user': user.Identifier
      }
    })
    .then( res => {
      let feedback = res.data;
      dispatch(getFeedbackSuccess(feedback));

      return feedback;
    })
  }
}
