// QuestionCard.js

'use strict';

import React, { Component, }  from 'react';
import {
  Dimensions,
  ListView, ScrollView,
  Text,View,Image,
  TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback,
  StyleSheet
} from "react-native";

import { hasAchievedDirective } from 'fbw-platform-common/selectors'

var _ = require('lodash');

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  carouselContainer: {
    flexDirection: 'column',
    backgroundColor: '#ddd',
    paddingLeft: 8.5,
    paddingTop: 70,
    paddingBottom: 8.5,
    flex: 1,
  },
  carousel: {
    paddingLeft: 2,
    paddingBottom: 2,
    paddingTop: 2
  },
  carouselLabel: {
    color: '#444',
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 2
  },
  thumb: {
    // paddingTop: 8,
    // paddingBottom: 5,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    maxWidth: 140,
    height: 45,
    backgroundColor: '#eee',
    borderRadius: 1,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#ddd',
    marginRight: 10.5,
  },
  selectedThumb: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOpacity: .6,
    shadowOffset: {width: 0, height: 0},
    // borderBottomColor: '#3498DB'
  },
  // thumbWrapper: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap'
  // },
  thumbLabel: {
    fontSize: 10,
    color: '#333',
    textAlign: 'left',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
    // flex: 1
  },
  directiveStatusIcon: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 10,
    marginRight: 14,
    color: '#96CEB4',
    // width: 12,
    // height: 12,
  },
  emphasis: {
    color: '#888',
    fontSize: 12,
    fontWeight: "600",
  },
  mute: {
    color: '#888',
    fontSize: 12,
    fontWeight: "300",
  },
});


class DirectiveCarousel extends Component {
  _renderThumb = (directive, idx) => {
    let outcomeTargets = _.filter(this.props.targets, (t) => t.learningObjectiveIds.indexOf(directive.learningObjectiveId) > -1);
    let outcome = _.find(this.props.outcomes, {id: directive.learningObjectiveId})
    let image;
    if (hasAchievedDirective(outcomeTargets) === true) {
      // image = <Image style={styles.directiveStatusIcon} source={require('../../assets/responseType--correct.png')}/>
      image = <Text style={styles.directiveStatusIcon}>&#x02713;</Text>
    } else if (hasAchievedDirective(outcomeTargets) === false) {
      image = <Text style={styles.directiveStatusIcon}>&#x02717;</Text>
    }

    let displayName = typeof outcome === 'undefined' ? 'Unknown LO' : outcome.displayName.text;
    let thumb = (
      <TouchableOpacity onPress={() => this.props.onSelectDirective(idx)}
                          style={[styles.thumb, idx === this.props.currentDirectiveIndex ? styles.selectedThumb : null]}
                          key={idx}>
          <Text style={styles.thumbLabel}>
            {image}
            {displayName}
          </Text>
    </TouchableOpacity>)

    return thumb;

  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.carouselContainer}>
          <Text style={styles.carouselLabel}>DIRECTIVES</Text>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={styles.carousel}
          >
              {_.map(this.props.directives, this._renderThumb)}
          </ScrollView>
        </View>

      </View>
    )
  }

}

module.exports = DirectiveCarousel;
