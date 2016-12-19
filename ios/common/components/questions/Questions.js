// Questions.js
// * This should check and take care of the student
//   authorization in QBank for the FbW side of things.

'use strict';

import React, { Component }  from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import {isTarget, filterItemsByTarget, targetKey, directiveIdsFromQuestions} from 'fbw-platform-common/selectors/'

var _ = require('lodash');

import QuestionContainer from 'fbw-platform-common/containers/QuestionContainer'
import QuestionComponent from '../question-card/QuestionCard'
const QuestionCard = QuestionContainer(QuestionComponent)

var AnsweredQuestionCard = require('../question-card/AnsweredQuestionCard');
var AnsweredQuestionCue = require('../question-card/AnsweredQuestionCue');
var ShowAnswerPrompt = require('../show-answer/ShowAnswerPrompt');
var ShowAnswer = require('../show-answer/ShowAnswer');

var styles = require('./Questions.styles');
var BASE_STYLES = require('fbw-platform-common/styles/base-styles');


class Questions extends Component {
  renderListRow = (questionItem, sectionId, rowId) => {

    let outcome = _.find(this.props.outcomes, {id: questionItem.learningObjectiveIds[0]});

    // console.log('row', rowId, 'total length', this.props.questions.length, 'questions', this.props.questions);

    if (questionItem.responded) {
      // let hasNextQuestion = (questionItem !== _.last(this.props.questions));
      let nextQuestion = this.props.questions[parseInt(rowId)+1];

      let nextOutcome;
      if (nextQuestion && questionItem.response.isCorrect) {
        nextOutcome = _.find(this.props.outcomes, {id: nextQuestion.learningObjectiveIds[0]});

      } else if (nextQuestion && questionItem.response.confusedLearningObjectiveIds && !questionItem.response.isCorrect){
        nextOutcome = _.find(this.props.outcomes, {id: questionItem.response.confusedLearningObjectiveIds[0]});
      }

      // if (!nextOutcome) {
      //   console.log('questionItem', questionItem);
      //   console.log('nextQuestion', nextQuestion);
      // }

      // AnsweredQuestionCard should be expanded if: 1) it's the only item in the list or 2) it's the last responded item
      let isExpanded = false;
      if (!nextQuestion || !nextQuestion.responded) {
        isExpanded = true;
      }

      return (
        <View>
          <AnsweredQuestionCard question={questionItem} outcome={outcome} isExpanded={isExpanded}/>
          <AnsweredQuestionCue isLastTarget={this.props.isLastTarget}
                               response={questionItem.response}
                               outcome = {outcome}
                               nextQuestion={nextQuestion}
                               nextOutcome={nextOutcome}/>
        </View>
      )

    } else {

      return (
        <QuestionCard question={questionItem}/>
       )
    }
  }

  listViewDidLayout = (thing) => {
    // console.log('native event', thing.nativeEvent);
    let nativeEvent = thing.nativeEvent;
    this.props.onSetListViewHeight(nativeEvent.layout.height);
  }

  render() {
    if (!this.props.questions) {
      return null;
    }

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });

    // console.log('will render questions', this.props.questions);

    let inProgressIndicator;
    if (this.props.isInProgressSubmitChoice) {
      inProgressIndicator = (
        <View style={styles.isInProgressSubmitChoice}>
          <Text style={BASE_STYLES.textCenter}>
            Please wait while we check your answer...
          </Text>
          <ActivityIndicator style={BASE_STYLES.activityIndicator} />
        </View>);
    }


    // TODO: height needs to be 1) be dynamic to webview content,
    // 2) need to animate on set question history state
    let infiniteTimelineHeight = {
      height: this.props.questionListHeight,
    };

    let infiniteTimeline = (<View style={[styles.infiniteTimeline, infiniteTimelineHeight]}></View>);

    let showAnswer;
    // if (this.state.didConfirmToShowAnswer) {
    //   showAnswer = (<ShowAnswer dismiss={this.handleDismissAnswer}
    //                             solution={this.state.didConfirmToShowAnswer}
    //   />)
    // }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {infiniteTimeline}
          <ListView
              dataSource={ds.cloneWithRows(this.props.questions)}
              renderRow={this.renderListRow}
              onLayout={this.listViewDidLayout}
          >
          </ListView>

          {inProgressIndicator}
        </ScrollView>

        {showAnswer}
      </View>
    )
  }

  // onPressForAnswer = (question) => {
  //   this.setState({
  //     didPressToShowAnswer: question
  //   });
  // }
  //
  // handleCancelShowAnswer = () => {
  //   this.setState({
  //     didPressToShowAnswer: null
  //   });
  // }
  //
  // handleDismissAnswer = () => {
  //   this.setState({
  //     didPressToShowAnswer: null,
  //     didConfirmToShowAnswer: null
  //   })
  //   // this should never have to reload -- if you see the worked solution
  //   // of a target question, there are no waypoints -- just pick another
  //   // target manually.
  //   // this.reloadQuestions();
  // }

}


module.exports = Questions
