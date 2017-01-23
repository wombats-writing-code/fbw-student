// MissionContainer.js

'use strict';

import React, { Component }  from 'react';
import { ActivityIndicator, Dimensions, ListView, ScrollView, Text, TouchableHighlight, View } from "react-native";
import {
  Actions
} from "react-native-router-flux";

import _ from 'lodash'


import DirectiveCarouselContainer from 'fbw-platform-common/components/mission/DirectiveCarouselContainer'
import DirectiveCarouselComponent from '../directive-carousel/DirectiveCarousel'
const DirectiveCarousel = DirectiveCarouselContainer(DirectiveCarouselComponent)

import TargetCarouselContainer from 'fbw-platform-common/components/mission/TargetCarouselContainer'
import TargetCarouselComponent from '../target-carousel/TargetCarousel'
const TargetCarousel = TargetCarouselContainer(TargetCarouselComponent)

import QuestionsContainer from 'fbw-platform-common/components/questions/QuestionsContainer'
import QuestionsComponent from '../questions/Questions'
const Questions = QuestionsContainer(QuestionsComponent)


const styles = require('./Mission.styles')


class Mission extends Component {

  componentDidMount() {
  }

  render() {
    if (!this.props.hasResults) {
      return (<View style={[styles.container, {paddingTop: 80, paddingLeft: 30}]}>
        <Text>You did not participate in this mission, so you have no results.</Text>
      </View>)
    }

    if (!this.props.hasQuestions) {
      return (<View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator/>
      </View>)
    }

    return (
      <View style={{flex: 1}}>
        <DirectiveCarousel />
        <TargetCarousel />
        <Questions />
      </View>
    )
  }

}

export default Mission
