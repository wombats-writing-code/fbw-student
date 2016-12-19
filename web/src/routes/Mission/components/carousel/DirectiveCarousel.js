'use strict'

import React, {Component} from 'react'
import _ from 'lodash'

import { hasAchievedDirective } from 'fbw-platform-common/selectors'
import LoadingBox from '../../../../components/LoadingBox'
import './DirectiveCarousel.scss'

class DirectiveCarousel extends Component {

  _renderThumb = (directive, idx) => {
    let outcomeTargets = _.filter(this.props.targets, (t) => t.learningObjectiveIds.indexOf(directive.learningObjectiveId) > -1);
    let outcome = _.find(this.props.outcomes, {id: directive.learningObjectiveId})

    let image;
    if (hasAchievedDirective(outcomeTargets) === true) {
      image = <p className="carousel-thumb__icon">&#x02713;</p>

    } else if (hasAchievedDirective(outcomeTargets) === false) {
      image = <p className="carousel-thumb__icon warning-color">&#x02717;</p>
    }

    let displayName = outcome ? outcome.displayName.text : 'Error. Somehow this outcome is undefined';

    let isActive = idx === this.props.currentDirectiveIndex;
    let thumb = (
      <div key={idx}
          className={isActive ? "carousel-thumb is-active carousel-thumb--directive" : "carousel-thumb carousel-thumb--directive"}>
        <button className="carousel-thumb__button" onClick={() => this.props.onSelectDirective(idx)}
                aria-label={`Learning Outcome: ${displayName}`}>
          <div className="flex-container align-center space-between">
            {image}
            <p className="carousel-thumb__text">{displayName}</p>
          </div>
        </button>
      </div>
    )

    return thumb;
  }

  render() {
    // let loadingBox;
    // if (!this.props.directives) {
    //   loadingBox = (
    //     <LoadingBox type="enter-active"/>
    //   )
    // } else {
    //   loadingBox = (
    //     <LoadingBox type="enter"/>
    //   )
    // }

    let directivesCarousel;
    if (this.props.directives && this.props.directives.length > 0) {
      directivesCarousel = (
        <div className="carousel-container directive-carousel flex-container align-center">
          <div className="carousel-label">Directives</div>
          <div className="carousel flex-container align-center">
            {_.map(this.props.directives, this._renderThumb)}
          </div>
        </div>
      )
    }

    return (
      <div className="">
        {directivesCarousel}
      </div>

    )
  }
}

export default DirectiveCarousel
