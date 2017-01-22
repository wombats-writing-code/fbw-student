import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import AlgebraGuide from './AlgebraGuide'
import AccountingGuide from './AccountingGuide'

import './Guide.scss'

class Guide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subjectName: ''
    }
  }

  render() {
    let docs;
    if (this.state.subjectName === 'Algebra') {
      docs = <AlgebraGuide/>
    } else if (this.state.subjectName === 'Accounting') {
      docs = <AccountingGuide/>
    }

    return (
      <div>
        <div className="row button-bar">
          <button className={this.state.subjectName === 'Algebra' ? "button is-active" : "button"}
                  onClick={() => this.setState({subjectName: 'Algebra'})}>Algebra guide</button>
          <button className={this.state.subjectName === 'Accounting' ? "button is-active": "button"} 
                  onClick={() => this.setState({subjectName: 'Accounting'})}>Accounting guide</button>
        </div>
        {docs}
      </div>
    )
  }
}

export default Guide
