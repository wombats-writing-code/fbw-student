import React from 'react'

import '../../styles/animations.scss'
import './LoadingBox.scss'

export const LoadingBox = (props) => {
  switch (props.type) {
    case 'enter':
      return (<div className="loading-box draw-enter"></div>)

    case 'enter-active':
      return (<div className="loading-box draw-enter draw-enter-active">
                <span className="fade-in-out">Loading...</span>
              </div>)

    default:
      return null
  }
}

export default LoadingBox
