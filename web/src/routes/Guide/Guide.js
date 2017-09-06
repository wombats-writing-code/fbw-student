import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'

import AlgebraGuide from './AlgebraGuide'
import AccountingGuide from './AccountingGuide'

import './Guide.scss'

class Guide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subjectName: '',
      transcriptExpanded: false
    }
  }

  render () {
    let docs;
    if (this.state.subjectName === 'Algebra') {
      docs = <AlgebraGuide
        transcriptExpanded={this.state.transcriptExpanded}
        onClickToggleTranscript={this._onClickToggleTranscript}
      />
    } else if (this.state.subjectName === 'Accounting') {
      docs = <AccountingGuide
        transcriptExpanded={this.state.transcriptExpanded}
        onClickToggleTranscript={this._onClickToggleTranscript}
      />
    }

    return (
      <DocumentTitle title="Fly-by-Wire Help Guides">
        <div>
          <div className="row button-bar">
            <button className={this.state.subjectName === 'Algebra' ? "button is-active" : "button"}
                    onClick={() => this.setState({subjectName: 'Algebra'})}>Algebra guide</button>
            <button className={this.state.subjectName === 'Accounting' ? "button is-active": "button"}
                    onClick={() => this.setState({subjectName: 'Accounting'})}>Accounting guide</button>
          </div>
          {docs}
        </div>
      </DocumentTitle>
    )
  }

  _onClickToggleTranscript = () => {
    this.setState({ transcriptExpanded: !this.state.transcriptExpanded })
  }
}

export default Guide
