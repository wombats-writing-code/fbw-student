
'use strict';

import React, {
    Component,
}  from 'react';
import { Icon } from 'react-fa'

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
  solutionText: {
    color: '#fff'
  }
}

class ShowAnswer extends Component {
  constructor(props) {
    super (props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <button onPress={this.props.dismiss}>
              <Icon name="times-circle-o"
                    size="2x"
                    style={styles.solutionText}/>
            </button>
          </div>
          <div>
            <Text style={styles.solutionText}>{this.props.solution}</Text>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ShowAnswer;
