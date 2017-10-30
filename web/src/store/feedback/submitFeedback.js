import axios from 'axios'
import _ from 'lodash'
import { getDomain } from '@wombats-writing-code/fbw-platform-common/utilities'

export const SUBMIT_FEEDBACK_OPTIMISTIC = 'SUBMIT_FEEDBACK_OPTIMISTIC'
export const SUBMIT_FEEDBACK_SUCCESS = 'SUBMIT_FEEDBACK_SUCCESS'

// =====
// submit feedback
// =====

function submitFeedbackOptimistic() {
  return {type: SUBMIT_FEEDBACK_OPTIMISTIC}
}

function submitFeedbackSuccess(feedback) {
  return {type: SUBMIT_FEEDBACK_SUCCESS, feedback}
}

export function submitFeedback(data) {
  return function (dispatch) {
    dispatch(submitFeedbackOptimistic())

    // console.log('submitFeedback', data)

    return axios({
        method: 'POST',
        url: `${getDomain()}/l4/feedback`,
        data: {
          feedback: {
            response: data.response,
            user: data.user._id,
            mission: data.mission._id,
            goal: data.goal,
            target: data.target._id,
            routeQuestions: data.routeQuestions
          }
        },
        headers: {
          'x-fbw-user': data.user.Identifier
        }
    })
    .then( res => {
      let feedback = res.data;
      dispatch(submitFeedbackSuccess(feedback))
      return feedback
    })
  }
}
