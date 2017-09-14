import '../../styles/foundation.min.css'

import React from 'react'
import NavBar from 'fbw-platform-common/components/nav-bar/web'
import { LiveAnnouncer } from 'react-aria-live'

import './CoreLayout.scss'
import '../../styles/core.scss'

import '../../styles/common.css'

import OutcomeVisual from '../../components/OutcomeVisual'
import FeedbackWidget from '../../components/FeedbackWidget'

export const CoreLayout = ({ children }) => {
  let feedbackWidget;
  feedbackWidget = (
    <FeedbackWidget />
  )

  let outcomeVisual = <OutcomeVisual />

  return (
    <div className='container text-center' style={{height: '100%', width: '100%'}}>
      <LiveAnnouncer>
        <NavBar {...children.props}/>
        <div className='core-layout__viewport'>
          {children}
          {feedbackWidget}
          {/* {outcomeVisual} */}
        </div>
      </LiveAnnouncer>
    </div>
  )
}


CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
