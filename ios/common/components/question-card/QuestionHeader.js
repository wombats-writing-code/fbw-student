
import React, { Component, }  from 'react';
import {
  Dimensions, Animated,
  TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text
} from "react-native";

var _ = require('lodash');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 7,
    marginTop: 6.5
  },
  questionTypeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    flex: 1
  },
  header: {
    flex: 25,
  },
  headerText: {
    color: '#444444',
    fontWeight: "300",
    fontStyle: 'italic',
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  showMoreButton: {
    maxWidth: 20,
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 3
  },
  showMoreIcon: {
    width: 20,
    height: 20,
  },
  headerButtonWrappper: {
    position: 'relative',
  },
  bgFill: {
    position: 'absolute',
    top: -10,
    left: -7
  }
});

const SHOW_ANSWER_TIMER = 3000;
const COLORS = ['rgb(255,255,255)', 'rgb(230,100,62)'];

class QuestionHeader extends Component {
  constructor(props) {
    super (props);

    this.state = {
      pressAction: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this._value = 0;
    this.state.pressAction.addListener((v) => this._value = v.value);
  }

  componentWillUnmount() {
    this.state.pressAction.removeListener();
  }

  render() {

    let showMoreIcon = <View></View>,
      toggleButtonLabel = '';
    if (this.props.isExpandable && !this.props.isExpanded) {
      showMoreIcon = <Image style={styles.showMoreIcon} source={require('fbw-platform-common/assets/show-more--down@2x.png')}/>
      toggleButtonLabel = 'Expand question';

    } else if (this.props.isExpandable && this.props.isExpanded) {
      showMoreIcon = <Image style={styles.showMoreIcon} source={require('fbw-platform-common/assets/show-more--up@2x.png')}/>
      toggleButtonLabel = 'Hide question';
    }


    let header;
    if (this.props.onShowAnswer) {
      header =  (<TouchableOpacity style={styles.header}
                                onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
          <View style={styles.headerButtonWrapper} onLayout={this.getButtonWidthLayout}>
            <Animated.View style={[styles.bgFill, this._getButtonProgressStyles()]}></Animated.View>

            <Animated.Text style={[styles.headerText, this._getButtonTextProgressStyles()]}>
              {this.props.headerText}
            </Animated.Text>

          </View>
      </TouchableOpacity>);

    } else {
      header = (
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.props.headerText}</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.questionTypeIcon}>
          {this.props.questionTypeIcon}
        </View>

        {header}

        <TouchableHighlight accessibilityLabel={toggleButtonLabel}
                            style={styles.showMoreButton} onPress={this.props.onToggleExpand}>
          {showMoreIcon}
        </TouchableHighlight>

      </View>
    )
  }

  _getButtonProgressStyles() {
    let width = this.state.pressAction.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.state.buttonWidth]
    });
    let bgColor = this.state.pressAction.interpolate({
        inputRange: [0, 1],
        outputRange: COLORS
    });

    // console.log('progress width', width, 'progress bg color', bgColor);
    // console.log('height', this.state.buttonHeight)

    return {
      width: width,
      height: this.state.buttonHeight,
      backgroundColor: bgColor
    }
  }

  _getButtonTextProgressStyles() {
    let color = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(100,100,100)', 'rgb(255,255,255)']
    });

    return {color}
  }

  getButtonWidthLayout = (e) => {
    // console.log('button width', e.nativeEvent.layout.width)
    // console.log('button height', e.nativeEvent.layout.height)


    this.setState({
      buttonWidth: e.nativeEvent.layout.width,
      buttonHeight: 39 || e.nativeEvent.layout.height
    });
  }

  _onPressIn = () => {
    Animated.timing(this.state.pressAction, {
      duration: SHOW_ANSWER_TIMER,
      toValue: 1
    }).start(this.animationActionComplete);
  }

  _onPressOut = () => {
    // console.log('press action onPressOut', this.state.pressAction);

    if (this._value === 1) {

    } else {
      Animated.timing(this.state.pressAction, {
        duration: this._value * SHOW_ANSWER_TIMER,
        toValue: 0
      }).start();
    }

  }

  animationActionComplete = () => {

    var message = '';
    if (this._value === 1) {
      // set to full
      Animated.timing(this.state.pressAction, {
        duration: 1,
        toValue: 1
      }).start();

      this.props.onShowAnswer();
    }

    this.setState({
      textComplete: message
    });
  }
}

export default QuestionHeader
