import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './Introduction.scss'

class Introduction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transcriptExpanded: false
    }
  }

  componentDidMount() {
    this.video.setAttribute("controlsList", "nodownload");
  }

  render () {
    let transcript = <article
      aria-expanded={this.state.transcriptExpanded}
      className="transcript"></article>

    if (this.state.transcriptExpanded) {
      transcript = (
        <article
          aria-expanded={this.state.transcriptExpanded}
          className="transcript transcript__expanded">
          <div className="row">
            <h3 className="columns">Video Transcript</h3>
          </div>
          <div className="row">
            <p>Hi, I'm Dipa.</p>
            <p>Hi, I'm Cole.</p>
            <p>For the last two years, we've been working on a project called Fly-by-Wire.</p>
            <p>Fly-by-Wire is funded by the Department of Ed, and led by Karen Willcox and Vijay Kumar, at MIT.</p>
            <p>Fly-by-Wire is a collaboration between MIT and Arapahoe Community College.</p>
            <p>The tool we've developed lets students review the course concepts before every exam.</p>
            <p>It will provide you feedback on which concepts you might need additional practice in, and also provide
              you practice problems to help you improve your understanding of those concepts.</p>
            <p>We really appreciate that you're using Fly-by-Wire this term.</p>
            <p>We think it's really going to help you with your course material, and we look forward to your feedback.</p>
          </div>
        </article>
      )
    }

    return (
      <DocumentTitle title="Fly-by-Wire Introduction">
        <div>
          <LiveMessage message="Fly-by-Wire Introduction Video" aria-live="polite" />
          <h1>Introduction to Fly-by-Wire</h1>
          <div className="guide">
            <section className="splash-banner text-center flex-container align-center justify-center">
              <video
                width="100%"
                height="400"
                controls
                controlsList="nodownload"
                ref={(video) => { this.video = video }}
              >
                <source src="/FbW_Intro.mp4" type="video/mp4" />
                <track src="/FbW_Intro.vtt" kind="subtitles" srcLang="en" label="English" />
                Your browser does not support the video tag ... please use a newer version.
              </video>
              <button
                aria-label={this.state.transcriptExpanded ? "Hide transcript" : "Show transcript"}
                aria-pressed={this.state.transcriptExpanded}
                type="checkbox"
                id="transcript-toggle"
                onClick={this._onClickToggleTranscript}
                className={this.state.transcriptExpanded ? "toggle-me toggle-me__pressed" : "toggle-me"}>
                <span className="transcript-button-label">Transcript</span>
                <img
                  aria-hidden
                  className={this.state.transcriptExpanded ? "arrow-toggle arrow-toggle__expanded": "arrow-toggle"}
                  src={require('@wombats-writing-code/fbw-platform-common/assets/show-more--down@2x.png')} />
              </button>
              {transcript}
            </section>
          </div>
        </div>
      </DocumentTitle>
    )
  }

  _onClickToggleTranscript = () => {
    this.setState({ transcriptExpanded: !this.state.transcriptExpanded })
  }
}

export default Introduction
