// Choice.js

'use strict';

import React, {
    Component,
}  from 'react';

var _ = require('lodash');
var Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
import './Choices.scss'

class Choices extends Component {
  componentDidMount() {
    if (this.props.grabFocus && this.choiceButtonRefs) {
      this.choiceButtonRefs[0].focus()
    }
  }

  renderChoice = (choice, idx) => {
    let height = this.props.heightByChoice[choice.id] || 14;

    // console.log('height for', choice.id, height);

    let respondedChoiceIcon;
    // we style it a bit differently if it's a responded-to choice
    if (this.props.responseId && this.props.responseId === choice.id) {
      if (this.props.isResponseCorrect) {
        respondedChoiceIcon = <img className="responded-choice-icon" src={require('fbw-platform-common/assets/responseType--correct@2x.png')} />

      } else {
        respondedChoiceIcon  = <img className="responded-choice-icon" src={require('fbw-platform-common/assets/responseType--incorrect@2x.png')} />
      }
    }

    let isChoiceSelected = this.props.responseId && this.props.responseId === choice.id ||
                            this.props.selectedChoiceId === choice.id;

    let inactiveStyle = {pointerEvents: 'none', cursor: 'default'}

    return (
      <li key={choice.id} className={isChoiceSelected ? "choice is-selected" : "choice"} style={this.props.responseId && inactiveStyle}>
        <button className="choice__button"
                onClick={() => this.props.onSelectChoice(choice.id, this.props.question.id)}
                ref={(btn) => this.choiceButtonRefs.push(btn)}>

          <div className="choice__row flex-container align-center">
            <span className="choice__label">
              {Alphabet[idx]}&#x00029;
            </span>

            <div className="choice__text" dangerouslySetInnerHTML={{__html: choice.text}}></div>

            {respondedChoiceIcon}
          </div>
        </button>
      </li>
    )
  }

  render() {
    this.choiceButtonRefs = []
    return (
      <ul className="choices">
        {_.map(this.props.choices, this.renderChoice)}
      </ul>
    )
  }

  _adjustChoiceRowHeight= (height, choiceId) => {
    // console.log('calculated height for choice', height);
    this.props.onSetChoiceHeight({choiceId: height})
  }

}

module.exports = Choices;
