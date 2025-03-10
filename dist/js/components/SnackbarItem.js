'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    PubSub = require('../utils/PubSub'),
    ClassNames = require('../utils/ClassNames'),
    classSet = require('classnames');

module.exports = React.createClass({
  displayName: 'SnackbarItem',

  mixins: [PubSub],

  getInitialState: function getInitialState() {
    return {
      style: {},
      classes: {
        'snackbar': true
      }
    };
  },

  componentDidMount: function componentDidMount() {
    var self = this,
        classes = ClassNames(self.state.classes, self.props.classes),
        height = parseInt(window.getComputedStyle(ReactDOM.findDOMNode(self)).getPropertyValue('height').replace('px', '')),
        lineHeight = parseInt(window.getComputedStyle(ReactDOM.findDOMNode(self)).getPropertyValue('line-height').replace('px', ''));

    self.setState({
      classes: classes
    });

    // Subscribe to SnackBar show event
    self.subscribe('snackbar:' + self.props.id, function () {
      self.setState({
        style: {
          bottom: '0',
          opacity: 1,
          zIndex: 1
        }
      });

      if (Math.floor(height / lineHeight) > 1) {

        if (!classes['snackbar-multiline']) {
          classes['snackbar-multiline'] = true;
        }

        self.setState({
          classes: classes
        });
      }

      setTimeout(function () {
        self.setState({
          style: {}
        });
      }, 2000);
    });
  },

  actionBtn: function actionBtn() {
    if (!this.props.action) {
      return null;
    }

    return React.createElement(
      'button',
      { className: 'e-btn-flat action' },
      this.props.action
    );
  },

  render: function render() {
    var self = this,
        style = self.state.style,
        classes = classSet(self.state.classes);

    return React.createElement(
      'div',
      {
        className: classes,
        id: self.props.id,
        style: style
      },
      React.createElement(
        'div',
        { className: 'snackbar-message' },
        self.props.children
      ),
      self.actionBtn()
    );
  }
});