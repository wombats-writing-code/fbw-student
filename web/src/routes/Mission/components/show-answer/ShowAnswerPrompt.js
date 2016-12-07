
'use strict';

import React, {
    Component,
}  from 'react';

var _ = require('lodash');

var styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 21,
  },
  showTargetAnswerView: {
    padding: 21,
  },
  showTargetAnswerText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    padding: 10.5,
    borderRadius: 4,
  },
  cancelButton: {
    marginLeft: 21,
    backgroundColor: '#96CEB4',
  },
  showAnswerButton: {
    backgroundColor: '#FF6F69',
  },
  emphasis: {
    fontWeight: "700"
  }
}

class ShowAnswerPrompt extends Component {
  constructor(props) {
    super (props);

    this.state = {
    };
  }

  componentDidMount() {
    console.log('show answer prompt did mount');
  }

  render() {

    console.log('rendering ShowAnswerPrompt')

    let showTargetAnswerText;
    if (this.props.isTarget) {
      showTargetAnswerText = (
        <div style={styles.showTargetAnswerView}>
          <div style={styles.showTargetAnswerText}>Are you sure? Showing the answer will void this Target.
            You need to complete <p style={styles.emphasis}>{this.props.numTargets}</p>.
            You have done <p style={styles.emphasis}>{this.props.numCompleted}</p>.
            There are <p style={styles.emphasis}>{this.props.numPristine}</p> left.
          </div>
        </div>
      )
    }

    return (
      <div>

        {showTargetAnswerText}

        <div style={styles.buttons}>
          <button style={[styles.button, styles.showAnswerButton]} onClick={this.props.onConfirmShowAnswer}>
            <div style={styles.buttonText}>Yes, Show answer</div>
          </button>

          <button style={[styles.button, styles.cancelButton]} onClick={this.props.onCancel}>
            <div style={styles.buttonText}>Cancel</div>
          </button>
        </div>

      </div>
    )
  }
}

module.exports = ShowAnswerPrompt;
