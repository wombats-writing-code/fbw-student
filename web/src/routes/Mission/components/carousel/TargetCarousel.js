'use strict'

import React, {Component} from 'react'
import { targetStatus, targetKey } from 'fbw-platform-common/selectors'

var _ = require('lodash');

import './TargetCarousel.scss'

class TargetCarousel extends Component {
  constructor() {
    super();
    this.buttonRefs = [];
  }

  componentDidUpdate() {
    // let's shift focus to here, so keyboard users
    // know that they should navigate within targets
    if (this.props.targets && this.props.targets.length > 0 && !this.props.currentTarget) {
      _.compact(this.buttonRefs)[0].focus()
    }
  }

  _renderTarget = (target, idx) => {
    let status = targetStatus(target);
    let targetNumber = targetKey(target)
    let image;
    switch(status) {
      case 'COMPLETE':
        image = <img className="target-icon" src={require('fbw-platform-common/assets/target-question--correct@2x.png')}/>;
        break;
      case 'FAIL':
        image = <img className="target-icon" src={require('fbw-platform-common/assets/target-question--incorrect@2x.png')}/>;
        break;
      case 'NAVIGATED':
        image = <img className="target-icon"src={require('fbw-platform-common/assets/target-question--navigated@2x.png')}/>;
        break;
      case 'PRISTINE':
        image = <img className="target-icon" src={require('fbw-platform-common/assets/target-question@2x.png')}/>;
        break;

      default:
        console.warn('Warning: unrecognized status', status);
        image = <img src={require('fbw-platform-common/assets/target-question@2x.png')}/>;
    }

    let accessibilityLabel = `Target Question ${target.displayName.text}`;
    let isActive = targetNumber === targetKey(this.props.currentTarget);
    if (idx === 0) {
      this.buttonRefs = []
      // for some reason this was not getting set to [], and thus
      // the new button refs kept being appended
    }
    let thumb = (
      <li key={target.id} className={isActive ? "carousel-thumb is-active" : "carousel-thumb"}
          onClick={() => this.props.onSelectTarget(target)}>
        <button className="carousel-thumb__button" ref={(btn) => this.buttonRefs.push(btn)}
          aria-label={`Target Question ${targetNumber}`}>
          <div className="flex-container align-center">
            {image}
            <p className="carousel-thumb__text carousel-thumb__text--target bold">{target.displayName.text}</p>
          </div>
        </button>
      </li>
    )

    return thumb;

  }

  render() {
    // let totalQuestions = this.props.targets.length || 0,
      // requiredAccessibilityLabel = `Required: ${this.props.requiredNumber} of ${totalQuestions}`;
    if (!this.props.targets ||
        (this.props.targets && this.props.targets.length === 0)) {
      return (
        <div></div>
      )
    }

    this.buttonRefs = []
    return (
      <div className="carousel-container flex-container align-top">
        <p className="carousel-label">Targets</p>
        <ul className="carousel flex-container align-center" >
          {_.map(this.props.targets, this._renderTarget)}
        </ul>
      </div>
    )
  }

}

export default TargetCarousel
