import React, {Component} from 'react'

import './FeedbackWidget.scss'

class FeedbackWidget extends Component {

  componentDidMount() {
    let props = this.props;
    if (props.user && props.mission && props.goalId && props.target) {
      props.getFeedbackForRoute(props.user, props.mission, props.goalId, props.target);
    }
  }

  render() {
    let props = this.props;

    let selectedStyle = {
      fontWeight: '500'
    };

    let unselectedStyle = {
      color: '#888',
      opacity: .7
    }

    if (!props.isVisible || props.isGetFeedbackInProgress || !props.mission) return null

    // console.log('props.feedback', props.feedback)
    if (props.feedback && props.feedback.response) return null;

    return (
      <div className="feedback-widget">
        <p>Did you find this route helpful?</p>
        <div className="flex-container">
          <button className="button feedback-widget__button yes"
                  style={props.feedback && props.feedback.response === 'yes' ? selectedStyle : null}
                  onClick={() => this._onClickFeedback('yes')}

            >
            <img className="feedback-widget__button-icon" src={require('./assets/thumbs-up.png')}/>
            Yes!
          </button>
          <button className="button feedback-widget__button no"
                  style={props.feedback && props.feedback.response === 'yes' ? selectedStyle : null }
                  onClick={() => this._onClickFeedback('no')}
            >
            <img className="feedback-widget__button-icon" src={require('./assets/thumbs-down.png')}/>
            No
          </button>
        </div>

      </div>
    )
  }

  _onClickFeedback(response) {
    let props = this.props;
    console.log('routeQuestions', props.routeQuestions)

    props.onClickFeedback({
      response,
      user: props.user,
      mission: props.mission,
      goal: props.goalId,
      target: props.target,
      routeQuestions: props.routeQuestions,
    })
  }
}

export default FeedbackWidget
