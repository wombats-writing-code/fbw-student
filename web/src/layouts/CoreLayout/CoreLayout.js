import '../../styles/foundation.min.css'

import React from 'react'
import NavBar from 'fbw-platform-common/components/nav-bar/web'

import './CoreLayout.scss'
import '../../styles/core.scss'

import '../../styles/common.css'

export const CoreLayout = ({ children }) => {
  return (
    <div className='container text-center' style={{height: '100%', width: '100%'}}>
      <NavBar {...children.props}/>
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  )
}


CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
