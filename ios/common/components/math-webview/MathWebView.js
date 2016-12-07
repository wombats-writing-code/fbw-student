// MathWebView

'use strict';

import React, {
    Component,
}  from 'react';
import {
  Dimensions,
  View,
  WebView,
  StyleSheet
} from "react-native";

var _ = require('lodash');

var credentials = require('../../credentials');
var fbwUtils = require('fbw-utils')(credentials);
// var WrapHTML = fbwUtils.WrapMathjax;
var wrapHTML = require('../../utilities/wrapHTML');
var heightCalculate = require('../../utilities/heightCalculate');

var styles = StyleSheet.create({
  webViewStyle: {
    backgroundColor: 'transparent',
  }
});

const JS_CODE =  `
    var el = document.getElementById('markup');
    renderMathInElement(el);

    var body = document.body;
    var html = document.documentElement;

    var rawHeight = parseInt(el.offsetHeight || el.clientHeight || 500);

    document.title = rawHeight + 14*2;

    window.location.hash = Math.random();`;

class MathWebView extends Component {
  constructor(props) {
    super (props);  // props includes the mission / assessment

    this.state = {
      height: 0,
      dummy: 0,
    };
  }

  effectiveWidth() {
    let {height, width} = Dimensions.get('window');
    return width * .75;
  }

  rescaleImage(str) {
    // scales the image to fit the view. probably should refactor into a selector

    let newContent;
    if (str.indexOf('<img ') > -1) {
      // console.log('image content', this.props.content);

      let widthMatch = str.match(/width:(.*)px/)[0];
      let heightMatch = str.match(/height:(.*)px/)[0];
      let originalWidth = parseInt(widthMatch.replace('width:', ''), 10);
      let originalHeight = parseInt(heightMatch.replace('height:', ''), 10);


      let k = this.effectiveWidth() / originalWidth;
      let scaledWidth = Math.floor(originalWidth * k);        // important to prevent layout thrashing
      let scaledHeight = Math.floor(originalHeight * k);

      newContent = str.replace(/width:(.*?)px/, 'width:' + scaledWidth + 'px');
      newContent = newContent.replace(/height:(.*)px(?=;)/, 'height:' + scaledHeight + 'px');
      // console.log('replaced height:', newContent);

    } else {
      newContent = str;
    }

    return newContent
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({dummy: Math.random()});
    //   console.log('will update again');
    // }, 1000);
  }

  stripBreakingChars(str) {
    let newStr = str.replace(/&nbsp;/g, ' ');

    return newStr;
  }

  // because we might need to call TouchableHighlight on this custom element
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    let newContent = this.stripBreakingChars(this.rescaleImage(this.props.content));
    let html = wrapHTML(newContent);

    return (
        <WebView contentInset={{top: -7}}
                 javascriptEnabled={true}
                 onNavigationStateChange={this._updateWebViewNavState}
                 onError={this._handleError}
                 scrollEnabled={false}
                 source={{html: html}}
                 style={[this.props.style, styles.webViewStyle, {height: this.state.height }]}
       />

    )
  }

  _handleError = (error) => {
    console.log('webview error', error)
  }

  _updateWebViewNavState = (navState) => {
    // console.log(this.stripBreakingChars(this.rescaleImage(this.props.content)));

    if (navState.title) {
      // console.log('height found', navState.title);

      let height = parseInt(navState.title);

      this.setState({ height: height});

      if (this.props.onAdjustHeight) {
        this.props.onAdjustHeight(height);
      }

    } else {
      // console.log('height not found, assigning minimum height')
      this.setState({height: 14*3});
    }

    return true;
  }
}

module.exports = MathWebView;
