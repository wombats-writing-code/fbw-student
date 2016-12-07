
'use strict';

import React, { Component, }  from 'react';
import _ from 'lodash';

import './QuestionHeader.scss'

class QuestionHeader extends Component {
  constructor(props) {
    super (props);

    this.state = {
      // pressAction: new Animated.Value(0)
    };
  }

  componentWillMount() {
    // this._value = 0;
    // this.state.pressAction.addListener((v) => this._value = v.value);
  }

  componentWillUnmount() {
    // this.state.pressAction.removeListener();
  }

  render() {
    let showMoreIcon, toggleButtonLabel = '';
    if (this.props.isExpandable && !this.props.isExpanded) {
      showMoreIcon = <img className="expand-question-icon" src={require('fbw-platform-common/assets/show-more--down@2x.png')}/>
      toggleButtonLabel = 'Expand question';

    } else if (this.props.isExpandable && this.props.isExpanded) {
      showMoreIcon = <img className="expand-question-icon" src={require('fbw-platform-common/assets/show-more--up@2x.png')}/>
      toggleButtonLabel = 'Hide question';
    }

    let toggleButton;
    if (this.props.isExpandable) {
      toggleButton = (
        <button className="expand-question-button" onClick={this.props.onShowMorePress}>
          {showMoreIcon}
        </button>
      )
    }

    return (
      <div className="question-header flex-container align-center">
        {this.props.questionTypeIcon}

        <p className="question-header-text">{this.props.headerText}</p>

        {toggleButton}

      </div>
    )
  }

}

module.exports = QuestionHeader;
